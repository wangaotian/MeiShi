var path = require("path");
var url=require('url')
var formidable = require("formidable");
var fs = require("fs");
var mode=require('../mongoose/mongose')
var menulist=require('../mongoose/menulist')
var redom=require('../mongoose/redom.js')
exports.showIndex = function(req,res){
    res.render("index")
}

exports.fenlei=function (req,res) {
    mode.count({},function (err,count) {
        mode.find({},function (err,data) {
            res.json({
                "result":data,
            })
        })
    })
};

exports.add=function (req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        console.log(fields.leibie)
        mode.find({"leibie":fields.leibie},function (err,data) {
            if (data.length==0){
                var json=new mode(fields)
                json.save(function (err) {
                    if (err){
                        res.json({"s":-1});
                        return;
                    }else {
                        res.json({"s":1});
                        return;
                    }
                })
            }
            else {
                res.json({"s":-2})
            }
        })
    })
};

exports.delete=function (req,res) {
    var id=req.params.sid;
    mode.find({"_id":id},function (err,results) {
        if(err || results.length == 0){
            res.json({"s" : -1});
            return;
        }
        results[0].remove(function(err){
            if(err){
                res.json({"s" : -1});
                return;
            }

            res.json({"s" : 1});
        });
    })
};
exports.detailed=function (req,res) {
    var id=req.params.id;
    mode.find({"_id":id},function (err,results) {
        if(err || results.length == 0){
            res.json({"s" : -1});
            return;
        }
        res.json({"s":results[0]})
    })
};
exports.updateAdd=function (req,res) {
    var id=req.params.id;
    console.log(id)
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        mode.find({"_id":id},function (err,data) {
            if (data.length==0){
                res.json({"s":-1})
            }
            console.log(data)
            var result=data[0];
            result.leibie=fields.leibie;

            result.save(function (err) {
                if (err){
                    res.json({"s":-1})
                    return;
                }
                res.json({"s":1})
            })
        })
    })
}

exports.showMenu=function(req,res){
    res.render("menu")
}

exports.menulist=function (req,res) {
    menulist.count({},function (err,count) {
        menulist.find({},function (err,data) {
            res.json({
                "result":data,
            })
        })
    })
}
exports.addM=function(req,res){
    res.render("addmenu")
}
exports.addmenu=function (req,res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = "./uploads";
    form.parse(req, function (err, fields, files) {
        //改名，并且存入数据库

        var newname =redom.randomstr()

        fs.rename(files.fengmian.path, "./uploads/" + newname + ".jpg", function (err) {
            if (err) {
                res.end("error");
                return;
            }
            console.log(newname)
            console.log(fields.fenlei)
            console.log(fields.mingcheng)
            console.log(fields.jiage)
            console.log(fields.paixu )
            console.log(fields.miaoshu)
            console.log(fields.jingpin)
            console.log(fields.rexiao)
            menulist.create({
                "leibie" : fields.fenlei ,
                "dishes" : fields.mingcheng ,
                "price" : fields.jiage ,
                "sort" : fields.paixu ,
                "fengmian" : newname,
                "miaoshu" : fields.miaoshu ,
                "recommend" : fields.jingpin,
                "hot" : fields.rexiao ,
            },function (err,data) {
                res.send("<a href='/menu'>成功</a>")
            })
        });
    });
};
exports.deleteM=function (req,res) {
    var id=req.params.sid;
    menulist.find({"_id":id},function (err,results) {
        if(err || results.length == 0){
            res.json({"s" : -1});
            return;
        }
        results[0].remove(function(err){
            if(err){
                res.json({"s" : -1});
                return;
            }

            res.json({"s" : 1});
        });
    })
};
exports.detailedM=function (req,res) {
    var id=req.params.id;
    console.log(id)
    menulist.find({"_id":id},function (err,results) {
        if(err || results.length == 0){
            res.json({"s" : -1});
            return;
        }
        res.json({"s":results[0]})
    })
};
exports.updateAddM=function (req,res) {
    var id=req.params.id;
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {    console.log(fields.hot)
        menulist.find({"_id":id},function (err,data) {
            if (data.length==0){
                res.json({"s":-1})
            }
            var result=data[0];
            result.dishes=fields.dishes;
            result.leibie=fields.leibie;
            result.price=fields.price;
            result.miaoshu=fields.miaoshu;
            result.recommend=fields.recommend;
            result.hot=fields.hot;

            result.save(function (err) {
                if (err){
                    res.json({"s":-1})
                    return;
                }
                res.json({"s":1})
            })
        })
    })
}

//搜索
exports.search = function(req,res){
    var qobj = url.parse(req.url,true).query;

    //模糊查询请求！
    menulist.search(qobj.w,function(results){
        res.json({"results" : results});
    });
}
