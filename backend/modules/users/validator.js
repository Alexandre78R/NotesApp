const validateUserPost = (req, res, next) => {
    const { username, email, password } = req.body;
    const errors = [];

    if (username == null || username === "") {
        errors.push({ field : "username", message : "This username is required"})
    }
    

    if (email == null || email === "") {
        errors.push({ field : "email - NULL", message : "This email is required"})
    }

    if(username.length > 45) {
        errors.push({ field : "Username - FORMAT LIMIT", message : "Character username limit error exceeded (45)"})
    }

    if(email.length > 45) {
        errors.push({ field : "Email - FORMAT LIMIT", message : "Character email limit error exceeded (45)"})
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

const validateUserPut = (req, res, next) => {
    const { username, email } = req.body;
    const errors = [];

    if(username.length > 45) {
        errors.push({ field : "Username - FORMAT LIMIT", message : "Character username limit error exceeded (45)"})
    }

    if(email.length > 45) {
        errors.push({ field : "Email - FORMAT LIMIT", message : "Character email limit error exceeded (45)"})
    }

    const emailRegex = /^[a-z0-9.-]+@[a-z-.]+\.[a-z]{2,3}$/g;

    if (!emailRegex.test(email)) {
        errors.push({ field : "email - FORMAT", message : "This email is required"})
    }
    
    if (errors.length) {
        res.status(422).json({ validationErrors: errors });
    } else {
        next();
    }
}


module.exports = { validateUserPost, validateUserPut };