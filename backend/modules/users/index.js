const { Router } = require("express");
const { browse, getCurrentUser, register, login, logout, edit, deleteUserOne, sendResetPassword, resetPassword, getUser } = require("./controller");

const { authorization, isAdmin } = require("../../middlewares/auth");

const upload = require("../../middlewares/fileUpload");

const router = Router();

const { validateUserPost, validateUserPut } = require('./validator');

router.get("/", authorization, isAdmin, browse);
router.get("/me", authorization, getCurrentUser);
router.get("/logout", authorization, logout);
router.get("/:id", authorization, isAdmin, getUser);
router.post("/register", validateUserPost, register);
router.post("/login", login);
router.post("/sendResetPassword", sendResetPassword);
router.post("/resetPassword", resetPassword);
router.put("/:id", authorization, isAdmin, validateUserPut, upload.single("avatar"), edit);
router.delete('/:id', authorization, isAdmin, deleteUserOne);

module.exports = router;