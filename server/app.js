var express = require("express");
const fetch = require("node-fetch")
var app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.get('/cred', (req, res) => {
    var randomuApiUrl = "https://randomuser.me/api/?results=4&seed=" + req.headers["origin"];
    fetch(randomuApiUrl).then(response=>{
        return response.json()
    }).then(body=>{
        var agents = body.results.map(agent =>{
            return {
                name:agent.name.title+" "+agent.name.first+" "+agent.name.last,
                phone:agent.phone,
                photo:agent.picture.thumbnail
            }
        });
        res.json({agents:agents});
    })
});

app.listen(3000, "0.0.0.0", () => {
    console.log('App listening on port 3000!');
});