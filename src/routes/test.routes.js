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

export default router;
