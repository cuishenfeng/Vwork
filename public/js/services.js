angular.module("services",[])
.factory("Todo",function(){
    return localStorage.todo?JSON.parse(localStorage.todo):[];
})