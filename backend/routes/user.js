const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();
const UserDB = require("../models").Users;
const { forwardAuthenticated } = require("../config/auth");

router.post("/create-user", async (req, res) => {
	const existingUser = await UserDB.findOne({
		where: {
			email: req.body.email,
		},
	});
	console.log(existingUser);
	if (existingUser === null) {
		const user = {
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		};
		const confirmPassword = req.body.confirmPassword;
		const errors = [];

		if (!user.name) {
			errors.push("No name");
		} else if (!user.name.match(/(^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$)/)) {
			//full name regex
			errors.push("invalid name");
		}

		if (!user.email) {
			errors.push("No email");
		} else if (!user.email.match(/(^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@\bstud.ase.ro)/)) {
			//institutional mail regex
			errors.push("Invalid email");
		}

		if (!user.password) {
			errors.push("No password");
		} else if (!user.password.match(/(^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$)/)) {
			//Minimum eight characters, at least one letter and one number:
			errors.push("Invalid password");
		}

		if (!confirmPassword) {
			errors.push("No confirmed password");
		} else if (user.password !== confirmPassword) {
			errors.push("Password dose not match");
		}

		if (errors.length === 0) {
			try {
				const salt = await bcrypt.genSalt(10);
				user.password = await bcrypt.hash(user.password, salt);
				await UserDB.create(user);
				res.status(201).send({ message: "User created" });
			} catch (error) {
				console.log(error);
				res.status(500).send({ message: "Error ocured while creating user" });
			}
		} else {
			res.status(400).send({ errors });
		}
	} else {
		res.status(201).send({ message: "Email already exists" });
	}
});

router.put("/update-password/:id", async (req, res) => {
	try {
		const user = await UserDB.findByPk(req.params.id);
		if (user) {
			if (!req.body.password) {
				res.status(400).send({ message: "No new password" });
			} else if (!user.password.match(/(^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$)/)) {
				res.status(400).send({ message: "Invalid new password" });
			} else {
				user.update({ password: req.body.password }).then(() => {
					res.status(200).send({ message: "Password updated" });
				});
			}
		} else {
			res.status(404).send({ message: "User not found" });
		}
	} catch {
		res.status(500).send({
			message: "Server error",
		});
	}
});

router.post("/login", (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) {
			throw err;
		}
		if (!user) {
			res.send("No user");
		} else {
			req.logIn(user, (err) => {
				if (err) {
					throw err;
				}
				res.json({ id: req.user.dataValues.id }).send();
				console.log(req.user);
			});
		}
	})(req, res, next);
});

router.get("/user", (req, res) => {
	console.log(req.user);
	res.send(req.user);
});
module.exports = router;
