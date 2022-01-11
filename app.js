const express = require('express');
const app = express();
const port = 3001;

// El '/' es para que se ejcuta en la raíz
// Los parámetros de REQ y RES son los parámetros y
// las respuesta respectivamente.

app.get('/', (req, res) => {
    console.log(req);
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log('Server started at port: 3001');
});