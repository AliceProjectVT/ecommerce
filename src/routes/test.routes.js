import { Router } from 'express';
import sendMail from '../utils/sendMailer.js'

const router = Router();

//!!!  Testeo Artillery  !!!
router.get('/sencilla', (req, res) => {
    let sum = 0
    for (let i = 0; i < 1000000; i++) {
        sum += 1
    } res.send({ sum });
});


router.get('/compleja', (req, res) => {
    let sum = 0
    for (let i = 0; i < 7e8; i++) {
        sum += 1
    } res.send({ sum });
});
//artillery quick --count 40 --num 50 'http://localhost:4000/pruebas/sencilla' -o sencilla.json
//artillery quick --count 40 --num 50 'http://localhost:4000/pruebas/compleja' -o compleja.json


//!!! FIN   Testeo Artillery  !!!

//!!! TESTEO LOGGER !!!
router.get('/info', (req, res) => {
    req.logger.info("INFO")
    res.send("INFO")
});

router.get('/warning', (req, res) => {
    req.logger.warning("WARNING")
    res.send("WARNING")
});
router.get('/error', (req, res) => {
    req.logger.error("ERROR")
    res.send("ERROR")
});
router.get('/fatal', (req, res) => {
    req.logger.fatal("FATAL")
    res.send("FATAL")
});

//!!! FIN TESTEO LOGGER !!!
//!!! TESTEO MAILER!!!
router.get('/nodemailer', async (req, res) => {
    await sendMail('islamartinezd@gmail.com', 'ESTO TA DURO PAPI', '<h1>Testing Nodemailer</h1> <img src="cid:imagen" />')
    res.send("MAIL ENVIADO")
}
)
//!!! FIN TESTEO MAILER!!!
router.get('/setcookies', (req, res) => {
    res.cookie('Galleta', 'info de la cookie', { maxAge: 1000 * 60 * 60 * 24 }).send('Cookie seteada')

})
router.get('/setsignedcookies', (req, res) => {
    res.cookie('Galleta', 'info de la cookie', { maxAge: 1000 * 60 * 60 * 24, signed: true }).send('Cookie seteada y firmada')

})

router.get('/getcookies', (req, res) => {
    console.log(req.signedCookies)
    res.send(req.signedCookies)
})

router.get('/borrarcookies', (req, res) => {
    res.clearCookie('Galleta').send('Cookie borrada')
})
router.get('/session', (req, res) => {
    if (req.session.count) {
        req.session.count++
        res.send(`Hola el sitio ha sido visitado ${req.session.count} veces`)
    } else {
        req.session.count = 1
        res.send('Bienvenido')
    }
})

router.get('/destroy', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.send({ status: 'logout error', error: err })
        } else {
            res.send('logout success')
        }
    })
})
export default router;
