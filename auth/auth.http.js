const usersController = require('./users.controller');
const jwt = require('jsonwebtoken');

const loginUser = (req, res) => {
    if (!req.body) {
        return res.status(400).json({message: 'Missing data'});
    } else if (!req.body.user || !req.body.password) {
        return res.status(400).json({message: 'Missing data'});
    }
    // Comprobamos credenciales
    usersController.checkUserCredentials(req.body.user,  req.body.password, (err, result) => {
        // Si no son válidas -> ERROR
        if (err || !result) {
            return res.status(401).json({message: 'Invalid credentials'});
        }
        // Si son válidas -> Generamos un JWT y lo devolvemos
        let user = usersController.getUserIdFromUserName(req.body.user);
        const tokenA = jwt.sign({userId: user.userId}, 'secretPassword');
        res.status(200).json({token: tokenA});
    })
}

exports.loginUser = loginUser;