const { Router } = require("express");
const { browse, getCurrentUser, register, login, logout, edit, deleteUserOne, sendResetPassword, resetPassword } = require("./controller");

const { authorization, isAdmin } = require("./validator");

const router = Router();

router.get("/", authorization, browse);
router.get("/me", authorization, getCurrentUser);
router.post("/register", register);
router.post("/login", login);
router.post("/sendResetPassword", sendResetPassword);
router.post("/resetPassword", resetPassword);
router.get("/logout", authorization, logout);
router.put('/:id', authorization, edit);
router.delete('/:id', deleteUserOne);

module.exports = router;