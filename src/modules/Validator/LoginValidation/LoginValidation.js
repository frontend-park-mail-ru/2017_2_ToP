const loginRegular = /^[a-z0-9_-]{3,15}$/;

export default function LoginValidation(input, errors) {
    const valid = loginRegular.test(input);
    if (!valid) {
        if (input.length < 3) {
            errors.login = 'Логин должен быть от 3 символов!';
        } else if (input.length > 15) {
            errors.login = 'Логин должен быть до 15 символов!';
        } else {
            errors.login = 'Логин должен быть только из цифр и нижних букв английского алфавита!';
        }
    } else {
        errors.login = '';
    }
    return valid;
}
