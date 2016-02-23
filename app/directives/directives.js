"use strict";
var directives = angular.module("myApp.directives",[
    "myApp.services"
]);

directives.directive("myRecord",function(){
    return{
        restrict:'EA',
        replace:true,
        transclude: true,
        scope:{count:'=lotteryNumber',myRecordList:'=myRecordList'},
        templateUrl:"template/myRecord.html",
        link:function(scope, element, attrs){
            var btn = angular.element(element.children().eq(0).find('a'));
            var dialog_content = angular.element(element.children().eq(1));
            scope.showList = false;
            var dialog = new Dialog();
            dialog.init({target:$(dialog_content),show:scope.showList,width:481,height:330,fixed:true,mask:true});
            btn.bind('click',function(){
                dialog.show();
                return false;
            });
        }
    }
});
directives.directive('lotteryRecord',function(){
   return {
       restrict:"EA",
       replace:true,
       scope:{recordList:'=recordList'},
       templateUrl:"template/lotteryRecord.html",
       link:function(scope, element, attrs){
           setInterval(function() {
               $('.record-content ul').animate({
                   top: -30
               }, function() {
                   $('.record-content ul').append($('.record-content ul').eq(0).find('li:lt(2)'));
                   $('.record-content ul').css({
                       'top': 0
                   });
               });
           }, 2000);
       }
   }
});
directives.directive("turntable",function(getList){
    return{
        restrict:"EA",
        replace:true,
        templateUrl:'template/turntable.html',
        link:function(scope,element,attrs){
            var pointer = angular.element(element.children().children());
            var counter = scope.lotteryNumber;
            scope.$watch('lotteryNumber', function(newValue,oldValue) {
                counter = newValue;
                if (newValue == 0) {
                    pointer.addClass('disabled');
                }else{
                    pointer.removeClass('disabled');
                }
            });
            var timer = null;
            var isdoning = false;
            var rotation = function(n, level) {
                var num = 360 * 10;
                if (n == 0) {
                    $(pointer).rotate({
                        angle: 0,
                        duration: 10000,
                        center: ["50%", "67%"],
                        animateTo: num,
                        callback: function() {
                            isdoning=false;
                            clearTimeout(timer);
                            alert('抽的人太多，稍后再试！');
                        }
                    });
                } else {
                    num = n + 360 * 5;
                    $(pointer).stopRotate();
                    $(pointer).rotate({
                        angle: 0,
                        duration: 5000,
                        center: ["50%", "64%"],
                        animateTo: num,
                        callback: function() {
                            isdoning=false;
                            //window['fun' + level]();
                            //clearTimeout(timer);
                            //timer.abort();
                            //update();
                            messageBox(level);
                            getList.getRecordList(scope.uid).then(function(res){
                                scope.myRecordList = res.data;
                            });
                        }
                    });
                }
            }
            var dialog = new Dialog();
            dialog.init({target:$(".message-box"),show:false,width:811,height:592,fixed:true,mask:true});
            function messageBox(index){
                dialog.show();
                $(".message-box").prop('class','message-box index-'+index);
                if(index ==2 || index ==8 || index ==10){
                    $(".message-box").find('.action').prop('class','action action-single');
                }
            }
            pointer.bind('click',function(){
                if (counter>0 &&!isdoning) {
                    isdoning= true;
                    timer = getList.lottery(scope.uid).then(function(result) {
                            if (result.status) {
                                //scope.$apply(function(){
                                    scope.lotteryNumber--;
                                //});
                                var time = result.data;
                                var a = 1,b= 2,c= 3,d= 4,e= 5,f= 6,g= 7,h= 8,i= 9,j=10,k=11;
                                var angel = [   {level:a,angel:15}, {level:b,angel:45}, {level:c,angel:75}, {level:d,angel:110},
                                                {level:e,angel:145}, {level:f,angel:180},{level:g,angel:215},
                                                {level:h,angel:250},{level:i,angel:280},{level:j,angel:310},{level:k,angel:350}
                                            ];
                                //console.log(time, angel[time - 1])
                                angel.forEach(function(item,index){
                                    if(item.level == time){
                                        rotation( item.angel,index+1);
                                    }
                                });
                            } else {
                                isdoning=false;
                                alert(result.msg);
                            }
                        });
                }
            });
        }
    }
});