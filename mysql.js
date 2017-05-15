var mysql=require("mysql");

var obj=mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"",
    database:"workapp"
})
obj.header="set names utf8";
module.exports=obj;