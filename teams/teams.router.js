const express = require('express');
const passport = require('passport');
const router = express.Router();
require('../tools/auth')(passport);
const axios = require('axios').default;

const teamsController = require('./teams.controller');
const { getUser } = require('../auth/users.controller');

router.route('/')
    .get(passport.authenticate('jwt', {session: false}), 
        (req, res, next) => {
            let user = getUser(req.user.userId);
            res.status(200).json({
                trainer: user.userName,
                team: teamsController.getTeamOfUser(req.user.userId),
            });
        })
    .put(passport.authenticate('jwt', {session: false}) ,
        (req, res) => {
        teamsController.setTeam(req.user.userId, req.body.team);
        res.status(200).send();
    });

router.route('/pokemons')
    .post(passport.authenticate('jwt', {session: false}), 
        (req, res) => {
            let pokemonName = req.body.name;
            axios.get(`/https://pokeapi.co/api/v2/pokemon/bulbasaur/${pokemonName.toLowerCase()}`)
                .then(function (response) {
                    // Handle access
                    let pokemon = {
                        name: pokemonName, 
                        pokedexNumber: response.data.id,
                    }
                    console.log(response.data.id);
                    teamsController.addPokemon(req.user.userId, pokemon);
                    res.status(201).json(pokemon); 
                })
                .catch(function (error) {
                    console.log(error);
                    res.status(400).json({message: error});
                })
                .then(function () {

                });
    });

router.route('/pokemons/:pokeid')
    .delete(() => {
        res.status(200).send('Hello World!');
    });

exports.router = router;