const validateNote = (req, res, next) => {
    const { title } = req.body;
    const errors = [];

    if(title.length > 255) {
        errors.push({ field : "Title - FORMAT LIMIT", message : "Character Title limit error exceeded (45)"})
    }

    if (errors.length) {
        res.status(422).json({ validationErrors: errors });
    } else {
        next();
    }
}

module.exports = { validateNote };