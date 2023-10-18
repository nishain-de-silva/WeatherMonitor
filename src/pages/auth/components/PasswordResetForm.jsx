import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import InputField from "./InputField"
import ErrorMessager from "./ErrorMessager"

export default forwardRef(({ onEmailSubmit, onResetCodeSubmit, onNewPasswordUpdate }, ref) => {
    const [stage, setStage] = useState(0)
    const inputData = useState({ email: '' })
    const messengerRef = useRef()

    useImperativeHandle(ref, () => ({
        showError: (message) => {
            messengerRef.current.show(message)
        }
    }), [])

    const Steps = [
        {
            title: 'Enter email to send reset code',
            fields: [
                { name: 'email', placeholder: 'Email address' }
            ],
            buttonName: 'Submit Email',
            callback: onEmailSubmit
        },
        {
            title: 'Enter password reset code on you email',
            fields: [
                { name: 'resetCode', placeholder: 'Password reset code' }
            ],
            buttonName: 'Submit Code',
            callback: onResetCodeSubmit
        },
        {
            title: 'Enter new password',
            fields: [
                { name: 'password', placeholder: 'Password' },
                { name: 'confirmPassword', placeholder: 'Confirm password' }
            ],
            buttonName: 'Update password',
            callback: onNewPasswordUpdate
        }
    ]

    const buildForm = () => {
        return <>
            <span class="h1 fw-bold mb-0">{Steps[stage].title}</span>
            {Steps[stage].fields.map((field) =>
                <InputField
                    state={inputData}
                    name={field.name}
                    placeholder={field.placeholder} />
            )}
        </>
    }

    const handleSubmit = () => {
        messengerRef.current.safeValidate(inputData[0], Steps[stage].callback)
        setStage(stage + 1)
        Steps[stage].fields.reduce((formData, field) => {
            formData[field.name] = ''
            return formData
        }, {})
    }

    return <div className="d-flex align-items-start mb-3 pb-1">
        {buildForm()}
        <ErrorMessager ref={messengerRef} />
        <button
            className='btn fw-bold btn-primary'
            onClick={handleSubmit}
            style={{ backgroundImage: 'linear-gradient(to right bottom, rgb(0 178 244), rgb(91 151 229))' }}
        >
            {Steps[stage].buttonName}
        </button>
    </div>
})