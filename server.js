const express = require("express");
const passport = require("passport");

const connectDB = require("./config/db");
const app = express();
const port = process.env.PORT || 5000;

app.get('/*', function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	next();
});

// Passport Config
require("./config/passport")(passport);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Connect with MongoDB
connectDB();

// Define Routes
app.use("/auth", require("./routes/auth"));

app.listen(port, () => console.log(`Server Started on PORT ${port}`));
