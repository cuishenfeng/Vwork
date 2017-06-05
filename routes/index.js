var express=require("express");
var path=require("path");
var nodegrass=require("nodegrass");
var body=require("body-parser");
var mysql=require("../server/mysql");
var md5=require("../server/md5");
var router=express.Router();

router.get("/",function(req,res,next){
    if(!req.session.user){
        res.redirect("/login");//传输地址栏地址
        res.end();
    }else{
        next();
    }
},function(req,res){
    res.render("index")
})
//查找图片


router.get("/indexData",function(req,res){
        mysql.query("select * from shows order by id desc limit 0,10",function(error,result){
            res.send(result);
        });
})
router.get("/welcome",function(req,res){
    res.render("welcome")
})
router.get("/tpl/:name",function(req,res){
   res.sendFile(path.join(process.cwd(),"public/tpl/"+req.params.name))
})

router.get("/getCon",function(req,res){
    var url=req.query.url;
    // console.log(url);
    nodegrass.get(url,function(body){
        //console.log(body);
        res.send(body);
    },"gbk");
})
//查询通讯录
router.get("/phones",function(req,res){
    mysql.query("select * from user",function(error,result){
        res.send(result);
    })
})

//修改密码
router.get("/editPass",function(req,res){
    var oldPass=md5(req.query.oldPass||"");
    console.log(oldPass)
    var newPass=md5(req.query.newPass||"");
    console.log(newPass)
    var newPass1=md5(req.query.newPass1||"");
    console.log(newPass1)
    var uid=req.session.user.uid;
    mysql.query("select upass from user where uid="+uid,function(error,result){
        if(result[0].upass==oldPass){
            if(newPass!=oldPass&&newPass==newPass1){
                mysql.query(`update user set upass='${newPass}' where uid='${uid}'`,function(error){
                    if(!error){
                        req.session.user=null;
                        res.send("ok");
                    }else{
                        console.log(error);
                    }
                })
            }
        }else{
            res.send("no");
        }
    })
})
//退出登录
router.get("/logout",function(req,res){
    req.session.user=null;
    res.redirect("/login");
    res.end();
})

module.exports=router;