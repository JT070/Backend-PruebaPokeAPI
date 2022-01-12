const express = require('express');
const bodyParser = require('body-parser'); // Es un Plugin de Express
const passport = require('passport');
const jwt = require('jsonwebtoken');

const usersController = require('./controllers/users');
usersController.registerUser('jamon', '12345'); // PAra las pruebas
//const req = require('express/lib/request');
require('./auth.js')(passport);

const app = express(); // Es el "ejecutable" para levantar el servidor. Es un objeto servidor
app.use(bodyParser.json());
const port = 3001;

// El '/' es para que se ejcuta en la raíz
// Los parámetros de REQ y RES son los parámetros y
// las respuesta respectivamente.

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

app.post('/login', (req, res) => {
    // Comprueba que realmente llegue un usuario y una contraseña
    if (!req.body) {
        return res.status(400).json({message: 'Missing data'});
    } else if (!req.body.user || !req.body.password) {
        return res.status(400).json({message: 'Missing data'});
    }
    // Comprobamos credenciales
    usersController.checkUserCredentials(req.body.user, req.body.password, (err, result) => {
        // Si no son validas, error.
        if (err || !result) {
            return res.status(401).json({message: 'Invalid Credentials'});
        }
        // Si son válidas, generamosun JWT y lo devolvemos
        const token = jwt.sign({userId: result}, 'secretPassword');
        res.status(200).json({token : token});
    });
});

app.post('/team/pokemons', () => {

});

app.get('/team',
    passport.authenticate('jwt', {session: false}),
    (req, res, next) => {
        res.status(200).send('Hello World!')
    }
);

app.delete('/team/pokemons/:pokeid', () => {

});

app.put('/team', () => {

});


app.listen(port, () => {
    console.log('Server started at port: 3001');
});


// Para ofrecer esto a algun módulo externo, por ejemplo a los de pruebas.
exports.app = app;