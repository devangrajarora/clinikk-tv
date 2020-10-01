const to = require('../utils/to');
const bcrypt = require('bcryptjs');

let exp = {};

exp.register = async (req, res) => {
    const { name, email, pass, location } = req.body;
    console.log(req.body);  
    return res.send({name,email,pass,location});
}

module.exports = exp;