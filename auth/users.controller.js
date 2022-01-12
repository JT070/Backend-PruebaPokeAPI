const uuid = require('uuid');
const crypt = require('../tools/crypt.js');
const teams = require('../teams/teams.controller');

const userDatabase = {};
// UserId -> password

const registerUser = (userName, password) => {
    let hashedPwd = crypt.hashPasswordSync(password);
    console.log('___ Esta es la CONTRASEÑA HASHEADA: ');
    console.log(hashedPwd);
    // Guardar en la base de datos nuestro usuario
    let userId = uuid.v4();
    userDatabase[userId] = {
        userName: userName,
        password: hashedPwd,
    }
    teams.bootstrapTeam(userId);
}

const getUser = (userId) => {
    return userDatabase[userId];
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
        done('Missing user');
    }
}

exports.registerUser = registerUser;
exports.checkUserCredentials = checkUserCredentials;
exports.getUser = getUser;
exports.getUserIdFromUserName = getUserIdFromUserName;