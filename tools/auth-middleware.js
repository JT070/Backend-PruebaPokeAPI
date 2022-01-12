const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');

const init = () => {
    // Se ejecuta cuando se enciende el servicio
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
        secretOrKey: 'secretPassword',
    }
    passport.use(new JwtStrategy(opts, (decoded, done) => {
        return done(null, decoded);
    }));
}

const protectWithJwt = (req, res, next) => {
    if (req.path == '/' || req.path == '/auth/login') {
        return next(); // Para dejas pasar la petición y no hacer nada
    }
    return passport.authenticate('jwt', {session: false})(req, res, next);
}

exports.init = init;
exports.protectWithJwt = protectWithJwt;