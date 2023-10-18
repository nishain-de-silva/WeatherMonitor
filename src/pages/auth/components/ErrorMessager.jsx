import { forwardRef, useImperativeHandle, useState } from "react";
import { checkNonEmptyFields, checkValidation } from "../../../services/validationService";

export default forwardRef(({ }, ref) => {
    const [message, setMessage] = useState(null)
    const showMessage = (message) => {
        setMessage(message)
        setTimeout(() => {
            setMessage(null)
        }, 2500)
    }
    useImperativeHandle(ref, () => ({
        show: showMessage,
        safeValidate: (fields, callbackOnSafe) => {
            const errorMessage = checkValidation(fields)
            if(errorMessage) showMessage(errorMessage)
            else callbackOnSafe(fields)
        }
    }))
    
    if (!message) return null
    return <div class="alert alert-danger" role="alert">
        {message}
    </div>
})