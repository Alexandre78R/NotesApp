const { Router } = require("express");
const { getAllNotes, getNote, addNote, deleteNote, editNote } = require("./controller");

const { authorization } = require("../../middlewares/auth");

const  { validateNote } =require("./validator");

const router = Router();

router.get("/",authorization, getAllNotes);
router.post("/",authorization, validateNote, addNote);
router.get("/:id",authorization, getNote);
router.delete("/:id",authorization, deleteNote);
router.put("/:id", authorization, validateNote, editNote);


module.exports = router;