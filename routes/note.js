const express = require("express");
const router = express.Router();
const NoteDB = require("../models").Notes;
const UserDB = require("../models").Users;

router.get("/:user_id/notes", async (req, res) => {
  try {
    const user = await UserDB.findByPk(req.params.user_id, {
      include: [NoteDB],
    });
    if (user) {
      res.status(200).json(user.notes);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch {
    res.status(500).send({ message: "Error ocured while geting notes" });
  }
});

router.get("/notes/:note_id", async (req, res) => {
  NoteDB.findByPk(req.params.note_id)
    .then((note) => {
      res.status(200).json(note);
    })
    .catch(() => {
      res.status(500).send({ message: "Error ocured while geting note" });
    });
});

router.post("/:user_id/create-note", async (req, res) => {
  const user = await UserDB.findByPk(req.params.user_id);
  if (user) {
    const note = {
      title: req.body.title,
      subject: req.body.subject,
      text: req.body.text,
      userId: user.id,
    };

    const errors = [];
    if (!note.title) {
      errors.push("No title");
    }
    if (!note.subject) {
      errors.push("No subject");
    }

    if (errors.length === 0) {
      try {
        await NoteDB.create(note);
        res.status(201).send({ message: "Note created" });
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error ocured while creating note" });
      }
    } else {
      res.status(400).send({ errors });
    }
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

router.put("/:note_id/update-note", async (req, res) => {
  try {
    const note = await NoteDB.findByPk(req.params.note_id);
    if (note) {
      const errors = [];
      if (!req.body.title) {
        errors.push("No new password");
      }
      if (!req.body.subject) {
        errors.push("No new subject");
      }

      if (errors.length === 0) {
        await note
          .update({
            title: req.body.title,
            subject: req.body.subject,
            text: req.body.text,
          })
          .then(() => {
            res.status(200).send({ message: "Note updated" });
          });
      } else {
        res.status(400).send(errors);
      }
    } else res.status(404).send({ message: "Note not found" });
  } catch {
    res.status(500).send({ message: "Server error" });
  }
});

router.delete("/delete-note/:note_id", async (req, res) => {
  try {
    const note = await NoteDB.findByPk(req.params.note_id);
    if (note) {
      NoteDB.destroy({
        where: {
          id: note.id,
        },
      }).then(res.status(200).send({ message: "Note deleted" }));
    } else {
      res.status(404).send({ message: "Note not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error ocured while deleting note" });
  }
});

module.exports = router;
