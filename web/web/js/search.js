var groupId="",//股票名
    securities="",  //股市名
    groupList=[],//股票搜索历史
    sharesList="",//实时股票信息
    sharesParm="",//分时股票接口信息
    sharesTiming="",//分时股票信息
    stopsign=false,//停盘
    endPrice=[],//停盘价
    choiceDate= 0,//分时日期
    historyParm="";//历史股票信息
    init();
    function init(){
        var qs = getQueryString();
        var q1 = qs["searchId"];
        groupId=q1;
        getGroupId(groupId);//股票id获取
        getAjaxSearch(groupList);//实时信息、分时
        searchPage();//页内搜索
        historyDate();//日历插件

        if (isLogin()) { // 判断用户是否登录
            $('.logout').unbind("click").bind({
                "click":function(){
                    Cookies.remove('user');
                    location.reload();
                }
            });
        } else {
            $(".loading").unbind("click").bind({
                "click":function(){
                    login();
                }
            });
            $(".register").unbind("click").bind({
                "click":function(){
                    register();
                }
            });
        }
    }
    /*
        获取股票ID
        上证600
        深证002 000 003
     */
function getGroupId(groupId){
    var regSh=/^((600[\d]{3})|60[\d]{4})$/;
    var regSz=/^(((002|000|300)[\d]{3}))$/;
    if(regSh.test(groupId)){
       return groupList.push([groupId,"SS","sh"]);
    }
    else if(regSz.test(groupId)){
       return groupList.push([groupId,"SZ","sz"])
    }
    else{

    }
}
function errorPop(){

}
/*实时信息*/
function sharesNew(sharesList){
    var yesPrice=sharesList[1];
    var todPrice=sharesList[2];
    var changeTag="",
        changePre=toPercent(todPrice/yesPrice-1);
    if(yesPrice==0){
        stopsign=true;
    }
    else{
        stopsign=false;
    }
    if(yesPrice<todPrice){
        changeTag='font-up';
    }
    else if(yesPrice>todPrice){
        changeTag='font-down';
    }
    var html="<ul><li><h2>"+sharesList[0]+"</h2></li>"+
    "<li><span class='today-total'>今开<span class="+changeTag+">"+todPrice+
    "</span></span><span class='today-total'>昨收<span>"+yesPrice+
    "</span></span></li>"+
    "<li class="+changeTag+">"+sharesList[3]+"</li>"+
    " <li><span class="+changeTag+" change-pre>"+changePre+"</span></li>"+
    "</ul>";
    $(".shares-today").empty().html(html);
}
/*实时信息获取*/
function getAjaxSearch(groupList){
    $(".loading-cartoon").show();
    $("body").addClass("body-hidden")
    if(groupList.length==0)
        return false;
    var urlPrefix="http://hq.sinajs.cn/list=";
    securities=groupList[groupList.length-1][2];
    groupId=groupList[groupList.length-1][0];
    $.ajax({
        url:urlPrefix+securities+groupId,
        dataType:"script",
        cache:"false",
        type:"GET",
        success:function(){
            var sharesCode=eval("hq_str_"+securities+groupId);
            $("#try").html(sharesCode);
            sharesList=sharesCode.split(",");
            sharesNew(sharesList);
            ajaxTiming(groupList);//分时数据获取
            timingList(sharesTiming);
            groupList[groupList.length-1].push(sharesList[0]);
            $(".loading-cartoon").hide();
            $("body").removeClass("body-hidden")
            },
        error:function(){

        }

    });
}
/*search页搜索*/
function searchPage(){
    $(".search-tag").on({
        "click":function(){
            groupId=$("#searchCode").val()|| 0;
            getGroupId(groupId);
            getAjaxSearch(groupList);
        }
    })
}
/*分时数据选择*/
function dateChoice(){
    // var thisDate=new Date();
    // var thisDay=dateZero(thisDate.getDay());
    // var thisMonth=dateZero(thisDate.getMonth());
    // dateList=[thisMonth,thisDay];
    // for(var i=0;i<3;i++){
    //     var html="<li>"+dateList.[0]+"月"+dateList[1]+"日</li>"
    // }
    // }
    $(".hide-list").hover(function(){
        $(".time-choice")
    })
    $(".time-choice ul li").unbind("click").bind({
        "click":function(){
            choiceDate=parseInt($(this).data("count"));
            $(".time-choice ul li").removeClass("choice-checked");
            $(this).addClass("choice-checked");
            timingChart(sharesParm);
        }
    });
}
/*分时数据

*/
function ajaxTiming(groupList ,datechoice){
    // groupId=groupList[0];
    $.ajax({
    url:"http://route.showapi.com/131-49",
    data:{
        showapi_appid:"37573",
        showapi_sign:"1160ac6566e344b5af7ba114fd60b6f7",
        code:groupId,
        day:"5"
    },
    dataType:"json",
    cache:"false",
    type:"GET",
    success:function(data){
        sharesParm=data.showapi_res_body;
        sharesTiming=data.showapi_res_body.dataList[0].minuteList;
      // sharesParm=data.showapi_res_body.dataList[0].minuteList;
        dateChoice();
        timingChart(sharesParm);
        timingList(sharesTiming);
        getAjaxHisory(groupList);
    }
});
    securities=groupList[groupList.length-1][1];
    groupId=groupList[groupList.length-1][0];
    // $.ajax({
    //     url:"https://sandbox.hscloud.cn/quote/v1/trend5day",
    //     data:{
    //         key:780f9d1d-11d9-40b7-8d99-50a6d03ea7e1,
    //         secret:4a1b12e7-685f-4937-8557-27a88dde6c55,
    //         prod_code:groupId+"."+securities
    //     },
    //     dataType:"json",
    //     cache:"false",
    //     type:"GET",
    //     success:function(data){
    //         sharesParm=data.trend_detail_data;
    //         sharesTiming=data.showapi_res_body.dataList[0].minuteList;
    //       // sharesParm=data.showapi_res_body.dataList[0].minuteList;
    //         timingChart(sharesParm);
    //         timingList(sharesTiming)
    //     }
    // });
}
function timingList(sharesTiming){
    var listTime="";
        timeshares=[];
        trendtag=[];
    var myDate=new Date();

    myDate.getTime();
    if(sharesTiming.length==0){
        var html="";

    }
    else{
        if(sharesTiming[sharesTiming.length-2].nowPrice>sharesTiming[sharesTiming.length-4].nowPrice){
            trendtag.push(["font-up","arrow-up"]);
        }
        else if(sharesTiming[sharesTiming.length-2].nowPrice<sharesTiming[sharesTiming.length-4].nowPrice){
            trendtag.push(["font-down","arrow-down"]);
        }
        else{
            trendtag.push(["",""]);
        }
        if(sharesTiming[sharesTiming.length-4].nowPrice>sharesTiming[sharesTiming.length-6].nowPrice){
            trendtag.push(["font-up","arrow-up"]);
        }
        else if(sharesTiming[sharesTiming.length-4].nowPrice<sharesTiming[sharesTiming.length-6].nowPrice){
            trendtag.push(["font-down","arrow-down"]);
        }
        else{
            trendtag.push(["",""]);
        }
        if(sharesTiming[sharesTiming.length-6].nowPrice>sharesTiming[sharesTiming.length-11].nowPrice){
            trendtag.push(["font-up","arrow-up"]);
        }
        else if(sharesTiming[sharesTiming.length-6].nowPrice<sharesTiming[sharesTiming.length-11].nowPrice){
            trendtag.push(["font-down","arrow-down"]);
        }
        else{
            trendtag.push(["",""]);
        }
        if(sharesTiming[sharesTiming.length-11].nowPrice>sharesTiming[sharesTiming.length-16].nowPrice){
            trendtag.push(["font-up","arrow-up"]);
        }
        else if(sharesTiming[sharesTiming.length-11].nowPrice<sharesTiming[sharesTiming.length-16].nowPrice){
            trendtag.push(["font-down","arrow-down"]);
        }
        else{
            trendtag.push(["",""]);
        }
        timeshares.push(["1分钟前",sharesTiming[sharesTiming.length-2].nowPrice]);
        timeshares.push(["3分钟前",sharesTiming[sharesTiming.length-4].nowPrice]);
        timeshares.push(["5分钟前",sharesTiming[sharesTiming.length-6].nowPrice]);
        timeshares.push(["10分钟前",sharesTiming[sharesTiming.length-11].nowPrice]);
        for(var i=0;i<4;i++){
            var html="<li><span class='time-out'>"+timeshares[i][0]+"</span>"+
                    "<br>"+
                    "<span class='time-out-price "+trendtag[i][0]+"'>"+timeshares[i][1]+"<i class="+trendtag[i][1]+"></i></span></li>";
            $(".time-shareing-list").append(html);
        }
    }


}
function splitData(rawData) {
    var categoryData = [];
    var values = new Array();
    var volumns = [];
    var newPrice=[];
    for (var i = 0; i < rawData.length; i++) {
        var chartTime=rawData[i].time;
        var chartTime1=chartTime.slice(0,2)+":"+chartTime.slice(2,4);
        categoryData.push(chartTime1);
        values[i]=[];
        values[i][0]=rawData[i].time;
        values[i][1]=rawData[i].avgPrice;
        values[i][2]=rawData[i].nowPrice;
        values[i][3]=rawData[i].volume;
        volumns.push(rawData[i].volume);
        newPrice.push(rawData[i].nowPrice);
    }
    return {
        categoryData: categoryData,
        values: values,
        volumns: volumns,
        newPrice:newPrice
    };
}

function calculateMA(dayCount, data) {
    var result = [];
    for (var i = 0, len = data.hisValues.length; i < len; i++) {
        if (i < dayCount) {
            result.push('-');
            continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
            sum += parseFloat(data.hisValues[i - j][1]);
        }
        result.push(+(sum / dayCount).toFixed(3));
    }
    return result;
}

function timingChart(sharesParm){
    sharesTiming=sharesParm.dataList[choiceDate].minuteList;
    var groupName=sharesParm.name;
    var data = splitData(sharesTiming);
    var myChart = echarts.init(document.getElementById('shareingChart'));
    myChart.setOption(option = {
        backgroundColor: '#eee',
        animation: false,
        legend: {
            bottom: 10,
            left: 'center',
            data: ['Dow-Jones index', groupName]
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            textStyle: {
                color: '#fff'
            },
            // position: function (pos, params, el, elRect, size) {
            //     var obj = {top: 10};
            //     obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
            //     return obj;
            // },
            extraCssText: 'width: 170px'
        },
        axisPointer: {
            link: {xAxisIndex: 'all'},
            label: {
                backgroundColor: '#000'
            }
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: false
                },
                brush: {
                    type: ['lineX', 'clear']
                }
            }
        },
        brush: {
            xAxisIndex: 'all',
            brushLink: 'all',
            outOfBrush: {
                colorAlpha: 0.1
            }
        },
        grid: [
            {
                left: '10%',
                right: '8%',
                height: '50%'
            },
            {
                left: '10%',
                right: '8%',
                top: '63%',
                height: '16%'
            }
        ],
        xAxis: [
            {
                type: 'category',
                data: data.categoryData,
                scale: true,
                boundaryGap : false,
                axisLine: {onZero: false},
                splitLine: {show: false},
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax',
                axisPointer: {
                    z: 100
                }
            },
            {
                type: 'category',
                gridIndex: 1,
                data: data.categoryData,
                scale: true,
                boundaryGap : false,
                axisLine: {onZero: false},
                axisTick: {show: false},
                splitLine: {show: false},
                axisLabel: {show: false},
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax',
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            var seriesValue = (params.seriesData[0] || {}).value;
                            return params.value
                            + (seriesValue != null
                                ? '\n' + (seriesValue)
                                : ''
                            );
                        }
                    }
                }
            }
        ],
        yAxis: [
            {
                scale: true,
                splitArea: {
                    show: true
                }
            },
            {
                scale: true,
                gridIndex: 1,
                splitNumber: 2,
                axisLabel: {show: false},
                axisLine: {show: false},
                axisTick: {show: false},
                splitLine: {show: false}
            }
        ],
        // 鼠标缩放
        dataZoom: [
            {
                type: 'inside',
                xAxisIndex: [0, 1],
                start: 70,
                end: 100
            },
            {
                show: true,
                xAxisIndex: [0, 1],
                type: 'slider',
                top: '85%',
                start: 70,
                end: 100
            }
        ],
        series: [
            // {
            //     name: groupName,
            //     type: 'candlestick',
            //     data: data.newPrice,
            //     itemStyle: {
            //         normal: {
            //             borderColor: null,
            //             borderColor0: null
            //         }
            //     },
            //     tooltip: {
            //         formatter: function (param) {
            //             // param = param[0];
            //             console.log(param);
            //             return [
            //                 'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">'+
            //                 '均价: ' + param.data[0] + '<br/>'+
            //                 '当前时间价格:' + param.data[2] + '<br/>'+
            //                 '交易量: ' + param.data[3] + '<br/>'
            //                 // 'Highest: ' + param.data[3] + '<br/>'
            //             ].join('');
            //         }
            //     }
            // },
            {
                name: groupName,
                type: 'line',
                data: data.newPrice,
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                },
                markLine: {
                data: [
                    {
                        yAxis: 100,
                        name: '昨日收盘价'
                    }
                ]
            }

            },
            // {
            //     name: 'MA10',
            //     type: 'line',
            //     data: calculateMA(10, data),
            //     smooth: true,
            //     lineStyle: {
            //         normal: {opacity: 0.5}
            //     }
            // },
            // {
            //     name: 'MA20',
            //     type: 'line',
            //     data: calculateMA(20, data),
            //     smooth: true,
            //     lineStyle: {
            //         normal: {opacity: 0.5}
            //     }
            // },
            // {
            //     name: 'MA30',
            //     type: 'line',
            //     data: calculateMA(30, data),
            //     smooth: true,
            //     lineStyle: {
            //         normal: {opacity: 0.5}
            //     }
            // },
            {
                name: "成交量",
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: data.volumns
            }
        ]
    }, true);

    myChart.dispatchAction({
        type: 'brush',
        areas: [
            {
                brushType: 'lineX',
                coordRange: ['14:20', '15:00'],
                xAxisIndex: 0
            }
        ]
    });
}
function historyDate(){
    $("#startDate").date_input();
    $("#endDate").date_input();
}
function getAjaxHisory(groupList){
    var startDate=$("#startDate").val();
    var endDate=$("#endDate").val();
    var thisDate=new Date();
    var thisDay=dateZero(thisDate.getDate());
    var thisMonth=dateZero(thisDate.getMonth()+1);
    var thisYear=thisDate.getFullYear();

    if(startDate==""){
        $("#startDate").val(getDateBefore(70));
        startDate=getChoiceDate($("#startDate").val());
    }
    if(endDate==""){
        $("#endDate").val(thisYear+"-"+thisMonth+"-"+thisDay);
        endDate=getChoiceDate($("#endDate").val());
    }
    dateList=[$("#startDate").val(),$("#endDate").val()];
    var code=groupList[groupList.length-1][0];

    $.ajax({
        url:"http://localhost:3000/historyData?code=cn_"+code+"&start="+startDate+"&end="+endDate,
        data: {
            username: Cookies.getJSON('user') && Cookies.getJSON('user').username,
            shareId: Cookies.getJSON('user') && Cookies.getJSON('user').shareId,
        },
        dataType:"json",
        cache:"false",
        type:"GET",
        success:function(data){
            historyParm=data.data[0].hq;
            historyChart(historyParm);
        }
    });
}
function hisSplitData(rawData) {
    var categoryData = [];
    var values = [];
    var volumns = [];
    for (var i = rawData.length-1; i >= 0; i--) {
        categoryData.push(rawData[i][0]);
        // values.push(rawData[i]);
        values[i]=[];
        values[i][0]=rawData[i][1];
        values[i][1]=rawData[i][2];
        values[i][2]=rawData[i][5];
        values[i][3]=rawData[i][6];
        volumns.push(rawData[i][7]);
    }
    return {
        hisCategoryData: categoryData,
        hisValues: values,
        hisVolumns: volumns
    };
}
function historyChart(historyParam){
    var groupName=groupList[groupList.length-1][3];
    var data = hisSplitData(historyParam);
    var myChart = echarts.init(document.getElementById('historyChart'));
    myChart.setOption(option = {
        backgroundColor: '#eee',
        animation: false,
        legend: {
            bottom: 10,
            left: 'center',
            data: ['Dow-Jones index', groupName]
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            backgroundColor: 'rgba(245, 245, 245, 0.8)',
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            textStyle: {
                color: '#000'
            },
            // position: function (pos, params, el, elRect, size) {
            //     var obj = {top: 10};
            //     obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
            //     return obj;
            // },
            extraCssText: 'width: 170px'
        },
        axisPointer: {
            link: {xAxisIndex: 'all'},
            label: {
                backgroundColor: '#777'
            }
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: false
                },
                brush: {
                    type: ['lineX', 'clear']
                }
            }
        },
        brush: {
            xAxisIndex: 'all',
            brushLink: 'all',
            outOfBrush: {
                colorAlpha: 0.1
            }
        },
        grid: [
            {
                left: '10%',
                right: '8%',
                height: '50%'
            },
            {
                left: '10%',
                right: '8%',
                top: '63%',
                height: '16%'
            }
        ],
        xAxis: [
            {
                type: 'category',
                data: data.hisCategoryData,
                scale: true,
                boundaryGap : false,
                axisLine: {onZero: false},
                splitLine: {show: false},
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax',
                axisPointer: {
                    z: 100
                }
            },
            {
                type: 'category',
                gridIndex: 1,
                data: data.hisCategoryData,
                scale: true,
                boundaryGap : false,
                axisLine: {onZero: false},
                axisTick: {show: false},
                splitLine: {show: false},
                axisLabel: {show: false},
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax',
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            var seriesValue = (params.seriesData[0] || {}).value;
                            return params.value
                                + (seriesValue != null
                                        ? '\n' + echarts.format.addCommas(seriesValue)
                                        : ''
                                );
                        }
                    }
                }
            }
        ],
        yAxis: [
            {
                scale: true,
                splitArea: {
                    show: true
                }
            },
            {
                scale: true,
                gridIndex: 1,
                splitNumber: 2,
                axisLabel: {show: false},
                axisLine: {show: false},
                axisTick: {show: false},
                splitLine: {show: false}
            }
        ],
        dataZoom: [
            {
                type: 'inside',
                xAxisIndex: [0, 1],
                start: 98,
                end: 100
            },
            {
                show: true,
                xAxisIndex: [0, 1],
                type: 'slider',
                top: '85%',
                start: 98,
                end: 100
            }
        ],
        series: [
            {
                name: 'Dow-Jones index',
                type: 'candlestick',
                data: data.hisValues,
                itemStyle: {
                    normal: {
                        borderColor: null,
                        borderColor0: null
                    }
                },
                tooltip: {
                    formatter: function (param) {
                        // param = param[0];
                        return [
                            'Date: ' + groupName + '<hr size=1 style="margin: 3px 0">'+
                            'Open: ' + param.data[0] + '<br/>'+
                            'Close: ' + param.data[1] + '<br/>'+
                            'Lowest: ' + param.data[2] + '<br/>'+
                            'Highest: ' + param.data[3] + '<br/>'
                        ].join('');
                    }
                }
            },
            {
                name: groupName,
                type: 'line',
                data: calculateMA(5, data),
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }
            },

            {
                name: "交易量",
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: data.hisVolumns
            }
        ]
    }, true);

    myChart.dispatchAction({
        type: 'brush',
        areas: [
            {
                brushType: 'lineX',
                coordRange: ['2017-3-12', '2017-5-17'],
                xAxisIndex: 0
            }
        ]
    });
}

function _changeURL(url, arg, arg_val) {
    var pattern = arg + '=([^&]*)';
    var replaceText = arg + '=' + arg_val;
    if (url.match(pattern)) {
       var tmp = '/(' + arg + '=)([^&]*)/gi';
       tmp = url.replace(eval(tmp), replaceText);
       return tmp;
    } else {
       if (url.match('[\?]')) {
           return url + '&' + replaceText;
       } else {
           return url + '?' + replaceText;
       }
    }
    return url + '\n' + arg + '\n' + arg_val;
}

function _getUrlParam(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(r[2]); return null;
}

function isLogin() {
    // 判断是否登录
    var user = Cookies.getJSON('user');
    if (user && user.username) {
        // 已经登录
        $('.js-login-form').css('display', 'none');
        $('.js-current-user').css('display', 'block');
        $('.js-current-username').html(user.username);

        // 判断当前url的shareId是否与用户的shareId相等，不相等则刷新
        if (_getUrlParam('shareId') !== user.shareId) {
            // 刷新当前页面
            location.search = _changeURL(location.search, 'shareId', user.shareId);
        }
        return true;
    }
    return false;
}

function login(){

    $(".loading-pop").show();
    $(".back").click(function(){
        $(".loading-pop").hide();
    });
    $(".loading-btn").click(function(){
        var userName=$("#userName").val();
        var passWord=$("#passWord").val();
         $.ajax({
            url:"http://localhost:3000/login",
            data:{
                username:userName,
                password:passWord
            },
            dataType:"json",
            cache:"false",
            type:"POST",
            success:function(data){
                if (data.code === 0 && data.data) {
                    // 登录成功
                    Cookies.set('user', {shareId: data.data.shareId, username: data.data.username}, {expires: 30});
                    location.reload();
                } else {
                   alert(data.msg);
                }

            },
            error:function(err){
                console.log(err);
            }
        });
    });
    $("register-link").click(function(){
        register();
    })

}
function register(){
    $(".register-pop").show();
    $(".back").click(function(){
        $(".register-pop").hide();
    });
    $(".register-btn").click(function(){
        var reUserName=$("#reUserName").val();
        var rePassWord=$("#rePassWord").val();
         $.ajax({
            url:"http://localhost:3000/register",
            data:{
                username:reUserName,
                password:rePassWord
            },
            dataType:"json",
            cache:"false",
            type:"post",
            success:function(data){
                if (data.code === 0 && data.data) {
                     // 注册成功
                     Cookies.set('user', {shareId: data.data.shareId, username: data.data.username}, {expires: 30});
                     location.reload();
                } else {
                    alert(data.msg);
                }
            },
            error:function(err){
                console.log(err);
            }
        });
    })
}
