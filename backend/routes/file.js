const express = require("express");
const router = express.Router();
const FileDB = require("../models").Files;
const NoteDB = require("../models").Notes;
// const fileUpload = require("express-fileupload");
// const multer = require("multer");
// const path = require('path')
// const fs = require("fs");
const http = require('http'); // or 'https' for https:// URLs
const fs = require('fs');

// //setam storage engine.ul
// const storageEngine = multer.diskStorage({
// 	destination: './uploads/',
// 	fileName: function(req,file,callback){
// 		callback(null, file.fieldname + '-'+ Date.now() +
// 		path.extname(file.originalname));
// 	}
// });

// //initializam fisierul uploadat
// const upload = multer({
// 	storage: storageEngine
// }).single('myImage');

router.get("/:note_id/files", async (req, res) => {
	try {
		const note = await NoteDB.findByPk(req.params.note_id, {
			include: [FileDB],
		});
		if (note) {
			res.status(200).send(note.files);
		} else {
			res.status(404).send({ message: "Note not found" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Error ocured while gering files" });
	}
});

router.get("/files/:file_id", async (req, res) => {
	try {
		const file = await FileDB.findByPk(req.params.file_id);
		if (file) {
			res.status(200).send(file);
		} else {
			res.status(404).send({ message: "File not found" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Error ocured while gering file" });
	}
});

router.post("/:note_id/create-file", async (req, res) => {
	const note = await NoteDB.findByPk(req.params.note_id);
	if (note) {
		console.log(req.files);
		if (req.files === null) {
			return res.status(400).json({ msg: "No file uploaded " });
		}
		const file = req.files.file;
		file.mv(`${__dirname}/uploads/${file.name}`, (err) => {
			if (err) {
				console.error(err);
				return res.status(500).send(err);
			}
		});
		const fileX = {
			name: file.name,
			link: `${__dirname}/uploads/${file.name}`,
			noteId: note.id,
		};
		try {
			await FileDB.create(fileX);
			res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
		} catch {
			res.status(500).send({ message: "Error ocured while creating file" });
		}
	} else {
		res.status(404).send({ message: "Note not found" });
	}
});

router.delete("/delete-file/:file_id", async (req, res) => {
	try {
		const file = await FileDB.findByPk(req.params.file_id);
		if (file) {
			FileDB.destroy({
				where: { id: file.id },
			}).then(res.status(200).send({ message: "File deleted" }));
		} else {
			res.status(404).send({ message: "File not found" });
		}
	} catch {
		res.status(500).send({ message: "Error ocured while deleting file" });
	}
});

router.post("/:idNote/uploadFile", async (req, res) => {
	if (req.files === null) {
		console.log(req.files);
		return res.status(400).json({ msg: "No file uploaded" });
	} else {
		const note = await NoteDB.findByPk(req.params.idNote);
		if (note === null) {
			return res.status(400).json({ msg: "No note aveiable" });
		} else {
			const file = req.files.file;
			const fileX = {
				name: file.name,
				link: `${__dirname}/uploads/${file.name}`,
				noteId: note.id,
			};
			try {
				await FileDB.create(fileX);
				//return res.status(200).send({ fileName: file.name, filePath: `/uploads/${file.name}` });
			} catch {
				return res.status(500).send({ message: "Error ocured while creating file" });
			}
			file.mv(`${__dirname}/uploads/${file.name}`, (err) => {
				return res.status(200).send("yes, merge");
			});
			console.log(file);
		}
	}
});

router.get('/downloadFile/:file_id', async (req, res) => {
	
		// const file = fs.createWriteStream(`/upload/${e.name}`);
		// const request = http.get(e.link, function(response) {
		// response.pipe(file)
		// });
		try{
		const file = await FileDB.findByPk(req.params.file_id);
			const downloadfile=file;
			console.log(downloadfile.link);
			res.download(downloadfile.link);
		
		}catch {
			res.status(500).send({ message: "Error ocured while downloading file" });
		}	
  });

module.exports = router;
