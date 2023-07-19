const router = require('express').Router();
const userRouter = require('./modules/users/index');

router.use('/users', userRouter);

router.get("*", (req, res) => {
    res.redirect("/");
});

module.exports = router;