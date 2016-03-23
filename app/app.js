'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    "myApp.directives",
    "myApp.services"
]).controller('myController',['$scope','getList','$http',function($scope,getList,$http){
    //$scope.recordList = [{"phone":"130****12345","goods":"[寿全斋]姜心之作礼盒"},{"phone":"130****12345","goods":"[寿全斋]姜心之作礼盒"},{"phone":"130****12345","goods":"[寿全斋]姜心之作礼盒"}];
    $scope.uid = $('#hd_uid').val();
    getList.getNameList($scope.uid).then(function(res){
         $scope.recordList = res.data;
    });
    //alert($scope.lotteryNumber)
    //setTimeout(function(){
    //    $scope.$apply(function () {
    //        $scope.lotteryNumber = $scope.lotteryNumber;
    //    });
    //},1000)
    $scope.lotteryNumber = $('#lotteryNumber').val();
    getList.getRecordList($scope.uid).then(function(res){
        $scope.myRecordList = res.data;
    });
    function initFontSize() {
        document.documentElement.style.fontSize = Math.min( document.documentElement.clientWidth,750) / 7.5 + 'px';
    }
    initFontSize();
}]);