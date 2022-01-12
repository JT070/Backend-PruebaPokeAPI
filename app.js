const express = require('express');
const bodyParser = require('body-parser'); // Es un Plugin de Express

// Rutas
const authRoutes = require('./auth/auth.router').router;
const teamsRoutes = require('./teams/teams.router').router;

// require('./auth')(passport);
const app = express();
app.use(bodyParser.json()); 

const port = 3001;

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

app.use('/auth', authRoutes);
app.use('/teams', teamsRoutes);

app.listen(port, () => {
    console.log('Server started at port: 3001');
});


// Para ofrecer esto a algun módulo externo, por ejemplo a los de pruebas.
exports.app = app;