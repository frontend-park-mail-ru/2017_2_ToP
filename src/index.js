import signUp from './views/registration/registration.xml';

const main = document.getElementById("main");

//background
main.style.background = 'url(static/img/backgrounds/' + Math.floor(Math.random() * 3) + '.jpg) no-repeat center fixed';
main.style.backgroundSize = 'cover';

const loadRegistration = () => {
    main.innerHTML = signUp({title: "Наша"});

    const inp = document.getElementsByClassName("reginput");

    Object.keys(inp).forEach(el => {
        inp[el].addEventListener("focus", function () {
            this.classList.remove("input-error");
        }, false);
    });

    document.getElementById('registrationSubmit').addEventListener('click', () => {
        let valid = true;
        Object.keys(inp).forEach(el => {
            if (inp[el].value == "") {
                inp[el].classList.add("input-error");
                valid = false;
            }
            else {
                inp[el].classList.remove("input-error");
            }
        });

        if (valid) {
            document.forms["registration-form"].submit();
        }
    });
}

loadRegistration();