import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react"
import InputField from "../../components/InputField"
import ErrorMessager from "../../components/Messager"

const SIGN_IN_FIELDS = [
    { name: 'email', placeholder: 'Email' },
    { name: 'password', placeholder: 'Password' }
]
const REGISTER_FIELDS = [
    { name: 'username', placeholder: 'Username' },
    { name: 'email', placeholder: 'Email' },
    { name: 'password', placeholder: 'Password' },
    { name: 'confirmPassword', placeholder: 'Confirm password' },
]

export default forwardRef(({ onSignIn, onRegister, onRequestPasswordReset }, ref) => {
    const [isLogin, setIsLogin] = useState(true)
    const messengerRef = useRef()
    const [formData, setFormData] = useState({ email: '', password: '' })

    useImperativeHandle(ref, () => ({
        showMessage: (message) => {
            messengerRef.current.show(message)
        }
    }), [])

    const handleSubmit = () => {
        if (isLogin) messengerRef.current.safeValidate(formData, onSignIn)
        else messengerRef.current.safeValidate(formData, onRegister)
    }
    const swapMode = () => {
        const emptyTemplate = (isLogin ? REGISTER_FIELDS : SIGN_IN_FIELDS).reduce((obj, field) => {
            obj[field.name] = ''
            return obj
        }, {})
        setFormData(emptyTemplate)
        setIsLogin(!isLogin)
    }

    return <div className="container">
        <div class="d-flex align-items-start mb-3 pb-1">
            <span class="h1 fw-bold mb-0">{isLogin ? "Login" : "Sign Up"}</span>
        </div>
        {(isLogin ? SIGN_IN_FIELDS : REGISTER_FIELDS).map((field) =>
            <InputField
                values={formData}
                setValues={setFormData}
                name={field.name}
                placeholder={field.placeholder}
            />)}
        {isLogin && <div className="d-flex flex-row-reverse">
            <button onClick={onRequestPasswordReset} type="button" class="btn btn-link">Forgot password</button>
        </div>}
        <div className="row align-items-center">
            <ErrorMessager ref={messengerRef} />
            <button
                className='btn fw-bold btn-outline-primary'
                onClick={handleSubmit}
            >
                {isLogin ? "Login" : "Sign Up"}
            </button>
            <div className="d-flex">
                <div className='mt-3 mx-auto'>
                    <p>{isLogin ? "Don't have a account ? " : "Already have an accont ? "}<span
                        onClick={swapMode} className='link-primary fw-bold'>{isLogin ? "Sign Up" : "Login"}</span></p>
                </div>
            </div>
        </div>
    </div>
}) 