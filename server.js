const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes");

const passport = require("passport");
const session = require("express-session");

const app = express();
const port = 9999;

require("./config/passport-config")(passport);
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use("/", router);

app.get("/", (req, res) => {
  res.status(200).send("Server is working");
});

app.listen(port, () => {
  console.log("Server is runing on port " + port);
});
