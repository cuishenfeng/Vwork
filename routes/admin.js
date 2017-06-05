var express=require("express");
var mysql=require("../server/mysql");
var md5=require("../server/md5");
var body=require("body-parser");
var router=express.Router();

function middle(req,res,next){
    if(!req.session.admin){
        res.redirect("/admin/login");//传输地址栏地址
        res.end();
    }else{
        next();
    }
}

router.get("/login",function(req,res){
    res.render("admin/login");
})

router.post("/login/checkLogin",function(req,res){
    var uname=req.body.uname;
    var upass=md5(req.body.upass);
    mysql.query("select * from user",function(error,result){
        if(error){
            console.log(error);
        }else{
            var flag=true;
            for(var i=0;i<result.length;i++){
                var rows=result[i];
                if(rows.uname==uname){
                    if(rows.upass==upass){
                        if(rows.uroot==0){
                            flag=false;
                            var user={
                                uname:uname,
                                login:'yes'
                            }
                            req.session.admin=user;

                            res.redirect("/admin");
                            res.end();
                            break;
                        }
                    }
                }
            }
            if(flag){
                res.redirect("/admin/login");
                res.end();
            }
        }
    })
})

router.get("/",middle,function(req,res){
    res.render("admin/main",{user:req.session.admin.uname});
})

router.get("/addUser",middle,function(req,res){
    res.render("admin/addUser");
})
router.get("/addUserInfo",middle,function(req,res){
    var uname=req.query.uname;
    var upass=md5(req.query.upass);
    var uphone=req.query.uphone;
    var uroot=req.query.uroot;
    mysql.query(`insert into user (uname,upass,uphone,uroot) values ('${uname}','${upass}','${uphone}',${uroot})`,function(error){
        console.log(error);
        res.redirect("/admin/addUser");
        res.end();
    })
})
//操作用户
router.get("/showUser",middle,function(req,res){
    mysql.query("select * from user",function(error,result){
        res.render("admin/showUser",{result:result});
    })
})

router.get("/delUser/:uid",function(req,res){
    var uid=req.params.uid;
    mysql.query("delete from user where uid="+uid,function(){
        res.send("删除成功!")
    })
})
router.get("/edit/:uid",function(req,res){
    var uid=req.params.uid;
    mysql.query("select * from user where uid="+uid,function(error,result){
        res.render("admin/edit",{result:result});
    })
})
router.post("/edit",function(req,res){
    var id=req.body.id;
    var uname=req.body.uname;
    var upass=md5(req.body.upass);
    var uphone=req.body.uphone;
    var uroot=req.body.uroot;
    mysql.query("update user set uname='"+uname+"',upass='"+upass+"',uphone='"+uphone+"',uroot="+uroot+" where id="+id,function(error,result){
        console.log(error)
        res.send("修改成功!")
    })
})


//内容页
router.get("/addCon",function(req,res){
    res.render("admin/addCon");
})
router.get("/addCons",function(req,res){
    var title=req.query.title;
    var url=req.query.url;
    var info=req.query.info;
    var img=req.query.img;
    var catid=req.query.catid;
    mysql.query(`insert into shows (title,url,info,img,catid) values ('${title}','${url}','${info}','${img}',${catid})`,function(){
        res.send("添加内容成功!");
    })
})
router.get("/showCon",middle,function(req,res){
    var page=parseInt(req.query.page)||0;
    var num=10;
    let lastpage=(page-1)<0?0:(page-1);
    let nextpage=page+1;
    console.log(nextpage);
    mysql.query("select * from shows order by id desc limit "+page*num +", "+num,function(error,result){
        res.render("admin/showCon",{result:result,lastpage:lastpage,nextpage:nextpage});
    });
})

module.exports=router;