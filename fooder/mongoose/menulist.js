var mongoose =require("mongoose");
var menulist=new mongoose.Schema({
    'dishes':String,
    "leibie":String,
    'price':Number,
    'sort':Number,
    'fengmian':String,
    'miaoshu':String,
    'recommend':String,
    'hot':String,

});
menulist.statics.search = function(word,callback){
    console.log(word);
    this.find(
        {
            "$or" : [
                {"leibie" : word},
                {"dishes" : word},
                {"price" :word}
            ]
        }
    ).sort({"cid":1}).exec(
        function(err,results){
            callback(results);
        }
    );
}

var menulist=mongoose.model("menulist",menulist);
module.exports=menulist;