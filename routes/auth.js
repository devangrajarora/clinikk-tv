const to = require('../utils/to');
const bcrypt = require('bcryptjs');
const users = require('../models/user');

let exp = {};

exp.register = async (req, res) => {

    try {

        let {name, email, password, location} = req.body;
        name = name.trim(), email = email.trim(), password = password.trim(), location = location.trim(); 

        let userExists = await users
				.findOne({ "email": email })
				.exec();

		if (userExists) return res.sendError(null, "E-mail already registered")

        password = bcrypt.hashSync(
            password,
            bcrypt.genSaltSync(10)
        );

        let access = (req.body.access == 1) ? 1 : 0;

        const user = new users({
            name,
            email,
            password,
            location,
            access
        });
        
        let result = await user.save();

        if(!result) {
            return res.sendError(null, 'Some error occured');
        } else {
            return res.sendSuccess('Registered successfully!');
        }
    } catch(err) {
        return res.sendError(err,'Not registered');
    }
}

exp.login = async (req, res) => {

    try {

        let email = req.body.email.trim();
        let password = req.body.password.trim();

        let user = await users
            .findOne({email: email})
            .exec();

        if(!user) {
            return res.sendError(null,'User not registered!');
        }

        if (bcrypt.compareSync(password, user.password)) {

            user.password = null;
            delete user.password;
            req.session.id = user._id;
            req.session.isLoggedIn = true;
            req.session.name = user.name;
            req.session.email = user.email;
            req.session.acess = user.access;
            req.session.save();
            // console.log(req.session);

            const obj = {
                "name": user.name, 
                "email": user.email
            }

            return res.sendSuccess(obj);
        } else {
            return res.sendError(null, 'Invalid login credentials');
        }


    } catch(err) {
        return res.sendError(null, 'Some error occured');
    }
}

exp.logout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.sendError(err, "Logout failed");
            } else {
                return res.sendSuccess("Logged out");
            }
        });
    } catch (err) {
        return res.sendError(err, "Logout failed");
    }
}


module.exports = exp;