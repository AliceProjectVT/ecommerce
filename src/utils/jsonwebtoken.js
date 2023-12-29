import jwt from 'jsonwebtoken'

const PRIVATE_KEY = 'SecretKeyqueFuncionaParaFirmarElToken'
// asdñf jasdlkfsadljfkasldñfjlñasdjfñlasdjfñlasdflñasjdfasd

// crea el token
const generateToken = (user) => {
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' })
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

    jwt.verify(token, PRIVATE_KEY, (error, credential) => {
        if (error) {
            return res.status(403).json({ status: 'error', error: 'NOT Authorizated' })
        }

        req.user = credential.user
        next()
    })
}

export {
    generateToken,
    authToken
}