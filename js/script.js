const form = document.getElementById('registrationForm')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirmPassword')
const successMessage = document.getElementById('successMessage')

window.addEventListener('DOMContentLoaded', () => {
        const savedUsername = localStorage.getItem('username')
        if (savedUsername) {
        username.value = savedUsername
    }
})

function validateUsername() {
    if (username.validity.valueMissing) {
        usernameError.textContent = 'Username is required.'
        username.classList.remove('valid')
        return false
    } else if (username.validity.tooShort) {
        usernameError.textContent = 'Username must be at least 3 characters long.'
        username.classList.remove('valid')
        return false
    } else {
        usernameError.textContent = ''
        username.classList.add('valid')
        return true
    }
}

function validateEmail() {
    if (email.validity.valueMissing) {
        emailError.textContent = 'Email is required.'
        email.classList.remove('valid')
        return false
    } else if (email.validity.typeMismatch) {
        emailError.textContent = 'Please enter a valid email address.'
        email.classList.remove('valid')
        return false
    } else {
        emailError.textContent = ''
        email.classList.add('valid')
        return true
    }
}

function validatePassword() {
    if (password.validity.valueMissing) {
        passwordError.textContent = 'Password is required.'
        password.classList.remove('valid')
        return false
    } else if (password.validity.tooShort) {
        passwordError.textContent = 'Password must be at least 8 characters long.'
        password.classList.remove('valid')
        return false
    } else if (password.validity.patternMismatch) {
        passwordError.textContent = 'Password must include uppercase, lowercase, and a number.'
        password.classList.remove('valid')
        return false
    } else {
        passwordError.textContent = ''
        password.classList.add('valid')
        return true
    }
}

function validateConfirmPassword() {
    if (confirmPassword.validity.valueMissing) {
        confirmPasswordError.textContent = 'Please confirm your password.'
        confirmPassword.classList.remove('valid')
        return false
    } else if (confirmPassword.value !== password.value) {
        confirmPasswordError.textContent = 'Passwords do not match.'
        confirmPassword.classList.remove('valid')
        return false
    } else {
        confirmPasswordError.textContent = ''
        confirmPassword.classList.add('valid')
        return true
    }
}

username.addEventListener('input', validateUsername)

email.addEventListener('input', validateEmail)

password.addEventListener('input', () => {
    validatePassword()
    if (confirmPassword.value) {
        validateConfirmPassword()
    }
})

confirmPassword.addEventListener('input', validateConfirmPassword)

form.addEventListener('submit', (e) => {
    e.preventDefault() // Prevent default form submission

    // Hide any previous success message
    successMessage.style.display = 'none'

    // Validate all fields
    const isUsernameValid = validateUsername()
    const isEmailValid = validateEmail()
    const isPasswordValid = validatePassword()
    const isConfirmPasswordValid = validateConfirmPassword()

    // Check if all fields are valid
    const isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid

    if (isFormValid) {
        // Save username to localStorage
        localStorage.setItem('username', username.value)

        // Show success message
        successMessage.style.display = 'block'

        // Optionally reset the form (except username)
        const savedUsername = username.value
        form.reset()
        username.value = savedUsername

        // Clear all valid classes
        document.querySelectorAll('.valid').forEach(el => {
            el.classList.remove('valid')
        })
    window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
        // Focus on first invalid field
        if (!isUsernameValid) username.focus()
        else if (!isEmailValid) email.focus()
        else if (!isPasswordValid) password.focus()
        else if (!isConfirmPasswordValid) confirmPassword.focus()
    }
})