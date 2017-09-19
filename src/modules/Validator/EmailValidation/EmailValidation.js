export default function EmailValidation(input, errors) {
    const valid = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(input);
    if (!valid) {
        errors.email = 'Введите корректный email!';
    }
    else {
        errors.email = '';
    }
    return valid;
}