import passport from "passport"
import GithubStrategy from "passport-github2"
import { userService } from "../services/service.js"
import { configObject } from "./config.js"
import jwt from "passport-jwt"

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt


const initializePassport = () => {

    const cookieExtractor = (req) => {
        let token = null
        if (req && req.cookies) {
            token = req.cookies['cookieToken']
        }
        return token
    }

    const objectStrategyJwt = {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: configObject.jwt_private_key
    }


    passport.use('jwt', new JWTStrategy(objectStrategyJwt, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)

        }

    }))





    //middleware /estrategia
    passport.use('github', new GithubStrategy({
        clientID: configObject.ID_github_client,
        clientSecret: configObject.codigo_github,
        callbackURL: configObject.callback_github,
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userService.getBy({ email: profile._json.email })
            if (!user) {
                let newUser = {
                    first_name: profile.username,
                    last_name: profile.username,
                    email: profile._json.email,
                    password: ""
                }
                let result = await userService.create(newUser)
                return done(null, result)

            } return done(null, user)
            let newUser = {
                githubId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value
            }


        } catch (error) {
            done(error, false)
        }

    }))


















    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        let user = await userService.getBy({ _id: id })
        done(null, user)
    })

}
export default initializePassport