const uuid = require('uuid');
const crypt = require('../crypt.js');

const userDatabase = {
    '0001': {
        'password': '',
        'salt': '',
        'userName': '',
    }
};
// UserId -> password

const registerUser = (userId, password) => {
    // Guardar en la base de datos nuestro usuario
    crypt.hashPassword(password, (err, result) => {
        userDatabase[uuid.v4()] = {
            userName: userName,
            password: result,
        }
    });
}

const chechUserCredentials = (userId, password) => {
    // Comprobar que las credenciaes son correctas
    let user = userDatabase[userId];
    crypt.comparePassword(password, user.password, done);
    return false;
}