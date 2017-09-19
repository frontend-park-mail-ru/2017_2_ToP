export default function PasswordValidation(input, errors) {
    const valid = /^[a-zA-Z0-9]{6,20}$/.test(input);
    if (!valid) {
        if (input.length > 20) {
            errors.password = 'Пароль должен быть меньше 20 символов!';
        }
        else if (input.length < 6) {
            errors.password = 'Пароль должен быть от 6 символов!';
        }
        else {
            errors.password = 'Пароль должен быть только из букв английского алфавита и цифр!';
        }
    }
    else {
        errors.password = '';
    }
    return valid;
}