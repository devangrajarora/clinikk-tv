const express = require('express');
const router = express.Router();
const auth = require('./auth');
const admin = require('./admin');
const user = require('./user');

// middlewares
const loggedIn = (req, res, next) => {
    if(typeof(req.session.isLoggedIn) === 'undefined' || req.session.isLoggedIn === false) {
        return res.redirect('/login');
    } else {
        return next();
    } 
}

const notLoggedIn = (req, res, next) => {
    if (typeof(req.session.isLoggedIn) === 'undefined' || req.session.isLoggedIn === false) {
        return next();
    } else {
        return res.redirect('/feed');
    }
}


router.post('/register', auth.register);
router.get('/login', notLoggedIn, auth.login);
router.get('/logout', loggedIn, auth.logout);

router.post('/uploadContent', loggedIn, admin.uploadContent);

router.get('/feed', loggedIn, user.getContent);
router.get('/feed/:contentID', loggedIn, user.getContentByID);
router.post('/addToFavourites', loggedIn, user.addToFavourites);
router.get('/myFavourites', loggedIn, user.myFavourites);
router.post('/like', loggedIn, user.like);
router.post('/dislike', loggedIn, user.dislike);
router.get('/contentByCategory', loggedIn, user.contentByCategory);

module.exports = router;