"use strict";
var services = angular.module('myApp.services',[]);
services.service("getList",function($q,$http){
    var data = {};
    return {
        getNameList: function (uid) {
            return ajax(uid,'json/list.json');
        },
        getRecordList:function(uid){
            return ajax(uid,'json/myRecordList.json');
        },
        lottery:function(uid){
            return ajax(uid,'json/ralate.json');
        }
    }
    function ajax (uid,url){
        var deferred = $q.defer();
        var path = url;
        $http.get(path,{
            params:{userId:uid}
        }).then(function (response) {
            if(response.status){
                deferred.resolve(response.data) ;
            }else{
                alert(response.msg);
                deferred.reject(response);
            }
        });
        return deferred.promise;
    }
});