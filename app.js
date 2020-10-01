const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require('express');
const bodyParser = require("body-parser");
const session = require('express-session');
const redis = require("redis");
const redisStore = require('connect-redis')(session);

const db = require('./config/db');
const response = require('./utils/response');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: "secret",
      store: new redisStore({ host: 'localhost', port: 6379, client: redis.createClient() }),
      cookie: { maxAge: 604800000 }
    })
);

app.use(response);
app.use("/", require("./routes"));

db.connectMongo();

app.listen(PORT, (err) => {
    console.log(err || `Listening on port ${PORT}`);
})