import markerIcon from '../dashboard/assets/marker.png'
import logoutIcon from '../dashboard/assets/logout.png'

import blankProfile from '../dashboard/assets/blankProfile.webp'
import EditableField from './components/EditableField'
import Post from './components/Post'
import { useEffect, useMemo, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { NavLink, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../services/authProvider'
import GoogleMap from 'google-map-react';
import axios from 'axios'
import sampleData from './assets/sampleData.json'
import WeatherItem from './components/WeatherItem'

const styles = {
    icon: {
        height: 30,
        width: 30,
    },
    temperatureIcon: {
        height: 30,
        width: 30
    },
    navButton: {
        backgroundColor: 'white'
    },
    gradientButton: {
        backgroundImage: 'linear-gradient(to right bottom, rgb(0, 178, 244), rgb(54 132 235))',
        color: 'white',
        fontWeight: 'bold'
    },
    weatherContainer: {
        backgroundColor: '#c1c1ea',
        height: '100vh',
        overflow: 'scroll'
    },
    profilePicture: {
        borderRadius: 50,
        height: 100,
        width: 100
    }
}

const auth = getAuth()
const mapAPIKey = process.env.REACT_APP_GOOGLE_MAP_API
const weatherAPIKey = process.env.REACT_APP_WEATHER_API_KEY

function Dashboard() {
    const [geoCoordinate, setGeoCoordinate] = useState(null)
    const [weatherData, setWeatherData] = useState([])
    const [showFullData, setShowFullData] = useState(false)
    const [geoText, setGeoText] = useState('')
    const [showExplictSearchBtn, setShowExplictSearchBtn] = useState(false)
    const navigate = useNavigate()

    // useEffect(() => {
    //     const date = new Date()
        
    //     setWeatherData(sampleData.daily.map(d => {
    //         d.dateString = date.toDateString()
    //         date.setDate(date.getDate() + 1)
    //         return d
    //     }))
    // }, [])

    const logout = async () => {
        await auth.signOut()
        navigate('auth')
    }

    const showMoreData = () => {
        setShowFullData(true)
    }
    const proccessGeoText = (value) => {
        const absolutePositon = /^[0-9]+\.[0-9]+,\s*[0-9]+\.[0-9]+$/g
        if (absolutePositon.test(value)) {
            const matches = value.split(/,\s+/)
            const latLng = {
                lat: parseFloat(matches[0]),
                lng: parseFloat(matches[1])
            }
            setGeoCoordinate(latLng)
        } else {
            if(!value) {
                setGeoCoordinate(null)
                return
            }
            axios.get('https://maps.googleapis.com/maps/api/geocode/json',
                {
                    params: {
                        key: mapAPIKey,
                        address: value
                    }
                }).then((result) => {
                    const { data } = result
                    setGeoCoordinate(data.results[0].geometry.location)
                })
        }
    }

    const onGeoPositionTextChange = (event) => {
        const value = event.target.value
        const oldValue = geoText
        setGeoText(value)
        if (Math.abs(value.length - oldValue.length) > 2) {
            if(showExplictSearchBtn) setShowExplictSearchBtn(false)
            proccessGeoText(value) // text copied
        } else if(!showExplictSearchBtn) setShowExplictSearchBtn(true)
    }

    const handleSearchGeoText = () => {
        proccessGeoText(geoText)
    }

    useEffect(() => {
        if(geoCoordinate) {
            axios.get('https://api.openweathermap.org/data/3.0/onecall', {
                params: {
                    lat: geoCoordinate.lat,
                    lon: geoCoordinate.lng,
                    appid: weatherAPIKey,
                    exclude: 'minutely,hourly,alerts'
                }
            }).then(({data}) => {
                const date = new Date()
                const parsedData = data.daily.map(d => {
                    d.dateString = date.toDateString()
                    date.setDate(date.getDate() + 1)
                    return d
                })
                setWeatherData(parsedData)
            })
        } else if(weatherData.length) setWeatherData([]) // clear data...
    }, [geoCoordinate])

    const { user } = useAuth()

    const presentingData = useMemo(() => {
        if(!showFullData) return weatherData.slice(0, 3)
        return weatherData
    }, [showMoreData])

    return <div className="container-fluid background-cover">
        <nav class="navbar navbar-expand-lg navbar-light shadow bg-light mb-2" >
            <div class="container-fluid">
                <a class="navbar-brand" href="#">{`Welcome ${user.displayName}`}</a>
                <div>
                    <NavLink to="/settings" className='btn btn-outline-success'>Settings</NavLink>
                    <button
                        className='btn ms-3 btn-outline-success'
                        onClick={logout}
                    >
                        Sign out
                    </button>
                </div>
            </div>
        </nav>
        <div className='row container-fluid'>
            <div className='col-4 p-4 card me-3 my-2'>
                <h4>Select Location</h4>
                <input
                    placeholder='Latitude, Longitude or address name'
                    type="text" class="form-control"
                    value={geoText}
                    onChange={onGeoPositionTextChange}
                />
                {showExplictSearchBtn && <button onClick={handleSearchGeoText} className='mt-3 btn btn-outline-primary'>
                    Search
                </button>}
                <div className='card mt-3' style={{ height: '40%', width: '100%' }}>
                    {!!geoCoordinate && <div style={{ height: '100%', width: '100%' }}>
                        <GoogleMap
                            defaultZoom={12}
                            bootstrapURLKeys={{ key: mapAPIKey }}
                            center={geoCoordinate}
                        >
                            <img
                                lat={geoCoordinate.lat}
                                lng={geoCoordinate.lng}
                                src={markerIcon} style={styles.icon} />
                        </GoogleMap>

                    </div>}
                </div>
            </div>
            <div className='col my-2 rounded' style={styles.weatherContainer}>
                {
                    presentingData.map((data) => <WeatherItem data={data} />)
                }
                <div className='row justify-content-center'>
                {!!weatherData.length && !showFullData && <button className='btn btn-primary m-3 w-auto'>
                See more
                </button>}
                </div>
            </div>
        </div>
    </div>
}

export default Dashboard