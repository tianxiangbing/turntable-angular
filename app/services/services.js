"use strict";
var services = angular.module('myApp.services',[]);
services.service("getList",['$q','$http',function($q,$http){
    var data = {};
    return {
        getNameList: function (uid) {
            return ajax(uid,'json/list.json');
        },
        getRecordList:function(uid){
            return ajax(uid,'json/myRecordList.json');
            //return ajax(uid,'/pc/group-buy-lottery-fujiquan/get-my-reward-list/');
        },
        lottery:function(uid){
            return ajax(uid,'json/ralate.json');
            //return ajax(uid,'/pc/group-buy-lottery-fujiquan/');
        }
    }
    function ajax (uid,url){
        var deferred = $q.defer();
        var path = url;
        $http.get(path,{
        //$http.post(path,{
            params:{userId:uid}
        }).then(function (response) {
            if(response.status){
                deferred.resolve(response.data) ;
            }else{
                alert(response.msg);
                deferred.reject(response);
            }
        }).catch(function(r){
            console.log(r)
        });
        return deferred.promise;
    }
}]);