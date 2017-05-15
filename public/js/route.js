/*
*   link
*   script
*
*   a
*
*   img src
*
*   ajax({
*   url:"/tpl/main.html"})
*
* */
angular.module("Route",["ngRoute"])
.config(["$routeProvider","$httpProvider",function(route,$httpProvider){
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

        route.when("/",{
            templateUrl:"/tpl/main.html",
            controller:"main"
        }).when("/phone",{
            templateUrl:"/tpl/phone.html",
            controller:"phone"
        }).when("/todo",{
            templateUrl:"/tpl/todo.html",
            controller:"todo"
        }).when("/todocon",{
            templateUrl:"/tpl/todocon.html",
            controller:"todocon"
        }).when("/todoinfo/:id",{
            templateUrl:"/tpl/todoinfo.html",
            controller:"todoinfo"
        }).when("/list",{
            templateUrl:"/tpl/list.html",
            controller:"list"
        }).when("/log",{
            templateUrl:"/tpl/log.html",
            controller:"log"
        }).when("/send",{
            templateUrl:"/tpl/send.html",
            controller:"send"
        }).when("/jieshou",{
            templateUrl:"/tpl/jieshou.html",
            controller:"jieshou"
        }).when("/write",{
            templateUrl:"/tpl/write.html",
            controller:"write"
        }).when("/logshow/:logid",{
            templateUrl:"/tpl/logshow.html",
            controller:"logshow"
        }).when("/setting",{
            templateUrl:"/tpl/setting.html",
            controller:"setting"
        }).when("/reset",{
            templateUrl:"/tpl/reset.html",
            controller:"reset"
        })

}])