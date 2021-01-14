const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes");

const fileUpload = require("express-fileupload");

const passport = require("passport");
const session = require("express-session");
const cors = require("cors");

const app = express();
const port = 9999;

app.use(fileUpload())

const corsOptions = {
	origin: true,
	allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Methods", "Access-Control-Request-Headers"],
	credentials: true,
	enablePreflight: true,
};
app.use(cors(corsOptions));

require("./config/passport-config")(passport);
app.use(
	session({
		secret: "secret",
		resave: true,
		saveUninitialized: true,
	})
);

// app.use(function(req,res,next){
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   next();
// })

//fileUpload
//app.use(fileUpload());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use("/", router);

app.get("/", (req, res) => {
	res.status(200).send("Server is working");
});

// app.post('/upload',(req,res) =>{
//   if(req.files===null){
//     return res.status(400).json({msg: 'No file uploaded '});
//   }
//   const file=req.files.file;
//   file.mv(`${__dirname}/uploads/${file.name}`, err => {
//     if (err){
//       console.error(err);
//       return res.status(500).send(err);
//     }

//     res.json({fileName: file.name, filePath:`/uploads/${file.name}`});
//   })
// })

// app.listen(port, () => {
//   console.log("Server is runing on port " + port);
// });
// app.listen(5000, () => console.log('Server Started...'));

app.listen(port, () => {
	console.log("Server is runing on port " + port);
});
