import { getFieldValidator } from "../../../services/validationService"

export default ({ placeholder, name, state, addtionalComponent = null }) => {
    const [values, setValues] = state
    const handleChange = (event) => {
        setValues({
            ...values,
            [name]: event.target.value
        })
    }

    const getType = () => {
        if (name === 'email') return 'email'
        if (['confirmPassword', 'password'].includes(name)) return 'password'
        return undefined
    }

    const renderErrorMessage = () => {
        const errorMessage = getFieldValidator(name, values)
        if (errorMessage) return <div class="invalid-feedback">
            {errorMessage}
        </div>
        return null
    }

    return <div class="mb-3" key={name}>
        <input
            type={getType()}
            class={`form-control p-3`}
            value={values[name]}
            onChange={handleChange}
            placeholder={placeholder} />
        {renderErrorMessage()}
        {addtionalComponent}
    </div>
}
