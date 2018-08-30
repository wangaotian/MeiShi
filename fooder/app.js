var express = require("express");
var mongoose = require("mongoose");
var app = express();
mongoose.connect('mongodb://localhost:27017/diancan');
var models=require('./models/models')
//设置默认模板引擎
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.static("uploads"));
app.get ("/",models.showIndex);          //菜类页面
app.get("/fenlei",models.fenlei); //
app.post("/add/",models.add);//增加菜类
app.delete('/delete/:sid',models.delete);//删除菜类
app.get('/workDetailed/:id',models.detailed) //详情
app.post('/updateAdd/:id',models.updateAdd)// 修改菜类

app.get('/menu',models.showMenu)   //显示菜品页面
app.get('/menulist',models.menulist);  //  显示所有菜品
app.delete('/deleteM/:sid',models.deleteM);//删除菜
app.get('/MDetailed/:id',models.detailedM) //菜品详情
app.post('/updateAddM/:id',models.updateAddM)// 修改菜品信息

app.get("/search",models.search);  //搜索
app.get('/addM',models.addM)   //显示菜品增加页面
app.post('/addmenu',models.addmenu)   //增加菜品

app.listen(3000,'172.16.49.21');
