var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var port = process.env.port || 3000;

var friends = [
    {
    name: "James",
    pics: "http://cdn.skim.gs/images/htlpqr436vnkrvk1uj7g/ferret-facts",
    score: [1,5,3,3,2,4,1,4,4,3]
    },
       {
    name: "Bart",
    pics: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNC1ic0z5z0VeMzIOV6KHm-vBETzcgBEKvLep88Bg7H6d2wbJHig_zrQ",
    score: [5,2,4,4,2,1,1,2,5,5]
       },
        {
    name: "Marge",
    pics: "https://upload.wikimedia.org/wikipedia/en/0/0b/Marge_Simpson.png",
    score: [5,5,3,3,2,2,1,1,1,1]
    },
       {
    name: "Homer",
    pics: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc6OYQSJGEDcZ-7RhF1-4ndu21gQa-Qia-cx0XhoeGlvlUb2vqjg",
    score: [2,3,4,4,1,1,1,3,2,2]
    }     
  ];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type:"application/vnd.api+json"}));
app.use("/assets", express.static(path.join(__dirname, "app/public")));

app.get("/", function(req, res) {
   res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "/app/public/survey.html"))
});

app.listen(port, function(req, res) {
    console.log("Listening on port " + port);  
})

app.post("/api/new", function(req, res){
    var comp = req.body;
        var currentLow;
        var lowestFriend;
    for(var i = 0; i < friends.length; i++){

        var total = 0;
        for(var j = 0; j < comp.score.length; j++){
            total = total + Math.abs(comp.score[j] - friends[i].score[j]);
        }
        if(currentLow == undefined || total < currentLow){
            currentLow = total;
            lowestFriend = i;
            console.log(currentLow, lowestFriend);
        }
    } 
            console.log(friends[lowestFriend]);
        res.json(friends[lowestFriend]);
    })