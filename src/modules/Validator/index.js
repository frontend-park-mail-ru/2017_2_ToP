import BasicValidation from './BasicValidation/BasicValidation';

function repeatPassword(password1, password2, errors) {
    if (password1 !== password2) {
        errors.repeatPassword = 'Пароли не совпадают!';
    }
}

const Validation = (values, errors) => {
    (Object.keys(values) || []).forEach(value => BasicValidation(values[value], errors));

    if (values.repeatPassword) {
        repeatPassword(values.password.value, values.repeatPassword.value, errors);
    }

    return errors;
};

export default Validation;
