const content = require('../models/content');
const users = require('../models/users');
const to = require('../utils/to');
let exp = {};

exp.getContent = async(req, res) => {
    let result = await content.find({}).sort('-uploaded_at'); 
    if(!result) {
        return res.sendError(null);
    } else {
        return res.sendSuccess(result);
    }
}

exp.getContentByID = async(req, res) => {
    let result = await content.findById(req.params.contentID); 
    if(!result) {
        return res.sendError(null);
    } else {
        return res.sendSuccess(result);
    }
}

exp.addToFavourites = async(req, res) => {

    const contentID = req.params.contentID; 

    [err, result] = await to (users.findOne({$and : [{ email : req.session.email}, {favourites : contentID }]}));
    // console.log({err,result});

    if(err) {
        return res.sendError(null,`Some error occured`);
    } 

    if(result) {
        return res.sendError(null,`Already added to favourites`);
    } 

    [err, result] = await to (users.updateOne({ email : req.session.email }, { $push: {favourites : contentID }}));
    
    if(err) {
        return res.sendError(null,`Some error occured`);
    } else {
        return res.sendSuccess('Added to favourites');
    }
}

module.exports = exp;