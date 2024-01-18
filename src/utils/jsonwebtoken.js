import jwt from 'jsonwebtoken'
import { configObject } from '../config/config.js'

const PRIVATE_KEY = 'SecretKeyqueFuncionaParaFirmarElToken'
// asdñf jasdlkfsadljfkasldñfjlñasdjfñlasdjfñlasdflñasjdfasd

// crea el token
const generateToken = (user) => {
    const token = jwt.sign({ user }, configObject.jwt_private_key, { expiresIn: '24h' })
    return token
}

// opera a nivel middleware
const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'] /// authorization: BEARER lkahjsdfkhsdafkjsahdfkhsadkfhashkfahsfkhsdak
    // conso
    if (!authHeader) {
        return res.status(401).json({ status: 'error', error: 'Not Autenticated' })
    }
    // token= [ 'BEARER', 'lkahjsdfkhsdafkjsahdfkhsadkfhashkfahsfkhsdak']
    const token = authHeader.split(' ')[1]

    jwt.verify(token, configObject.jwt_private_key, (error, credential) => {
        if (error) {
            return res.status(403).json({ status: 'error', error: 'NOT Authorizated' })
        }

        req.user = credential.user
        next()
    })
}
const verifyResetToken = (token) => {
    try {
        const decoded = jwt.verify(token, configObject.jwt_private_key);
        return decoded.email;
    } catch (error) {
        console.error('Error al verificar el token:', error);
        return null;
    }
}


export {
    generateToken,
    authToken,
    verifyResetToken

}