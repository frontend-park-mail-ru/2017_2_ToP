export default function PasswordValidation(input, errors) {
    let valid = false;
    if (input.length > 24) {
        errors.password = 'Пароль должен быть меньше 24 символов!';
    } else if (input.length < 8) {
        errors.password = 'Пароль должен быть от 8 символов!';
    } else {
        valid = true;
        errors.password = '';
    }
    return valid;
}
