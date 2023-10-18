import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react"
import InputField from "./InputField"
import ErrorMessager from "./ErrorMessager"

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

export default forwardRef(({ onSignIn, onRegister }, ref) => {
    const [isLogin, setIsLogin] = useState(true)
    const messengerRef = useRef()
    useImperativeHandle(ref, () => ({
        showMessage: (message) => {
            messengerRef.current.show(message)
        }
    }), [])

    const formData = useState({ email: '', password: '' })
    const handleSubmit = () => {
        if (isLogin) messengerRef.current.safeValidate(formData[0], onSignIn)
        else messengerRef.current.safeValidate(formData[0], onRegister)
    }
    const swapMode = () => {
        const setFormData = formData[1]
        const emptyTemplate = (isLogin ? REGISTER_FIELDS : SIGN_IN_FIELDS).reduce((obj, field) => {
            obj[field.name] = ''
            return obj
        }, {})
        setFormData(emptyTemplate)
        setIsLogin(!isLogin)
    }

    return <div>
       <div class="d-flex align-items-start mb-3 pb-1">
            <span class="h1 fw-bold mb-0">{isLogin ? "Login" : "Sign Up"}</span>
        </div>
        {(isLogin ? SIGN_IN_FIELDS : REGISTER_FIELDS).map((field) => 
        <InputField
            state={formData}
            name={field.name}
            placeholder={field.placeholder}
            addtionalComponent={
                isLogin && field.name == 'password' ? 
                    <div className="d-flex flex-row-reverse">
                <button type="button" class="btn btn-link">Forgot password</button> 
            </div>  : null}
        />)}
        
        <ErrorMessager ref={messengerRef} />

        <button
            className='btn fw-bold btn-primary'
            onClick={handleSubmit}
            style={{ backgroundImage: 'linear-gradient(to right bottom, rgb(0 178 244), rgb(91 151 229))' }}
        >
            {isLogin ? "Login" : "Sign Up"}
        </button>
        <div className='mt-3'>
            <p>{isLogin ? "Don't have a account ? " : "Already have an accont ? "}<span
                onClick={swapMode} className='link-primary fw-bold'>{isLogin ? "Sign Up" : "Login"}</span></p>
        </div>
    </div>
}) 