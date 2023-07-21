const validateUser = (req, res, next) => {
    const { username, email, password } = req.body;
    const errors = [];

    if (username == null || username === "") {
        errors.push({ field : "username", message : "This username is required"})
    }
    

    if (email == null || email === "") {
        errors.push({ field : "email - NULL", message : "This email is required"})
    }
    
    const emailRegex = /^[a-z0-9.-]+@[a-z-.]+\.[a-z]{2,3}$/g;

    if (!emailRegex.test(email)) {
        errors.push({ field : "email - FORMAT", message : "This email is required"})
    }
    
    if (password == null || password === "") {
        errors.push({ field : "password", message : "This password is required"})
    }

    if (errors.length) {
        res.status(422).json({ validationErrors: errors });
    } else {
        next();
    }
}

module.exports = { validateUser };