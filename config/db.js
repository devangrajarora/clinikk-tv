const mongoose = require("mongoose");
let exp = {};

exp.connectMongo = () => {
    let mongouri = process.env.mongouri;
    mongoose.connect(
        mongouri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        },

        (err) => console.log(err || `Connected to MongoDB`)
    );
};

module.exports = exp;
