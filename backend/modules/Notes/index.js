const { Router } = require("express");
const { browse, getCurrentUser, register, login, logout, edit, deleteUserOne, sendResetPassword, resetPassword } = require("./controller");

const { authorization, isAdmin } = require("../../middlewares/auth");

const upload = require("../../middlewares/fileUpload");

const router = Router();

router.get("/", authorization, browse);
router.post("/", resetPassword);
router.put("/:id", authorization, upload.single("avatar"), edit);
router.delete('/:id', authorization, deleteUserOne);

module.exports = router;