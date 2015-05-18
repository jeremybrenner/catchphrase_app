var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var db = require("./models");
var app = express();
var views = path.join(process.cwd(), "views");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static("bower_components"));


var views = path.join(process.cwd(), "views");


app.get("/", function (req, res) {
  res.sendFile(path.join(views, "home.html"));
});

//get and send all the phrases in db
app.get("/phrases", function (req, res) {
  db.Cat.find({},
    function (err, phrases) {
      res.send(phrases);
    });
});

app.post("/phrases", function (req, res) {
  db.Cat.create(req.body.phrase, 
    function (err, phrase) {
      console.log(phrase)
      res.send(phrase);
    });
});

//find and remove object from db on delete using id
app.delete("/phrases/:_id", function (req, res) {
  db.Cat.findOneAndRemove({
    _id: req.params._id
  }, function (err, phrase) {
    res.send(phrase) 
  })
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log( 'ENGAGE!', host, port);
});
