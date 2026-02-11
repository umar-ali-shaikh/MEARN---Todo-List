const Note = require("../models/Note");

// GET ALL NOTES
async function getAllNotes(req, res) {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// GET NOTE BY ID
async function getNotesById(req, res) {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json(note);
    } catch (error) {
        console.error("Error fetching note by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// CREATE NOTE
async function createNotes(req, res) {
    try {
        const { title, content } = req.body;

        const newNote = new Note({ title, content });
        const savedNote = await newNote.save();

        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// UPDATE NOTE
async function updateNotes(req, res) {
    try {
        const { title, content } = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// DELETE NOTE
async function deleteNotes(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({
            message: "Note deleted successfully",
            deletedNote
        });
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getAllNotes,
    getNotesById,
    createNotes,
    updateNotes,
    deleteNotes
};
