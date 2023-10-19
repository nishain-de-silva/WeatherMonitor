import { getFieldValidator } from "../../services/validationService"

export default ({ placeholder, name, values, setValues }) => {
    const handleChange = (event) => {
        setValues({
            ...values,
            [name]: event.target.value
        })
    }

    const getType = () => {
        if (name === 'email') return 'email'
        if (name.toLowerCase().includes('password')) return 'password'
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
            required
            placeholder={placeholder} />
        {renderErrorMessage()}
    </div>
}
