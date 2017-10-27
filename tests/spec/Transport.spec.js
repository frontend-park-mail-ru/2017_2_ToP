import Transport from '../../src/modules/Transport/Transport';
import 'whatwg-fetch';

describe('Api tests', () => {
    it('Not authorized Logout', done => {
        Transport.post('/logout')
            .catch(response => {
                expect(response.status).to.equal(401);
                done();
            });
    });

    it('Register', done => {
        Transport.post('/signup', {
            login: "test",
            email: "test@apoj.ru",
            password: "Password1"
        })
            .then(response => {
                expect(response).to.have.property('id');
                Transport.get('/logout');
                done();
            })
            .catch(response => {
                expect(response.status).to.equal(409);
                done();
            });
    });

    it('Register existing user', done => {
        Transport.post('/signup', {
            login: "test",
            email: "test@apoj.ru",
            password: "Password1"
        })
            .catch(response => {
                expect(response.status).to.equal(409);
                done();
            });
    });

    it('Sign In', done => {
        Transport.post('/signin', {
            login: "test",
            password: "Password1"
        })
            .then(response => {
                expect(response).to.have.property('id');
                done();
            });
    });

    it('Sign in when authorized', done => {
        Transport.post('/signin', {
            login: "test",
            password: "Password1"
        })
            .catch(response => {
                expect(response.status).to.equal(403);
                done();
            });
    });

    it('Current user', done => {
        Transport.get('/user')
            .then(response => {
                expect(response).to.have.property('id');
                done();
            });
        Transport.post('/logout');
    });

    it('Wrong Sign In', done => {
        Transport.post('/signin', {
            login: "test",
            password: "WrongPassword"
        })
            .catch(response => {
                expect(response.status).to.equal(400);
                done();
            });
    });

    it('Current user when not authorized', done => {
        Transport.get('/user')
            .catch(response => {
                expect(response.status).to.equal(401);
                done();
            });
    });
});