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
        this.link = themeBlock.querySelectorAll('link')[1];
        this.linkExist = true;

        if (!this.link) {
            this.linkExist = false;
            this.link = document.createElement('link');
            this.link.rel = 'stylesheet';
            this.link.href = 'built/halloween.css';
        }

        if (this.theme === 'main') {
            if (this.linkExist) {
                themeBlock.removeChild(this.link);
            }
        } else {
            themeBlock.appendChild(this.link);
        }
    }
}