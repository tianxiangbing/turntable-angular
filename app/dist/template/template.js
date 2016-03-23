angular.module("myApp").run(["$templateCache",function(a){"use strict";a.put("template/lotteryRecord.html",'<div class="record ">\r\n    <div class="record-content">\r\n    <ul>\r\n        <li ng-repeat="record in recordList"><span>{{record.phone}}</span><span>{{record.goods}}</span></li>\r\n    </ul>\r\n    </div>\r\n</div>'),a.put("template/myRecord.html",'<div>\r\n    <div class="my-count">\r\n        <i>您还有<em>{{count}}</em>次</i><a>查看中奖记录</a>\r\n    </div>\r\n    <div class="my-list hide">\r\n        <a class="js-dialog-close icon-close"></a>\r\n        <h1>剩余抽奖次数<em>{{count}}</em>次</h1>\r\n        <h2>我的中奖记录</h2>\r\n        <div class="mycount myrecord">\r\n            <table>\r\n                <tbody>\r\n                <tr ng-repeat="record in myRecordList">\r\n                    <td><div class="c">第{{$index+1}}次. </div><div class="d">{{record.goods}}</div></td>\r\n                </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n</div>'),a.put("template/turntable.html",'<div class="turntable">\r\n    <div class="ralate">\r\n        <div class="pointer"></div>\r\n    </div>\r\n</div>')}]);