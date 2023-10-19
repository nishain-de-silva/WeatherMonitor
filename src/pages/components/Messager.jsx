import { forwardRef, useImperativeHandle, useState } from "react";
import { checkNonEmptyFields, checkValidation } from "../../services/validationService";

export default forwardRef(({ }, ref) => {
    const [message, setMessage] = useState(null)
    const [isError, setIsError] = useState(true)
    const showMessage = (message) => {
        setMessage(message)
        setTimeout(() => {
            setMessage(null)
            if(!isError) setIsError(true) // change back to default value
        }, 2500)
    }
    useImperativeHandle(ref, () => ({
        show: showMessage,
        showSuccessMessage: (message) => {
            setIsError(false)
            showMessage(message)
        },
        safeValidate: (fields, callbackOnSafe) => {
            const errorMessage = checkValidation(fields)
            if(errorMessage) showMessage(errorMessage)
            else callbackOnSafe(fields)
        }
    }))
    
    if (!message) return null
    return <div class={`alert alert-${isError ? 'danger' : 'success'}`} role="alert">
        {message}
    </div>
})