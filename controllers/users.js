const uuid = require('uuid');
const crypt = require('../crypt.js');

const userDatabase = {};
// UserId -> password

const registerUser = (userName, password) => {
    let hashedPwd = crypt.hashPasswordSync(password);
    // Guardar en la base de datos nuestro usuario
    userDatabase[uuid.v4()] = {
        userName: userName,
        password: result,
    }
}

const getUserIdFromUserName = (userName) => {
    for (let user in userDatabase) {
        if (userDatabase[user].userName == userName) {
            return userDatabase[user];
        }
    }
}

const checkUserCredentials = (userName, password, done) => {
    console.log('checking user credentials');
    // Comprobar que las credenciaes son correctas
    let user = getUserIdFromUserName(userName);
    if (user) {
        console.log(user);
        crypt.comparePassword(password, user.password, done);
    } else {
        done('Missing user :(');
    }
}

