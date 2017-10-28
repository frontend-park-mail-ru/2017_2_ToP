export default class Theming {
    getCurrent() {
        const theme = localStorage.getItem('theme');
        if (theme) {
            if (theme === 'main') {
                this.theme = 'main';
            } else {
                this.theme = 'halloween';
            }
            return;
        }
        this.theme = 'main';
    }

    changeTheme() {
        this.getCurrent();

        if (this.theme === 'main') {
            this.theme = 'halloween';
        } else {
            this.theme = 'main';
        }

        this.setCurrent();
        this.addTheme();
    }

    setTheme() {
        this.getCurrent();
        this.setCurrent();
        this.addTheme();
    }

    setCurrent() {
        localStorage.setItem('theme', this.theme);
    }

    addTheme() {
        const themeBlock = document.querySelector('.theme');

        if (this.theme === 'main') {
            themeBlock.innerHTML = '<link rel="stylesheet" href="built/main.css">';
        } else {
            themeBlock.innerHTML += '<link rel="stylesheet" href="built/halloween.css">';
        }
    }
}