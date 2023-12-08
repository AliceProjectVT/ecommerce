const router = express.Router();

// GET /pruebas
router.get('sencilla', (req, res) => {
let sum=0
for (let i = 0 ; i < 1000000; i ++){
    sum+=1
}    res.send({sum});
});


router.get('compleja', (req, res) => {
let sum=0
for (let i = 0 ; i < 7e8; i ++){
    sum+=1
}    res.send({sum});
});

export default router;
