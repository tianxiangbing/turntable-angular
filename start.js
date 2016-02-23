var child_process = require('child_process');
var openApp = function () {
    var str = "1";
    child_process.exec('npm start').stdout.on('data', function (data) {
        console.log('标准输出：' + data);
        console.log('in：' + str);
        str = data;
        console.log('inlast：' + str);
    });
}
openApp();