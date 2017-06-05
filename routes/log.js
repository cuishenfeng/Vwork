var express=require("express");
var path=require("path");
var mysql=require("../server/mysql");
var router=express.Router();

//发送日志
router.get("/selectSend",function(req,res){
    var uid=req.session.user.uid;
    mysql.query("select * from logs where sendid="+uid,function(error,result){
        console.log(result)
        console.log(1)
        res.send(JSON.stringify(result))
    })
})
//选择用户，不选自己
router.get("/selectUser",function(req,res){
    var uid=req.session.user.uid;
    mysql.query("select * from user where uid>1 and uid!="+uid,function(error,result){
        res.send(result);
    })
})
//添加日志
router.get("/addLog",function(req,res){
    var title=req.query.title;
    var con=req.query.con;
    var jieshouid=req.query.jieshouid;
    var sendid=req.session.user.uid;
    var state=1;
    mysql.query(`insert into logs (title,con,jieshouid,sendid,state) values ('${title}','${con}',${jieshouid},${sendid},'${state}')`,function(error,result){
        res.send(result.affectedRows.toString());
    })
})
//设置已读
router.get("/selectdu",function(req,res){
    var uid=req.session.user.uid;
    mysql.query("select * from logs where jieshouid="+uid+" and state=2",function(error,result){
        res.send(JSON.stringify(result));
    })
})
//设置未读
router.get("/selectun",function(req,res){
    var uid=req.session.user.uid;
    mysql.query("select * from logs where jieshouid="+uid+" and state=1",function(error,result){
        res.send(JSON.stringify(result));
    })
})
router.get("/logshow",function(req,res){
    var id=req.query.id;
    mysql.query("select * from logs where id="+id,function(error,result){
        mysql.query("update logs set state=2 where id="+id,function(){
            res.send(JSON.stringify(result[0]));
        })

    })

})
module.exports=router;