import EmailValidation from '../EmailValidation/EmailValidation';
import LoginValidation from '../LoginValidation/LoginValidation';
import PasswordValidation from '../PasswordValidation/PasswordValidation';

export default function BasicValidation(element, errors) {
    const valid = !(element.value === '');
    if (!valid) {
        errors[element.name] = 'Пожалуйста, введите данные!';
    } else {
        switch (element.name) {
            case 'login':
                LoginValidation(element.value, errors);
                break;
            case 'email':
                EmailValidation(element.value, errors);
                break;
            case 'password':
                PasswordValidation(element.value, errors);
                break;
            case 'repeatPassword':
                errors[element.name] = '';
                break;
            default:
                break;
        }
    }
    return valid;
}
