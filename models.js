
//requiring mongoose and setting the connection
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/catchphrase_app");

//define the schema, set default values for failure
var catSchema = new mongoose.Schema({
  word: { type: String, default: "undefined word" },
  description: { type: String, default: "undefined description" }
});

//attach the schema to the model
var Cat = mongoose.model("Cat", catSchema);

// export the model
module.exports.Cat = Cat;