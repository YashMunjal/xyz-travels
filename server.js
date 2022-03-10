const express = require("express");
const bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
const ejs = require("ejs");
const engine = require("ejs-mate");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
var MongoStore = require("connect-mongo")(session);
const flash = require("express-flash");
const connectDB = require("./utils/dbConn");
const { mongo_creds, appSessionCreds } = require("./configs/creds");

const app = express();
connectDB();

//For parsing of post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cookieParser());

//For Session storage of user
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: appSessionCreds.sessionSecret,
    store: new MongoStore({ url: mongo_creds.mongoUrl, autoReconnect: true }),
  })
);

//For authentication of user
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

require('./controllers/userRoute')(app)
require('./controllers/admin/adminRoutes')(app)
require('./controllers/customer/customerRoutes')(app)


var PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
