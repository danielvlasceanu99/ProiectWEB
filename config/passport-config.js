const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../models").Users;

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({
        where: { email: email },
      }).then((user) => {
        if (!user) {
          console.log("E logat/email");
          return done(null, false, { message: "Email-ul nu e folosit" });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            console.log("E logat");
            return done(null, user);
          } else {
            console.log("E logat/parola");
            return done(null, false, { message: "Parola e incorecta" });
          }
        });
      });
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findByPk(id, function (err, user) {
      done(err, user);
    });
  });
};
