export default function PasswordValidation(input, errors) {
    const valid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(input);
    if (!valid) {
        if (input.length > 20) {
            errors.password = 'Пароль должен быть меньше 20 символов!';
        }
        else if (input.length < 6) {
            errors.password = 'Пароль должен быть от 6 символов!';
        }
        else {
            errors.password = 'Пароль должен содержать буквы разных регистров и как минимум 1 цифру!';
        }
    }
    else {
        errors.password = '';
    }
    return valid;
}