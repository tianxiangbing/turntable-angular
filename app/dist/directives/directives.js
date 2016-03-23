"use strict";var directives=angular.module("myApp.directives",["myApp.services"]);directives.directive("myRecord",function(){return{restrict:"EA",replace:!0,transclude:!0,scope:{count:"=lotteryNumber",myRecordList:"=myRecordList"},templateUrl:"template/myRecord.html",link:function(a,b,c){var d=angular.element(b.children().eq(0).find("a")),e=angular.element(b.children().eq(1));a.showList=!1;var f=new Dialog;f.init({target:$(e),show:a.showList,fixed:!0,mask:!0}),d.bind("click",function(){return f.show(),!1})}}}),directives.directive("lotteryRecord",function(){return{restrict:"EA",replace:!0,scope:{recordList:"=recordList"},templateUrl:"template/lotteryRecord.html",link:function(a,b,c){setInterval(function(){$(".record-content ul").animate({top:-30},function(){$(".record-content ul").append($(".record-content ul").eq(0).find("li:lt(2)")),$(".record-content ul").css({top:0})})},2e3)}}}),directives.directive("turntable",["getList",function(a){return{restrict:"EA",replace:!0,templateUrl:"template/turntable.html",link:function(b,c,d){function e(a){k.show(),$(".message-box").prop("class","message-box "+a.background),$(".message-box").find(".action").prop("class","action action-single")}var f=angular.element(c.children().children()),g=b.lotteryNumber;b.$watch("lotteryNumber",function(a,b){g=a,0==a?f.addClass("disabled"):f.removeClass("disabled")});var h=null,i=!1,j=function(c,d){var g=3600;0==c?$(f).rotate({angle:0,duration:1e4,center:["50%","67%"],animateTo:g,callback:function(){i=!1,clearTimeout(h),alert("抽的人太多，稍后再试！")}}):(g=c+1800,$(f).stopRotate(),$(f).rotate({angle:0,duration:5e3,center:["50%","64%"],animateTo:g,callback:function(){i=!1,e(d),a.getRecordList(b.uid).then(function(a){b.myRecordList=a.data})}}))},k=new Dialog;k.init({target:$(".message-box"),show:!1,width:811,height:592,fixed:!0,mask:!0}),f.bind("click",function(){g>0&&!i&&(i=!0,h=a.lottery(b.uid).then(function(a){if(console.log(a),a.status){b.lotteryNumber--;var c=a.data,d=[{level:[1,13],background:"index-2-1",angel:55},{level:[2,14],background:"index-2-2",angel:55},{level:[3,15],background:"index-2-3",angel:55},{level:[4,16],background:"index-2-4",angel:55},{level:[5],background:"index-2-5",angel:55},{level:[6,17],background:"index-7",angel:300},{level:[7,18],background:"index-6",angel:15},{level:[8],background:"index-8",angel:330},{level:[9,19],background:"index-1",angel:200},{level:[10,20],background:"index-5",angel:60},{level:[11,21],background:"index-4",angel:250},{level:[12,22],background:"index-3",angel:160}];d.forEach(function(a,b){for(var d=0,e=a.level.length;e>d;d++)a.level[d]==c&&j(a.angel,a)})}else i=!1,alert(a.msg)}))})}}}]);