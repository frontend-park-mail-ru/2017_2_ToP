import BasicValidation from './BasicValidation/BasicValidation';

function repeatPassword(password1, password2, errors) {
    if (!(password1 === password2)) {
        errors['repeat-password'] = 'Пароли не совпадают!';
    }
}

const Validation = (values, errors) => {
    for (let value in values) {
        BasicValidation(values[value], errors);
    }
    if (values['repeat-password']) {
        repeatPassword(values['password'].value, values['repeat-password'].value, errors);
    }

    return errors;
};

export default Validation;
