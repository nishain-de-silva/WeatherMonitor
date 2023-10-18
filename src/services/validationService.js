export function checkForExistence(fields) {
    const emptyFields = []
    for(const fieldName in fields) {
        if(!fields[fieldName]) emptyFields.push(fieldName)
    }
    if(emptyFields.length)
        return `Please provide ${emptyFields.join(', ')}. They cannot be empty`
    return undefined
}

export function getEmailErrorMessage(email) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(emailRegex.test(email))
        return undefined
    return 'please provide valid email address'
}

export function isPasswordsMatch(password, confirmPassword) {
    if (password != confirmPassword)
     return 'password and confirm password should match'
    return undefined
}