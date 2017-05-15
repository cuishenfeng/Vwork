var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var ejs=require("ejs");
//session  信息保存在服务器的  客户端保存一个密钥
var session=require("express-session");

//var cookieParser = require('cookie-parser');//处理cookie

var bodyParser = require('body-parser');//解析post数据
var index=require("./routes/index.js");
var admin=require("./routes/admin.js");
var login=require("./routes/login.js");
var log=require("./routes/log.js");

var app = express();

//use 中间件  用户发起请求-->服务器接收请求-->处理-->响应  从接收请求到响应请求中间发生的事情
//signedCookies  获取加密后的值

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(cookieParser("123456"));

app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret:"12345",
    saveUninitialized:true,
    resave:true
}))

app.use("/login",login);

// app.use(function(req,res,next){
//   if(!req.session.user){
//     res.redirect("/login");//传输地址栏地址
//     res.end();
//   }else{
//     next();
//   }
// })


app.use("/",index);
app.use("/admin",admin);
app.use("/log",log);



app.listen(8888,function(){
  console.log("start")
});
