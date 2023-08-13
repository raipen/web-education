const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('this is api')
});

router.get('/todolist', (req, res) => {
    res.send('this is todolist')
});

module.exports = router;
