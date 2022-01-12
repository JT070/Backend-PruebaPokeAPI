const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
// Controllers
const usersController = require('../controllers/users');
usersController.registerUser('jamon', '12345');
usersController.registerUser('monja', '54321'); 

router.route('/')
    .get((req, res) => {
        res.send('GET Auth router');
    })
    .post((req, res) => {
        res.send('POST Auth router');
    });

router.route('/login')
    .post((req, res) => {
        if (!req.body) {
            return res.status(400).json({message: 'Missing data'});
        } else if (!req.body.user || !req.body.password) {
            return res.status(400).json({message: 'Missing data'});
        }
        // Comprobamos credenciales
        usersController.checkUserCredentials(req.body.user, req.body.password, (err, result) => {
            // Si no son validas, error.
            if (err || !result) {
                console.log(`----> Tus CHINGADERAS están mal. Nombre: ${req.body.user}  Contraseña: ${req.body.password}`);
                console.log(` o puedes checar tu ERROR: ${err}`);
                console.log(` ___ Tu resultado fue: ${result}`);
                return res.status(401).json({message: 'Invalid Credentials'});
            }
            // Si son válidas, generamosun JWT y lo devolvemos
            console.log(`----> Bien ahí CABRON!`);
            let user = usersController.getUserIdFromUserName(req.body.user);
            const token = jwt.sign({userId: user.userId}, 'secretPassword');
            res.status(200).json({token : token});
        });
    });    

exports.router = router;    