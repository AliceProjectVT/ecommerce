import jwt from 'jsonwebtoken';
import { configObject } from '../config/config.js';

export const requireTokenHelper = (rolRequired, options) => {
    const cookies = options.data.root.cookies;

    if (!cookies || !cookies.cookieToken) {
        // No hay cookies o no se encuentra la cookieToken
        return options.inverse(this);
    }

    try {
        const decoded = jwt.verify(cookies.cookieToken, configObject.jwt_private_key);

        if (rolRequired.includes(decoded.role)) {
            return options.fn(this);
        } else {
            // El usuario no tiene el rol necesario
            return options.inverse(this);
        }
    } catch (error) {
        // Error al verificar el token
        console.error(error);
        return options.inverse(this);
    }
};
