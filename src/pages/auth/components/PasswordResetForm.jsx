import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import InputField from "../../components/InputField"
import ErrorMessager from "../../components/Messager"
import Back from "./Back"

export default forwardRef(({ onEmailSubmit, goBack }, ref) => {
    const [formData, setFormData] = useState({
        email: ''
    })
    const messengerRef = useRef()

    useImperativeHandle(ref, () => ({
        onEmailSent: (message) => {
            messengerRef.current.showSuccessMessage(message)
        }
    }), [])



    const handleSubmit = () => {
        messengerRef.current.safeValidate(formData, onEmailSubmit)
    }

    return <div className="container">
        <div class="d-flex align-items-start mb-3 pb-1">
            <Back onPress={goBack}/>
            <span class="h3 fw-bold mb-0">Forget Password</span>
        </div>
        <InputField values={formData} setValues={setFormData} name="email" placeholder="Enter email to send reset link" />
        <ErrorMessager ref={messengerRef} />
        <div className="row mx-3">
            <button
                className='btn fw-bold btn-outline-primary'
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>

    </div>
})