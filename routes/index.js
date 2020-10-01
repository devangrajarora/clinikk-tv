const express = require('express');
const router = express.Router();
const auth = require('./auth');
const admin = require('./admin');

// middlewares
const loggedIn = (req, res, next) => {
    console.log(req.session);
    if(typeof(req.session.isLoggedIn) === 'undefined' || req.session.isLoggedIn === false) {
        return res.redirect('/login');
    } else {
        return next();
    } 
}

const notLoggedIn = (req, res, next) => {
    console.log(req.session);
    if (typeof(req.session.isLoggedIn) === 'undefined' || req.session.isLoggedIn === false) {
        return next();
    } else {
        return res.redirect('/');
    }
}


router.post('/register', auth.register);
router.get('/login', notLoggedIn, auth.login);
router.get('/logout', loggedIn, auth.logout);

router.post('/uploadContent', loggedIn, admin.uploadContent);

module.exports = router;