import morningIcon from '../assets/morning.png'
import dayIcon from '../assets/day.png'
import eveningIcon from '../assets/evening.png'
import nightIcon from '../assets/night.png'
import windSpeedIcon from '../assets/windSpeed.png'
import windDirectionIcon from '../assets/windDirection.png'
import rainIcon from '../assets/rain.png'
import humidityIcon from '../assets/humidity.png'

const styles = {
    temperatureIcon: {
        width: 30,
        height: 30
    },
    enviromentPropertyIcon: {
        width: 25,
        height: 25
    }
}

const EnviromentProperty = ({ icon, value }) => <div className='mt-1'>
    <img className='col me-1' src={icon} style={styles.enviromentPropertyIcon} />
    <span>{value}</span>
</div>

const TemperatureCell = ({ title, icon, feelsLike, actual }) => {
    return <div className='col mx-2 temperature-block p-2' >
        <span className='d-flex justify-content-center fw-bold'>{title}</span>
        <div className='d-flex justify-content-center'>
            <img className='row' src={icon} style={styles.temperatureIcon} />
        </div>
        <span className='d-flex justify-content-center'>{`${actual} ${String.fromCharCode(176)}C`}</span>
    </div>
}

export default ({ data }) => {
    return <div className='row px-4 justify-content-center'>
        <div className='card m-2 w-auto'>
        <div className='card-body'>
            <h3>{data.dateString}</h3>
            <hr />
            <div className='row'>
                <div className='col'>
                    <h5>Temperature</h5>
                    <div className='row'>
                        <TemperatureCell
                            title="Morning"
                            icon={morningIcon}
                            feelsLike={data.feels_like.morn}
                            actual={data.temp.morn}
                        />
                        <TemperatureCell
                            title="Day"
                            icon={dayIcon}
                            feelsLike={data.feels_like.day}
                            actual={data.temp.day}
                        />

                    </div>
                    <div className='row my-2'>
                        <TemperatureCell
                            title="Evening"
                            icon={eveningIcon}
                            feelsLike={data.feels_like.eve}
                            actual={data.temp.eve}
                        />
                        <TemperatureCell
                            title="Night"
                            icon={nightIcon}
                            feelsLike={data.feels_like.night}
                            actual={data.temp.night}
                        />
                    </div>

                </div>
                <div className='col'>
                    <h5 className='ft-5'>Summary</h5>
                    <span>{data.summary}</span>
                    <h5>Condition</h5>
                    <div className='col'>
                        <EnviromentProperty icon={windDirectionIcon} value={`Wind speed ${data.wind_deg} ${String.fromCharCode(176)}`} />
                        <EnviromentProperty icon={windSpeedIcon} value={`Wind speed ${data.wind_speed} m/s`} />
                        {!!data.rain && <EnviromentProperty icon={rainIcon} value={`Rain ${data.rain} m/s`} />}
                        <EnviromentProperty icon={humidityIcon} value={`humidity ${data.humidity} %`} />
                    </div>
                </div>
            </div>


        </div>
    </div>
    </div>
}