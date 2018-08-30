var mongoose =require("mongoose");
var Work=new mongoose.Schema({
    "leibie":String,
    'sid':Number

});


var mode=mongoose.model("fenlei",Work);
module.exports=mode;