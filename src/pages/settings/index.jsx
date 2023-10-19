import { useEffect, useRef, useState } from "react"
import InputField from "../components/InputField"
import { useAuth } from "../../services/authProvider"
import { reauthenticateWithCredential, updatePassword, validatePassword, Pro, EmailAuthProvider, getAuth, updateCurrentUser, updateProfile } from "firebase/auth"
import ErrorMessager from "../components/Messager"
import Back from "../auth/components/Back"
import { useNavigate } from "react-router-dom"

export default () => {
    const [securityData, setSecurityData] = useState({
        oldPassword: '',
        newPassword: '',
        email: ''
    })

    const { user } = useAuth()

    const [profileData, setProfileData] = useState({
        username: user.displayName
    })

    const messengerRef = useRef()

    const changeProfile = () => {
        messengerRef.current.safeValidate(profileData, ({ username }) => {
            const auth = getAuth()
            updateProfile(auth.currentUser, {
                displayName: username
            })
            messengerRef.current.showSuccessMessage('Profile updated')
        })
    }

    const changePassword = () => {
        messengerRef.current.safeValidate(securityData, ({ oldPassword, newPassword }) => {
            reauthenticateWithCredential(user, EmailAuthProvider
                .credential(user.email, oldPassword)).then(() => {
                    updatePassword(user, newPassword)
                    messengerRef.current.showSuccessMessage('password has successfully updated!')
                }).catch(({ code }) => {
                    if (code == 'auth/invalid-login-credentials')
                        messengerRef.current.show('password is incorrect. Please try again')
                    else
                        messengerRef.current.show('Something went wrong cannot proceed')
                })
        })
    }
    const navigate = useNavigate()
    return <div className="container-fluid d-flex" style={{ backgroundImage: 'linear-gradient(to right bottom, #8e00ff, #00ffdb)', height: '100vh' }}>
        <div className="card mx-auto w-50 align-self-center">
            <div className="card-body">
                <div class="d-flex align-items-start mb-3 pb-1">
                    <Back onPress={() => navigate('/home', {replace: true})} />
                    <span class="h1 fw-bold mb-0">Settings</span>
                </div>
                <h4>Profile</h4>
                <InputField
                    name="username"
                    placeholder="New username"
                    values={profileData}
                    setValues={setProfileData}
                />
                <button
                    className='btn fw-bold btn-outline-primary'
                    onClick={changeProfile}
                >
                    Update Profile
                </button>
                <hr />
                <h1 className="fs-5">Security</h1>
                <InputField
                    name="oldPassword"
                    values={securityData}
                    setValues={setSecurityData}
                    placeholder="Old password"
                />
                <InputField
                    name="newPassword"
                    values={securityData}
                    setValues={setSecurityData}
                    placeholder="New password"
                />
                <ErrorMessager ref={messengerRef} />
                <button
                    className='btn fw-bold btn-outline-primary'
                    onClick={changePassword}
                >
                    Update Password
                </button>
            </div>
        </div>
    </div>
}