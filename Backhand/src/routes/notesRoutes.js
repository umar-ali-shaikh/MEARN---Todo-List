const express = require("express");


const {
    getAllNotes,
    getNotesById,
    createNotes,
    updateNotes,
    deleteNotes
} = require("../controllers/notesControllers");


const router = express.Router();


// GET Notes
router.get("/", getAllNotes);

router.get("/:id", getNotesById);

// CREATE Note
router.post("/", createNotes);

// UPDATE Note
router.put("/:id", updateNotes);

// DELETE Note
router.delete("/:id", deleteNotes);

module.exports = router;
