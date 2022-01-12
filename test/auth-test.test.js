const chai = require('chai');
const chaiHttp = require ('chai-http');

chai.use(chaiHttp);

const app = require('../app').app;

describe('SUITE DE PRUEBAS DE AUTENTICACION', () => {
    it('Should return 401 when no JWT token available', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        chai.request(app)
            .get('/teams')
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 401);
                done();
            });
    });

    it('Should return 400 when no data is provided', (done) => {
        chai.request(app)
            .post('/auth/login')
            .end((err, res) => {
                // Expect valid login
                chai.assert.equal(res.statusCode, 400);
                done();
            });
    });

    it('Should return 200 and token for succesful login', (done) => {
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'jamon', password: '12345'})
            .end((err, res) => {
                // Expect valid login
                chai.assert.equal(res.statusCode, 200);
                done();
            });
    });

    it('Should return 200 when JWT is valid', (done) => {
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'monja', password: '54321'})
            .end((err, res) => {
                // Expect valid login
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .get('/teams')
                    .set('Authorization', `JWT ${res.body.token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200);
                        done();
                    });
            });
    });

});