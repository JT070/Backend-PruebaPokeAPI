const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const usersController = require('../auth/users.controller');
const teamsController = require('../teams/teams.controller');

const app = require('../app').app;

before((done) => {
    usersController.registerUser('jamon' , '12345');
    usersController.registerUser('monja' , '54321');
    done();
});

afterEach(async () => {
    await teamsController.cleanUpTeam();
})

describe('SUITE DE PRUEBAS DE TEAMS', () => {
    it('Should return the TEAM of the given user', (done) => {
        // cuando la llamada no tiene correctamente la llave
        let team = [{name: 'Charizard'}, {name: 'Blastoise'}];
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'monja', password: '54321'})
            .end((err, res) => {
                let token = res.body.token;
                // Expect valid login
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .put('/teams')
                    .send({
                        team: team
                    })
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200);
                            chai.request(app)
                                .get('/teams')
                                .set('Authorization', `JWT ${token}`)
                                .end((err, res => {
                                    // Tiene equipo con Charizard y Blastoise
                                    // {trainer : 'monja', team: [Pokemones]}
                                    chai.assert.equal(res.statusCode, 200);
                                    chai.assert.equal(res.body.trainer, 'monja');
                                    chai.assert.equal(res.body.team.length, team.length);
                                    chai.assert.equal(res.body.team[0].name, team[0].name);
                                    chai.assert.equal(res.body.team[0].name, team[1].name);
                                    done();
                                }))
                    });
            });
    });

    it('Should return the Pokedex Number', (done) => {
        // cuando la llamada no tiene correctamente la llave
        let pokemonName = 'Bulbasaur';
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'jamon', password: '12345'})
            .end((err, res) => {
                let token = res.body.token;
                // Expect valid login
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .post('/teams/pokemons')
                    .send({name: pokemonName})
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200);
                            chai.request(app)
                                .get('/teams')
                                .set('Authorization', `JWT ${token}`)
                                .end((err, res => {
                                    chai.assert.equal(res.statusCode, 200);
                                    chai.assert.equal(res.body.trainer, 'monja');
                                    chai.assert.equal(res.body.team.length, 1);
                                    chai.assert.equal(res.body.team[0].name, pokemonName);
                                    chai.assert.equal(res.body.team[0].pokedexNumber, 1);
                                    done();
                                }))
                    });
            });
    });


    it('Should not be able to add pokemon if you already have 6', (done) => {
        let team = [
            {name: 'Bulbasaur'},
            {name: 'Charizard'},
            {name: 'Lapras'},
            {name: 'Pikachu'},
            {name: 'Blastoise'},
            {name: 'Gengar'},
        ];
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'jamon', password: '12345'})
            .end((err, res) => {
                let token = res.body.token;
                // Expect valid login
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .post('/teams')
                    .send({name: pokemonName})
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .post('/teams')
                            .send({name: 'Raychu'})
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res => {
                                chai.assert.equal(res.statusCode, 400);
                            }))
                            
                    });
            });
    });
});

