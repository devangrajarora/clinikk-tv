const router = require('express').Router();
const auth = require('./auth');

router.get('/register', auth.register);

module.exports = router;