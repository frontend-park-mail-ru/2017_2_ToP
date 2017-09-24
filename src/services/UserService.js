import Transport from '../modules/Transport/Transport';

class UserService {
    constructor() {
        if (UserService.__instance) {
            return UserService.__instance;
        }

        this.user = null;

        UserService.__instance = this;
    }

    logout() {
        return Transport.get('logout')
            .then(function () {
                this.user = null;
            }.bind(this));
    }

    isLoggedIn() {
        return !!this.user;
    }

    getData() {
        return Transport.get('user')
            .then(function (userdata) {
                this.user = userdata;
                return userdata;
            }.bind(this));
    }
}

const userService = new UserService();

export default userService;
