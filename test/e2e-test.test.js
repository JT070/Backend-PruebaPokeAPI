const chai = require('chai');
const chaiHttp = require ('chai-http');

chai.use(chaiHttp);

const app = require('../app').app;

describe('Suite de prueba e2e', () => {
    it('should return Hello World', (done) => {
        chai.request(app)
            .get('/')
            .end( (err, res) => {
                chai.assert.equal(res.text, 'Hello World!')
                done();
            });
    });
});

describe('Suite de pruebas AUTH', () => {
    it('Should return 401 when no JWT token available', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        chai.request(app)
            .get('/team')
            .end( (err,res) => {
                chai.assert.equal(res.statusCode, 401);
                done();
            });
    });
    it('Should return 200 when no JWT is valid', (done) => {
        // Vamos a usar una validación HEADER despues de hacer un LOGIN
        chai.request(app)
            .post('login')
            .end( (err, res) => {
                chai.request(app)
                .get('/team')
                .set('Authorization', `JWT ${res.body.token}`)
                .end( (err,res) => {
                    chai.assert.equal(res.statusCode, 200);
                    done();
                });
            })
    });
});