require('dotenv').config();
const app = require("./config/server.js"); 
const port = process.env.APP_PORT || 8000;

app.listen(port, () => {
    console.log(`Server backend started : ${port}`)
});

module.exports = app;