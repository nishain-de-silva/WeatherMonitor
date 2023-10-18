export function checkForExistence(fields) {
    const emptyFields = []
    for(const field of Object.values(fields)) {
        if(!fields[field]) emptyFields.push(field)
    }
    if(emptyFields.length) 
        return `Please provide ${emptyFields.join(', ')}. They cannot be empty`
    return undefined
}

export function isEmailValid(email) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(emailRegex.test(email))
        return 'please provide valid email address'
    return undefined
}

export function isPasswordsMatch(password, confirmPassword) {
    if (password != confirmPassword)
     return 'password and confirm password should match'
    return undefined
}