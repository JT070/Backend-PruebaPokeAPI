const bcrypt = require('bcrypt');

const hashPassword = (plainTextPwd, done) => {
    bcrypt.hash(plainTextPwd, 10, done);
}

const comparePassword = (plainPassword, hashPassword, done) => {
    //Función sacada de la documentación
    bcrypt.compare(plainPassword, hashPassword, done);
}