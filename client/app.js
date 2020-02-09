var express = require("express");
var app = express();

app.use(express.static('public'))


app.listen(1234, "0.0.0.0", () => {
    console.log('App listening on port 8080!');
});