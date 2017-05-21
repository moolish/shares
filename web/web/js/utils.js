function getQueryString() {
    var qs = location.search.substr(1), // 获取url中"?"符后的字串
        args = {}, // 保存参数数据的对象
        items = qs.length ? qs.split("&") : [], // 取得每一个参数项,
        item = null,
        len = items.length;

    for(var i = 0; i < len; i++) {
        item = items[i].split("=");
        var name = decodeURIComponent(item[0]),
            value = decodeURIComponent(item[1]);
        if(name) {
            args[name] = value;
        }
    }
    return args;
}
function toPercent(point){
    var str=Number(point*100).toFixed(2);
    str+="%";
    return str;
}
function dateZero(date){
    if(date>10)
        return date;
    else
        return "0"+date;
}
function getChoiceDate(date){
    var arr=[];
    arr=date.split("-");
    return arr.join("");
}
function getDateBefore(AddDayCount) {
    var thisDate = new Date();
    thisDate.setDate(thisDate.getDate()-AddDayCount);//获取AddDayCount天后的日期
    var y = thisDate.getFullYear();
    var m = (thisDate.getMonth()+1)<10?"0"+(thisDate.getMonth()+1):(thisDate.getMonth()+1);//获取当前月份的日期，不足10补0
    var d = thisDate.getDate()<10?"0"+thisDate.getDate():thisDate.getDate();//获取当前几号，不足10补0
    return y+"-"+m+"-"+d;
}