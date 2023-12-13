import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';

// Configurar estrategia de autenticación JWT
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'mi_secreto'
}, (payload, done) => {
    // Lógica de autenticación con el token JWT
    // ...
}));

export default passport;
