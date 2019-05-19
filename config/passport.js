// const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../models/User");
const config = require("config");

module.exports = function(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      done(null, user);
    });
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: config.get("clientID"),
        clientSecret: config.get("clientSecret"),
        callbackURL: "http://localhost:5000/auth/google/callback"
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        console.log(refreshToken);
        console.log("PROFILE = ", profile);

        User.findOne({ googleId: profile.id }, async (err, user) => {
          try {
            if (user) {
              console.log("user is: ", user);
              done(null, user);
            }

            user = new User({
              email: profile._json.email,
              name: profile.displayName,
              googleId: profile.id,
              profile: profile._json.profile,
              avatar: profile._json.picture
            });

            await user.save();

            console.log("PASSPORT.JS === ", user.id);

            await done(null, user);
          } catch (err) {
            console.error(err.message);
          }
        });
      }
    )
  );
};
