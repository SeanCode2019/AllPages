// 對Date的擴充套件，將 Date 轉化為指定格式的String
// 月(M)、日(d)、小時(h)、分(m)、秒(s)、季度(q) 可以用 1-2 個佔位符，
// 年(y)可以用 1-4 個佔位符，毫秒(S)只能用 1 個佔位符(是 1-3 位的數字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")   ==> 2006-7-2 8:9:4.18

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

var isPause;

function PauseTime() {
    isPause = true;
}

function StartTime() {
    isPause = false;
    ShowTime();
}

function ShowTime() {
    if (isPause == true) return true;
    var dt = new Date();
    $('.clock').text(dt.Format("yyyy/MM/dd - HH:mm:ss"));
    // document.getElementById('time').innerText = dt.Format("yyyy/MM/dd - HH:mm:ss");
    if (isPause == false) {
        setTimeout(ShowTime, 1000);
    }
}

$(function () {
    $('#start').click(StartTime);
    $('#pause').click(PauseTime);
});