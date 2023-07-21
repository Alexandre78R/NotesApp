const router = require('express').Router();
const userRouter = require('./modules/users/index');
const noteRouter = require("./modules/Notes/index")
router.use('/users', userRouter);
router.use('/notes', noteRouter);
// router.get("*", (req, res) => {
//     res.redirect("/");
// });

module.exports = router;