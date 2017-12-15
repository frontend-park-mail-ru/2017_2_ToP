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
        if (type === 'singleplayer') {
            this.user.sscore = score;
        } else if (type === 'multiplayer') {
            this.user.mscore = score;
        }
    }

    getScore(type) {
        return type === 'singleplayer' ? this.user.sscore : this.user.mscore;
    }
}

const userService = new UserService();

export default userService;
