import Transport from '../../modules/Transport/Transport';

class UserService {
    constructor() {
        if (UserService.__instance) {
            return UserService.__instance;
        }

        this.user = null;

        UserService.__instance = this;
    }

    logout() {
        return Transport.post('/logout')
            .then(() => { this.user = null; });
    }

    getLogin() {
        return this.user.login;
    }

    isLoggedIn() {
        return !!this.user;
    }

    getData() {
        return Transport.get('/user')
            .then(userdata => {
                this.user = userdata;
                return userdata;
            });
    }

    setScore(type, score) {
        if (type === 'single') {
            this.user.singleScore = score;
        } else if (type === 'multi') {
            this.user.multiScore = score;
        }
    }

    getScore(type) {
        return type === 'single' ? this.user.singleScore : this.user.multiScore;
    }
}

const userService = new UserService();

export default userService;
