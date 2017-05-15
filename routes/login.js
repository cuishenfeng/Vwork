var express=require("express");
var path=require("path");
var body=require("body-parser");
var mysql=require("../mysql");
var md5=require("../md5");
var router=express.Router();
var session=require("express-session");


//进入根目录时查看cookie值
router.get("/",function(req,res){
    res.render("login")
})
router.post("/checkLogin",function(req,res){
    var uname=req.body.uname;
    var upass=md5(req.body.upass);
    mysql.query("select * from user",function(error,result){
        if(error){
            console.log(error);
        }else{

            var flag=true;

            for(var i=0;i<result.length;i++){
                var rows=result[i];
                if(rows.uname===uname){
                    if(rows.upass==upass){
                        flag=false;
                        var user={
                            uid:rows["uid"],
                            uname:uname,
                            login:"yes"
                        }
                        req.session.user=user;

                        res.redirect("/");
                        res.end();
                        break;

                    }
                }
            }

            if(flag){
                res.redirect("/login");
                res.end();
            }

        }
    });
})
module.exports=router;