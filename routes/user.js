const content = require('../models/content');
const users = require('../models/users');
const to = require('../utils/to');
let exp = {};

exp.getContent = async(req, res) => {

    try {
        let result = await content.find({}).sort('-uploaded_at'); 
        if(!result) {
            return res.sendError(null);
        } else {
            return res.sendSuccess(result);
        }
    } catch(err) {
        return res.sendError(null,`Some error occured`);
    }
}

exp.getContentByID = async(req, res) => {

    try {
        let result = await content.findById(req.params.contentID); 
        if(!result) {
            return res.sendError(null);
        } else {
            return res.sendSuccess(result);
        }
    } catch(err) {
        return res.sendError(null,`Couldn't find file`);
    }
}

exp.addToFavourites = async(req, res) => {

    try {

        const contentID = req.body.contentID; 
        const email = req.body.email.trim(); 

        [err, result] = await to (users.findOne({$and : [{ email : email}, {favourites : contentID }]}));   
    
        if(err) {
            return res.sendError(null,`Some error occured here`);
        } 
    
        if(result) {
            return res.sendError(null,`Already added to favourites`);
        } 
    
        [err, result] = await to (users.updateOne({ email : email }, { $push: {favourites : contentID }}));
        
        if(err) {
            return res.sendError(null,`Some error occured`);
        } else {
            return res.sendSuccess('Added to favourites');
        }
    } catch(err) {
        console.log(err);
        return res.sendError(null,`Some error occured`);
    }
}


exp.myFavourites = async(req, res) => {

    try {
        console.log(req.body);
        let result = [];
        [err, favs] = await to (users.findOne({email: req.body.email}, {favourites:1, _id:0}));
        
        if(err) {
            return res.sendError(null,`Some error occured`); 
        }

        // await the array of promises that you'll get with Promise.all using map
    
        await Promise.all(favs.favourites.map(async (fav) => {
            [err,info] = await to (content.findById(fav));
            console.log({err,info});
            if(info) {
                result.push(info);
            }
        }));
    
        res.sendSuccess(result);    

    } catch(err) {
        res.sendError(err);
    }

}

module.exports = exp;