var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var port = process.env.port || 3000;


var friends = [
    {
    name: "James",
    pics: "https://www.google.com/search?q=ferret+pics&tbm=isch&imgil=OmoDMIgHlEwkEM%253A%253Bm3CUZYBSJ1KpFM%253Bhttp%25253A%25252F%25252Fanimalsbirds.com%25252Fbeautiful-animals-ferret-photos-collection%25252F&source=iu&pf=m&fir=OmoDMIgHlEwkEM%253A%252Cm3CUZYBSJ1KpFM%252C_&usg=__AgDZJRkV4yWCXgNTjeC3XcdlFUI%3D&biw=1536&bih=725&dpr=1.25",
    score: [1,5,3,3,2,4,1,4,4,3]
    },
       {
    name: "Mel",
    pics: "https://www.google.com/search?q=ferret+pics&tbm=isch&imgil=OmoDMIgHlEwkEM%253A%253Bm3CUZYBSJ1KpFM%253Bhttp%25253A%25252F%25252Fanimalsbirds.com%25252Fbeautiful-animals-ferret-photos-collection%25252F&source=iu&pf=m&fir=OmoDMIgHlEwkEM%253A%252Cm3CUZYBSJ1KpFM%252C_&usg=__AgDZJRkV4yWCXgNTjeC3XcdlFUI%3D&biw=1536&bih=725&dpr=1.25",
    score: [5,2,4,4,2,1,1,2,5,5]
    } 
  ];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type:"application/vnd.api+json"}));

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
        if(total == undefined || total < currentLow){
            currentLow = total;
            lowestFriend = friends[i];
        }
        
    } 
            console.log(lowestFriend);
        res.json(lowestFriend);
    })
