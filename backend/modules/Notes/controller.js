const { findAllNotes, findOneNote, createNote, removeNote, modifyNote } = require("./model"); 

const getAllNotes = async (req, res) => {
    try {
        const datagetAllNotes = await findAllNotes();

        if (datagetAllNotes.length !== 0) {
            res.status(200).json(datagetAllNotes)
        } else {
            res.status(404).json({error : "No notes"});
        }

    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const addNote = async (req, res) => {
    const note = req.body;
    try {
        const dataAddNote = await createNote(note);
        res.status(201).json(dataAddNote)
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const getNote = async (req, res) => {
    const id = req.params.id;
    try {
        const dataGetNote = await findOneNote(id);
        res.status(201).json(dataGetNote)
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const deleteNote = async (req, res) => {
    const id = req.params.id;
    try {
        const dataDeleteNote = await removeNote(id);
        if (dataDeleteNote.affectedRows === 1) {
            res.sendStatus(204);
        } else {
            res.status(404).json({ message : "No note found"})
        }
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

const editNote = async (req, res) => {
    const id = req.params.id;
    
    const note = req.body;
    
    try {
        const dataEditNote = await modifyNote(note, id);
        if (dataEditNote.affectedRows === 1) {
            res.json({ id, ...note})
        } else {
            res.status(404).json({ message : "No note found"})
        }
    } catch (err) {
        console.log("err", err)
        res.status(500).json({error : err.message});
    }
}

module.exports = { getAllNotes, getNote, addNote, deleteNote, editNote};