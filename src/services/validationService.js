import { useMemo } from "react"

function checkFieldSpecificIssues(fields) {
    if(fields.email) return getEmailError(fields.email)
    else if(fields.confirmPassword && fields.password) 
        return getPasswordError(fields.password, fields.confirmPassword)
    return undefined
}

export function getFieldValidator(fieldName, fields) {
    if(fieldName === 'email') {
        return getEmailError(fields.email)
    } else if (fieldName === 'confirmPassword') {
        return getPasswordError(fields.password, fields.confirmPassword)
    }
}

export function checkValidation(fields) {
    return checkNonEmptyFields(fields) || checkFieldSpecificIssues(fields)
}

export function checkNonEmptyFields(fields) {
    for(const fieldName in fields) {
        if(!fields[fieldName]) return 'Please fill all the fields'
    }
    return undefined
}

function getEmailError(email) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(emailRegex.test(email))
        return undefined
    return 'please provide valid email address'
}

function getPasswordError(password, confirmPassword) {
    if (password != confirmPassword)
     return 'password and confirm password should match'
    return undefined
}