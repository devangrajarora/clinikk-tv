const express = require('express');
const router = express.Router();
const auth = require('./auth');

// middlewares
const loggedIn = (req, res, next) => {
    if(typeof(req.session.isLoggedIn) === 'undefined' || req.session.isLoggedIn === false) {
        return res.redirect('/login');
    } else {
        return next();
    } 
}

const notLoggedIn = (req, res, next) => {
    if (typeof(req.session.logged_in) === 'undefined' || req.session.logged_in === false) {
        return next();
    } else {
        return res.redirect('/');
    }
}


router.post('/register', notLoggedIn, auth.register);
router.get('/login', notLoggedIn, auth.login);
router.get('/logout', loggedIn, auth.logout);

module.exports = router;