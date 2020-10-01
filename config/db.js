const mongoose = require("mongoose");
let exp = {};

exp.connectMongo = () => {
//   var mongouri = `mongodb://localhost:27017/clinikk-tv`;
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
