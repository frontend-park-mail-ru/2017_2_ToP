import Transport from '../../src/modules/Transport/Transport';
import 'whatwg-fetch';

describe('Api tests', () => {
    it('Logout error', done => {
        Transport.get('/logout')
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
                done();
            })
            .catch(response => {
                expect(response.status).to.equal(400);
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
            })
            .catch(response => {
                response.json().then(json => {
                    console.log(`${response.status}: ${response.statusText}\n${json.message}`);
                });
                done();
            });
    });

    it('Current user', done => {
        Transport.get('/user')
            .then(response => {
                expect(response).to.have.property('id');
                done();
            })
            .catch(response => {
                expect(response.status).to.equal(401);
                done();
            });
    });
});