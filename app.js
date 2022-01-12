const express = require('express');
const app = express(); // Es el "ejecutable" para levantar el servidor. Es un objeto servidor
const port = 3001;

// El '/' es para que se ejcuta en la raíz
// Los parámetros de REQ y RES son los parámetros y
// las respuesta respectivamente.

app.get('/', (req, res) => {
    res. send('Hello World!');
});

app.post('/team/pokemons', () => {

});

app.get('/team', () => {

});

app.delete('/team/pokemons/:pokeid', () => {

});

app.put('/team', () => {

});


app.listen(port, () => {
    console.log('Server started at port: 3001');
});


// Para ofrecer esto a algun módulo externo, por ejemplo a los de pruebas.
exports.app = app;