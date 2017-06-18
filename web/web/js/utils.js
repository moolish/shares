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
    for(var i=0;i<arr.length;i++){

            arr[i]=dateZero(arr[i]);


    }
    return arr.join("");
}
function getDateBefore(AddDayCount) {
    var thisDate = new Date();
    thisDate.setDate(thisDate.getDate()-AddDayCount);//获取AddDayCount天后的日期
    var y = thisDate.getFullYear();
    var m = (thisDate.getMonth()+1);//获取当前月份的日期，不足10补0
    var d = thisDate.getDate();//获取当前几号，不足10补0
    return y+"-"+m+"-"+d;
}
var times=0;
var quickSort=function(arr){
    //如果数组长度小于等于1无需判断直接返回即可
    if(arr.length<=1){
        return arr;
    }
    var midIndex=Math.floor(arr.length/2);//取基准点
    var midIndexVal=arr.splice(midIndex,1);//取基准点的值,splice(index,1)函数可以返回数组中被删除的那个数arr[index+1]
    var left=[];//存放比基准点小的数组
    var right=[];//存放比基准点大的数组
    //遍历数组，进行判断分配
    for(var i=0;i<arr.length;i++){
        if(arr[i]<midIndexVal){
            left.push(arr[i]);//比基准点小的放在左边数组
        }
        else{
            right.push(arr[i]);//比基准点大的放在右边数组
        }
    }
    //递归执行以上操作,对左右两个数组进行操作，直到数组长度为<=1；
    return quickSort(left).concat(midIndexVal,quickSort(right));
};