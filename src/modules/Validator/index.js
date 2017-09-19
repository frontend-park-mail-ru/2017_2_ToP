import BasicValidation from './BasicValidation/BasicValidation';

const Validation = (values, errors) => {
    for (let value in values) {
        BasicValidation(values[value], errors);
    }

    if (values['repeat-password']) {
        repeatPassword(values['password'].value, values['repeat-password'].value, errors);
    }

    return errors;
};

function repeatPassword(password1, password2, errors) {
    if (!(password1 === password2)) {
        errors['repeat-password'] = 'Пароли не совпадают!';
    }
}

export default Validation;