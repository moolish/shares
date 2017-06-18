/**
 * Created by Administrator on 2017/5/22.
 */
var firstSort={
    groupId:"",
    groupName:"",
    startTime:"",
    endTime:"",
    hisData:"",
    timeData:""
},
    secondSort={
        groupId:"",
        groupName:"",
        startTime:"",
        endTime:"",
        hisData:"",
        timeData:""
    },
    thirdSort={
        groupId:"",
        groupName:"",
        startTime:"",
        endTime:"",
        hisData:"",
        timeData:""
    },
    fourthSort={
        groupId:"",
        groupName:"",
        startTime:"",
        endTime:"",
        hisData:"",
        timeData:""
    },
    fifthSort={
        groupId:"",
        groupName:"",
        startTime:"",
        endTime:"",
        hisData:"",
        timeData:""
    };
function sort(array1,array2) {
    $(".sort-pop").show();

    var array1 = [];
    var array2 = [];
    var array3=[];
    for(var i=0;i<Cookies.getJSON('history').length;i++){
        array3[i]=Cookies.getJSON('history')[i].shareName;
    }
    for(var i=0;i<Cookies.getJSON('history').length;i++){
        array2[i]=Cookies.getJSON('history')[i].shareId;
    }
    var hasMove = false;
    initPop(array1, array2);
    disLike(array1);
    recommendmove(array1, array2)
    choosemove(array1, array2,hasMove);
    $("#startSort").unbind("click").bind({
        "click":function(){
            splitSort(array1);
        }
    });
    $("#addSort").unbind("click").bind({
        "click":function(){

        }
    })
    $("#closePop").unbind("click").bind({
        "click":function(){
            $(".sort-pop").hide();
        }
    })
}

// 创建
function initPop(array1,array2,array3){
    var top,left;
    for(var i=0;i<array1.length;i++){
        top=parseInt(i/4)*2;
        left=0.85+i%4*4.3;
        $("<li class='chooseList"+i+"' style='position:absolute;z-index:0;top:"+top+"rem;left:"+left+"rem'>"+array1[i]+"</li>").appendTo('.choose ul');
        $('.choose').css("height",(top+3.9)+"rem");
    }
    for(var j=0;j<array2.length;j++){
        top=parseInt(j/4)*2;
        left=0.85+j%4*4.3;
        $("<li class='recommendList"+j+"' style='position:absolute;z-index:0;top:"+top+"rem;left:"+left+"rem'>"+array2[j]+"</li>").appendTo('.recommend ul');
        $('.recommend').css("height",top+2+"rem");
    }
}
// 显示可编辑状态
function disLike(array1){

    $('.edit button').click(function(){
        if($(".edit button").val()=="edit"){
            change(array1);

        }
        else if($(".edit button").val()=="finish"){
            $(".closeButton").remove();
            $(".moveTips").remove();
            $(".edit button").val("edit");
            $(".edit button").html("编辑")
        }
    })

}
function change(array1){
    for(var i=0;i<array1.length;i++){
        $("<img src='./images/close1.png' class='closeButton' style='position:absolute;z-index:1;width:0.8rem;height:0.8rem;top:0;right:0;margin:-0.2rem -0.2rem 0 0'>").appendTo('.chooseList'+i)
    }
    $(".choose p").append("<span class='moveTips' style='margin-left:0.5rem;color:#b6b8b7;font-size:0.7rem'>拖拽可以排序</span>");
    $(".edit button").val("finish");
    $(".edit button").html("完成");
}

// 增加选项
function recommendmove(array1,array2){
    $(".recommend ul li").live("click",function(){
        var moveClass=$(this).attr("class");
        var num=moveClass.match(/[0-9]+/g);
        var top1=4.9+parseInt((array1.length-1)/4)*2
        var top1N=4.9+parseInt((array1.length)/4)*2
        var left1=0.85+(array1.length-1)%4*4.3;
        var lastmodelX=(array1.length)%4*4.3+0.85
        var lastmodelY=parseInt(array1.length/4)*2
        var modelX=(array1.length)%4*4.3+0.85-0.85-num%4*4.3;
        var modelY=parseInt(array1.length/4)*2+4.9-1.85-parseInt(num/4)*2-1.3-top1N-3.25;//新增快前模块高+top-div2top-div2模块高-div2margintop-div1height-div1paddingtop
        array1.push(array2[num]);//把元素放入上方数组
        $(this).addClass("moveModel")
        moveModel=$(".moveModel")
        //动画变换
        if($(".edit button").val()=="finish"){
            $("<img src='./images/close1.png' class='closeButton' style='position:absolute;z-index:1;width:0.8rem;height:0.8rem;top:0;right:0;margin:-0.2rem -0.2rem 0 0'>").appendTo(this)
        }
        $(this).css({"transform":"translate("+modelX+"rem,"+modelY+"rem)","transition":"all 0.5s"});//模块上移动画
        $(".choose").css({"height":top1N+"rem","transition":"all 0.5s"});

        $("<li class='chooseList"+(array1.length-1)+" changeModel' style='position:absolute;z-index:0;top:"+lastmodelY+"rem;left:"+lastmodelX+"rem'>"+array2[num]+"</li>").appendTo('.choose ul');
        if($(".edit button").val()=="finish"){
            $("<img src='./images/close1.png' class='closeButton' style='position:absolute;z-index:1;width:0.8rem;height:0.8rem;top:0;right:0;margin:-0.2rem -0.2rem 0 0'>").appendTo(".chooseList"+(array1.length-1));
        }//添加上方模块

        for(var i=parseInt(num)+1;i<array2.length;i++){

            if(i%4==0){

                $(".recommendList"+i).css({
                    "top":""+(parseInt(i/4)*2-2)+"rem",
                    "left":""+(0.85+i%4*4.3+12.9)+"rem",
                    "transition":"all 0.5s"
                })
                $(".recommendList"+i).attr("class","recommendList"+(i-1));

            }
            else{

                $(".recommendList"+i).css({
                    "left":""+(0.85+i%4*4.3-4.3)+"rem",
                    "transition":"all 0.5s"
                })
                $(".recommendList"+i).attr("class","recommendList"+(i-1));
            }
        }
        array2.splice(num,1);

        setTimeout(function(){

            moveModel.remove()//移除下方模块
            $(".changeModel").removeClass("changeModel");
            console.log("recommendChange 1/2:"+array1.length,array2.length);
            for(var m=0;m<array1.length;m++){
                console.log("array1.["+m+"]:"+array1[m]);
            }
            for(var n=0;n<array2.length;n++){
                console.log("array2.["+n+"]:"+array2[n]);
            }
        },300)

    })
}

function choosemove(array1,array2,hasMove,event){
    var timeout;
    var _x,_y,modelLeft,modelTop,modelHeight,modelWidth,finishLeft,finishTop;
    var moveModel,moveModeli,modeli;
    //var _height=$(".chooseList4").offset().top-$(".chooseList0").offset().top?$(".chooseList5").offset().top-$(".chooseList1").offset().top:10000
    //var _width=$(".chooseList1").offset().left-$(".chooseList0").offset().left?$(".chooseList2").offset().left-$(".chooseList1").offset().left:10000
    var _height,_width;
    var model=new Array();
    var modelPosition=new Array()
    var modelchange;
    var alreadyCountX=0,alreadyCountY=0;
    $(".choose ul li").live({
        "touchstart":function(event){

            modelchange=0;
            moveModel=$(event.target)
            timeout=setTimeout(function(){
                if($(".edit button").val()=="edit"){
                    change(array1);
                    hasMove=true;
                }
                if($(".edit button").val()=="finish"){
                    hasMove=true;
                }
                $(".choose ul li img").mousedown(function(){
                    console.log(1)
                    hasMove=false;
                })
                if(hasMove){

                    moveModel.addClass("modelMouseDown");
                    moveModel.addClass("moveModel");
                    var _touch = event.originalEvent.targetTouches[0];
                    var moveModelClass=moveModel.attr("class");
                    moveModeli=parseInt(moveModelClass.match(/[0-9]+/g));
                    _x= _touch.pageX;
                    _y=_touch.pageY;
                    modelLeft=moveModel.offset().left;
                    modelTop=moveModel.offset().top;
                    modelWidth=moveModel.offset().width;
                    modelHeight=moveModel.offset().height;
                    finishTop=modelTop;
                    finishLeft=modelLeft;
                    for(var i=0;i<array1.length;i++){
                        var topOrder=$(".chooseList"+i).offset().top/_height-2;
                        var leftOrder=$(".chooseList"+i).offset().left/_width;
                        if(i==moveModeli){
                            topOrder=finishTop/_height-2;
                            leftOrder=finishLeft/_width;
                            modeli=Math.floor(topOrder)*4+Math.floor(leftOrder);
                        }
                        topOrder=Math.floor(topOrder);
                        leftOrder=Math.floor(leftOrder);
                        model[topOrder*4+leftOrder]=$(".chooseList"+i)
                    }
                    // 存储模块固定位置
                    for(var i=0;i<array1.length;i++){
                        modelPosition[i]=new Array();
                        modelPosition[i][0]=model[i].offset().top;
                        modelPosition[i][1]=model[i].offset().left;
                    }
                }
            },300)

        },
        "touchend":function(event){
            moveModel=$(".moveModel")
            clearTimeout(timeout);
            if(hasMove){

                hasMove=false;
                moveModel.removeClass("modelMouseDown moveModel");
                moveModel.css({
                    "left":finishLeft,
                    "top":finishTop
                })
                for(var i=0;i<array1.length;i++){
                    array1[i]=model[i].text();
                    // var a=parseInt(model[i].selector.match(/[0-9]+/g))-1
                    model[i].addClass("model"+i)
                }
                for(var i=0;i<array1.length;i++){
                    $(".model"+i).attr("class","chooseList"+i);
                    $(".model"+i).text(array1[i]);
                    // $("<img src='./images/close1.png' class='closeButton' style='position:absolute;z-index:1;width:0.8rem;height:0.8rem;top:0;right:0;margin:-0.2rem -0.2rem 0 0'>").appendTo(".chooseList"+(i+1));
                    $(".model"+i).removeClass("model"+i)
                }
                return false;

            }
        },
        "touchmove":function(event){
            clearTimeout(timeout);
            if(hasMove){
                moveModel=$(".moveModel")
                // var moveModelClass=moveModel.attr("class");
                // var moveModeli=parseInt(moveModelClass.match(/[0-9]+/g));

                var _touch = event.originalEvent.targetTouches[0];
                var x=_touch.pageX-_x;
                var y=_touch.pageY-_y;


                var newLeft=modelLeft+x;
                var newTop=modelTop+y;
                var fixedModelLeft,fixedModelTop,_top,_left;
                moveModel.css({
                    "left":newLeft,
                    "top":newTop
                })
                for(var i=0;i<array1.length;i++){

                    if(i==modeli){continue;}
                    fixedModelLeft=modelPosition[i][1];
                    fixedModelTop=modelPosition[i][0];
                    if(Math.abs(fixedModelLeft-newLeft)<=modelWidth/2&&Math.abs(fixedModelTop-newTop)<=modelHeight/2){
                        var temp;
                        // console.log("modeli:"+modeli);
                        _top=Math.floor(i/4)-Math.floor(modeli/4);
                        _left=i%4-modeli%4
                        console.log("listy/x:"+_top,_left,(i-modeli)/4,i,modeli)
                        if(_top<0||(_top==0&&_left<0)){//目标块在移动块前
                            // console.log("before")
                            temp=model[modeli]
                            for(var j=modeli-1;j>=i;j--){
                                model[j].css({
                                    "left":modelPosition[j+1][1],
                                    "top":modelPosition[j+1][0],
                                    "transition":"all 0.5s"
                                })
                                model[j+1]=model[j];//重排序
                            }
                            console.log("cartoonfinish")
                            finishLeft=fixedModelLeft;
                            finishTop=fixedModelTop;
                            model[i]=temp;//重排序
                            modeli=i;
                            // for(var m=0;m<array1.length;m++){
                            //     console.log("model"+m,model[m])
                            // }
                        }

                        else if(_top>0||(_top==0&&_left>0)){//目标块在移动快后
                            console.log("after")
                            temp=model[modeli]
                            for(var j=modeli+1;j<=i;j++){
                                model[j].css({
                                    "left":modelPosition[j-1][1],
                                    "top":modelPosition[j-1][0],
                                    "transition":"all 0.5s"
                                })
                                model[j-1]=model[j]
                            }
                            // console.log("cartoonfinish")
                            finishLeft=fixedModelLeft;
                            finishTop=fixedModelTop;
                            model[i]=temp;
                            modeli=i;
                            // for(var m=0;m<array1.length;m++){
                            //     console.log("model"+m,model[m])
                            // }
                        }
                        else{
                            continue;
                        }
                    }
                }
            }
        },
        "click":function(){
            if($(".edit button").val()=="finish"){
                var cancelClass=$(this).attr("class");
                var num=parseInt(cancelClass.match(/[0-9]+/g));
                array2.splice(0,0,array1[num]);
                var cancelLi=$(this);
                var lastmodelX=0.85;
                var lastmodelY=1.85;
                var modelY=3.9+parseInt(num/4)*2;
                var modelX=0.85+num%4*4.3;
                var top1N=3.9+parseInt((array1.length-1)/4)*2;
                $(this).children().remove();
                cancelLi.css({
                    "transform":"translate("+(-modelX+lastmodelX)+"rem,"+(lastmodelY+top1N+3.25+1.3-modelY)+"rem)",
                    "transition":"all 0.5s"
                });
                $(".choose").css({"height":top1N+"rem","transition":"all 0.5s"});

                $(".recommend ul").prepend("<li style='position:absolute;z-index:0;top:0rem;left:0.85rem;visibility:hidden'>"+array2[0]+"</li>");
                for(var j=0;j<array2.length;j++){
                    $(".recommend ul li").eq(j).attr("class","recommendList"+j).addClass("changeModel");
                }

                for(var i=parseInt(num)+1;i<array1.length;i++){

                    if((i)%4==0){
                        $(".chooseList"+i).css({
                            "top":""+(parseInt(i/4)*2-2)+"rem",
                            "left":""+(0.85+i%4*4.3+12.9)+"rem",
                            "transition":"all 0.5s"
                        });
                        $(".chooseList"+i).attr("class","chooseList"+(i-1));

                    }
                    else{
                        $(".chooseList"+i).css({
                            "left":""+(0.85+i%4*4.3-4.3)+"rem",
                            "transition":"all 0.5s"
                        });
                        $(".chooseList"+i).attr("class","chooseList"+(i-1));
                    }
                }
                for(var j=1;j<array2.length;j++){
                    if(j%4==0){

                        $(".recommendList"+j).css({
                            "top":""+(1.85+parseInt((j-1)/4)*2+2)+"rem",
                            "left":""+(0.85+(j-1)%4*4.3-12.9)+"rem",
                            "transition":"all 0.5s"
                        });
                    }
                    else{

                        $(".recommendList"+j).css({
                            "left":""+(0.85+(j-1)%4*4.3+4.3)+"rem",
                            "transition":"all 0.5s"
                        });

                    }
                }
                array1.splice(num,1);
                setTimeout(function(){
                    cancelLi.remove();
                    $(".changeModel").css("visibility","visible");
                    $(".changeModel").removeClass("changeModel");
                    console.log("recommendChange 1/2:"+array1.length,array2.length)
                    for(var m=0;m<array1.length;m++){
                        console.log("array1.["+m+"]:"+array1[m]);
                    }
                    for(var n=0;n<array2.length;n++){
                        console.log("array2.["+n+"]:"+array2[n]);
                    }
                },300)
            }
        }
    });
//    $(".choose ul li").live({"click":function(){
//        if($(".edit button").val()=="finish"){
//            var cancelClass=$(this).attr("class");
//            var num=parseInt(cancelClass.match(/[0-9]+/g));
//            array2.splice(0,0,array1[num]);
//            var cancelLi=$(this);
//            var lastmodelX=0.85;
//            var lastmodelY=1.85;
//            var modelY=3.9+parseInt(num/4)*2;
//            var modelX=0.85+num%4*4.3;
//            var top1N=3.9+parseInt((array1.length-1)/4)*2;
//            $(this).children().remove();
//            cancelLi.css({
//                "transform":"translate("+(-modelX+lastmodelX)+"rem,"+(lastmodelY+top1N+3.25+1.3-modelY)+"rem)",
//                "transition":"all 0.5s"
//            });
//            $(".choose").css({"height":top1N+"rem","transition":"all 0.5s"});
//
//            $(".recommend ul").prepend("<li style='position:absolute;z-index:0;top:0rem;left:0.85rem;visibility:hidden'>"+array2[0]+"</li>");
//            for(var j=0;j<array2.length;j++){
//                $(".recommend ul li").eq(j).attr("class","recommendList"+j).addClass("changeModel");
//            }
//
//            for(var i=parseInt(num)+1;i<array1.length;i++){
//
//                if((i)%4==0){
//                    $(".chooseList"+i).css({
//                        "top":""+(parseInt(i/4)*2-2)+"rem",
//                        "left":""+(0.85+i%4*4.3+12.9)+"rem",
//                        "transition":"all 0.5s"
//                    });
//                    $(".chooseList"+i).attr("class","chooseList"+(i-1));
//
//                }
//                else{
//                    $(".chooseList"+i).css({
//                        "left":""+(0.85+i%4*4.3-4.3)+"rem",
//                        "transition":"all 0.5s"
//                    });
//                    $(".chooseList"+i).attr("class","chooseList"+(i-1));
//                }
//            }
//            for(var j=1;j<array2.length;j++){
//                if(j%4==0){
//
//                    $(".recommendList"+j).css({
//                        "top":""+(1.85+parseInt((j-1)/4)*2+2)+"rem",
//                        "left":""+(0.85+(j-1)%4*4.3-12.9)+"rem",
//                        "transition":"all 0.5s"
//                    });
//                }
//                else{
//
//                    $(".recommendList"+j).css({
//                        "left":""+(0.85+(j-1)%4*4.3+4.3)+"rem",
//                        "transition":"all 0.5s"
//                    });
//
//                }
//            }
//            array1.splice(num,1);
//            setTimeout(function(){
//                cancelLi.remove();
//                $(".changeModel").css("visibility",null);
//                $(".changeModel").removeClass("changeModel");
//                console.log("recommendChange 1/2:"+array1.length,array2.length)
//                for(var m=0;m<array1.length;m++){
//                    console.log("array1.["+m+"]:"+array1[m]);
//                }
//                for(var n=0;n<array2.length;n++){
//                    console.log("array2.["+n+"]:"+array2[n]);
//                }
//            },300)
//        }
//    }
//});
}
function splitSort(array1){
    var sortlength=array1.length;
    if(sortlength>5){
        sortlength=5;
    }
    switch (sortlength){
        case 5:{
            fifthSort.groupId=array1[4];
            $.ajax({
                url:"http://route.showapi.com/131-49",
                data:{
                    showapi_appid:"37573",
                    showapi_sign:"1160ac6566e344b5af7ba114fd60b6f7",
                    code:fifthSort.groupId,
                    day:"1"
                },
                dataType:"json",
                cache:"false",
                type:"GET",
                async: false,
                success:function(data){
                    fifthSort.groupName=data.showapi_res_body.name;
                    fifthSort.timeData=data.showapi_res_body.dataList[0].minuteList;
                }
             });
            fifthSort.startTime=getChoiceDate($("#startDate").val());
            fifthSort.endTime=getChoiceDate($("#endDate").val())
            $.ajax({
                url:"http://localhost:3000/historyData?code=cn_"+fifthSort.groupId+"&start="+fifthSort.startTime+"&end="+fifthSort.startTime,
                data: {
                    username: Cookies.getJSON('user') && Cookies.getJSON('user').username,
                    shareId: Cookies.getJSON('user') && Cookies.getJSON('user').shareId,
                },
                dataType:"json",
                cache:"false",
                type:"GET",
                async: false,
                success:function(data){
                    fifthSort.hisData=data.data[0].hq;
                }
            });
        }
        case 4:{
            fourthSort.groupId=array1[3];
            $.ajax({
                url:"http://route.showapi.com/131-49",
                data:{
                    showapi_appid:"37573",
                    showapi_sign:"1160ac6566e344b5af7ba114fd60b6f7",
                    code:fourthSort.groupId,
                    day:"1"
                },
                dataType:"json",
                cache:"false",
                type:"GET",
                async: false,
                success:function(data){
                    fourthSort.groupName=data.showapi_res_body.name;
                    fourthSort.timeData=data.showapi_res_body.dataList[0].minuteList;
                }
            });
            fourthSort.startTime=getChoiceDate($("#startDate").val());
            fourthSort.endTime=getChoiceDate($("#endDate").val());
            $.ajax({
                url:"http://localhost:3000/historyData?code=cn_"+fourthSort.groupId+"&start="+fourthSort.startTime+"&end="+fourthSort.startTime,
                data: {
                    username: Cookies.getJSON('user') && Cookies.getJSON('user').username,
                    shareId: Cookies.getJSON('user') && Cookies.getJSON('user').shareId
                },
                dataType:"json",
                cache:"false",
                type:"GET",
                async: false,
                success:function(data){
                    fourthSort.hisData=data.data[0].hq;
                }
            });
        }
        case 3:{
            thirdSort.groupId=array1[2];
            $.ajax({
                url:"http://route.showapi.com/131-49",
                data:{
                    showapi_appid:"37573",
                    showapi_sign:"1160ac6566e344b5af7ba114fd60b6f7",
                    code:thirdSort.groupId,
                    day:"1"
                },
                dataType:"json",
                cache:"false",
                type:"GET",
                async: false,
                success:function(data){
                    thirdSort.groupName=data.showapi_res_body.name;
                    thirdSort.timeData=data.showapi_res_body.dataList[0].minuteList;
                }
            });
            thirdSort.startTime=getChoiceDate($("#startDate").val());
            thirdSort.endTime=getChoiceDate($("#endDate").val());
            $.ajax({
                url:"http://localhost:3000/historyData?code=cn_"+thirdSort.groupId+"&start="+thirdSort.startTime+"&end="+thirdSort.startTime,
                data: {
                    username: Cookies.getJSON('user') && Cookies.getJSON('user').username,
                    shareId: Cookies.getJSON('user') && Cookies.getJSON('user').shareId
                },
                dataType:"json",
                cache:"false",
                type:"GET",
                async: false,
                success:function(data){
                    thirdSort.hisData=data.data[0].hq;
                }
            });
        }
        case 2:{
            secondSort.groupId=array1[1];
            $.ajax({
                url:"http://route.showapi.com/131-49",
                data:{
                    showapi_appid:"37573",
                    showapi_sign:"1160ac6566e344b5af7ba114fd60b6f7",
                    code:secondSort.groupId,
                    day:"1"
                },
                dataType:"json",
                cache:"false",
                type:"GET",
                async: false,
                success:function(data){
                    secondSort.groupName=data.showapi_res_body.name;
                    secondSort.timeData=data.showapi_res_body.dataList[0].minuteList;
                }
            });
            secondSort.startTime=getChoiceDate($("#startDate").val());
            secondSort.endTime=getChoiceDate($("#endDate").val());
            $.ajax({
                url:"http://localhost:3000/historyData?code=cn_"+secondSort.groupId+"&start="+secondSort.startTime+"&end="+secondSort.startTime,
                data: {
                    username: Cookies.getJSON('user') && Cookies.getJSON('user').username,
                    shareId: Cookies.getJSON('user') && Cookies.getJSON('user').shareId
                },
                dataType:"json",
                cache:"false",
                type:"GET",
                async: false,
                success:function(data){
                    secondSort.hisData=data.data[0].hq;
                }
            });
        }
        case 1:{
            firstSort.groupId=array1[0];
            $.ajax({
                url:"http://route.showapi.com/131-49",
                data:{
                    showapi_appid:"37573",
                    showapi_sign:"1160ac6566e344b5af7ba114fd60b6f7",
                    code:firstSort.groupId,
                    day:"1"
                },
                dataType:"json",
                cache:"false",
                type:"GET",
                async: false,
                success:function(data){
                    firstSort.groupName=data.showapi_res_body.name;
                    firstSort.timeData=data.showapi_res_body.dataList[0].minuteList;
                }
            });
            firstSort.startTime=getChoiceDate($("#startDate").val());
            firstSort.endTime=getChoiceDate($("#endDate").val());
            $.ajax({
                url:"http://localhost:3000/historyData?code=cn_"+firstSort.groupId+"&start="+firstSort.startTime+"&end="+firstSort.startTime,
                data: {
                    username: Cookies.getJSON('user') && Cookies.getJSON('user').username,
                    shareId: Cookies.getJSON('user') && Cookies.getJSON('user').shareId
                },
                dataType:"json",
                cache:"false",
                type:"GET",
                async: false,
                success:function(data){
                    firstSort.hisData=data.data[0].hq;
                }
            });
            timeChartPop(array1);
        }
    };
}
function sortSplitDataTime(rawData) {
    var categoryData = [];
    var values = new Array();
    var volumns = [];
    var newPrice=[];
    var newPrice2=[];
    var newPrice3=[];
    var newPrice4=[];
    var newPrice5=[];
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
        popCategoryData: categoryData,
        popValues: values,
        popVolumns: volumns,
        popNewPrice:newPrice,
        popNewPrice2:newPrice2,
        popNewPrice3:newPrice3,
        popNewPrice4:newPrice4,
        popNewPrice5:newPrice5,
    };
}
function sortSplitDataTime2(rawData,rawData2) {
    var categoryData = [];
    var values = new Array();
    var volumns = [];
    var newPrice=[];
    var newPrice2=[];
    var newPrice3=[];
    var newPrice4=[];
    var newPrice5=[];
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
        newPrice2.push(rawData2[i].nowPrice);

    }
    return {
        popCategoryData: categoryData,
        popValues: values,
        popVolumns: volumns,
        popNewPrice:newPrice,
        popNewPrice2:newPrice2,

    };
}
function sortSplitDataTime3(rawData,rawData2,rawData3) {
    var categoryData = [];
    var values = new Array();
    var volumns = [];
    var newPrice=[];
    var newPrice2=[];
    var newPrice3=[];
    var newPrice4=[];
    var newPrice5=[];
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
        newPrice2.push(rawData2[i].nowPrice);
        newPrice3.push(rawData3[i].nowPrice);
    }
    return {
        popCategoryData: categoryData,
        popValues: values,
        popVolumns: volumns,
        popNewPrice:newPrice,
        popNewPrice2:newPrice2,
        popNewPrice3:newPrice3,


    };
}
function sortSplitDataTime4(rawData,rawData2,rawData3,rawData4) {
    var categoryData = [];
    var values = new Array();
    var volumns = [];
    var newPrice=[];
    var newPrice2=[];
    var newPrice3=[];
    var newPrice4=[];
    var newPrice5=[];
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
        newPrice2.push(rawData2[i].nowPrice);
        newPrice3.push(rawData3[i].nowPrice)
        newPrice4.push(rawData4[i].nowPrice)

    }
    return {
        popCategoryData: categoryData,
        popValues: values,
        popVolumns: volumns,
        popNewPrice:newPrice,
        popNewPrice2:newPrice2,
        popNewPrice3:newPrice3,
        popNewPrice4:newPrice4


    };
}
function sortSplitDataTime5(rawData,rawData2,rawData3,rawData4,rawData5) {
    var categoryData = [];
    var values = new Array();
    var volumns = [];
    var newPrice=[];
    var newPrice2=[];
    var newPrice3=[];
    var newPrice4=[];
    var newPrice5=[];
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
        newPrice2.push(rawData2[i].nowPrice);
        newPrice3.push(rawData3[i].nowPrice);
        newPrice4.push(rawData4[i].nowPrice);
        newPrice5.push(rawData5[i].nowPrice);

    }
    return {
        popCategoryData: categoryData,
        popValues: values,
        popVolumns: volumns,
        popNewPrice:newPrice,
        popNewPrice2:newPrice2,
        popNewPrice3:newPrice3,
        popNewPrice4:newPrice4,
        popNewPrice5:newPrice5

    };
}
function timeChartPop(array1){
    var arrLength=array1.length;
    if(arrLength>5){
        arrLength=5;
    }
    switch(arrLength){
        case 1:{
            timeChartone();
            break;
        }
        case 2:{
            timeCharttwo();
            break;
        }
        case 3:{
            timeChartthree();
            break;
        }
        case 4:{
            timeChartfour();
            break;
        }
        case 5:{
            timeChartfive();
            break;
        }
    }

}
function timeChartone(){
    console.log(firstSort)
    var data= sortSplitDataTime(firstSort.timeData)
    var myChart = echarts.init(document.getElementById('sortChart'));
    var option = {
        title: {
            text: '分时数据'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:[firstSort.groupName]
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data.popCategoryData
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:firstSort.groupName,
                type:'line',
                stack: '总量',
                data:data.popNewPrice
            }
        ]
    };
    myChart.setOption(option);
}
function timeCharttwo(){
    var myChart = echarts.init(document.getElementById('sortChart'));
    var data= sortSplitDataTime2(firstSort.timeData,secondSort.timeData)
    myChart.setOption(option = {
        backgroundColor: '#eee',
        animation: false,
        legend: {
            bottom: 10,
            left: 'center',
            data: ['Dow-Jones index', firstSort.groupName,secondSort.groupName]
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
                data: data.popCategoryData,
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
                data: data.popCategoryData,
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
                name: firstSort.groupName,
                type: 'line',
                data: data.popNewPrice,
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                },

            },
            {
                name: secondSort.groupName,
                type: 'line',
                data: data.popNewPrice2,
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                },

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
                data: firstSort.timeData.volume
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
function timeChartthree(){
    var myChart = echarts.init(document.getElementById('sortChart'));
    var data= sortSplitDataTime3(firstSort.timeData,secondSort.timeData,thirdSort.timeData)
    myChart.setOption(option = {
        backgroundColor: '#eee',
        animation: false,
        legend: {
            bottom: 10,
            left: 'center',
            data: ['Dow-Jones index', firstSort.groupName,secondSort.groupName,thirdSort.groupName]
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
                data: data.popCategoryData,
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
                data: data.popCategoryData,
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
                name: firstSort.groupName,
                type: 'line',
                data: data.popNewPrice,
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }

            },
            {
                name: secondSort.groupName,
                type: 'line',
                data: data.popNewPrice2,
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }

            },
            {
                name: thirdSort.groupName,
                type: 'line',
                data: data.popNewPrice3,
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }

            },
            {
                name: "成交量",
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: firstSort.timeData.volume
            }
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
function timeChartfour(){
    var myChart = echarts.init(document.getElementById('sortChart'));
    var data= sortSplitDataTime4(firstSort.timeData,secondSort.timeData,thirdSort.timeData,fourthSort.timeData)

    myChart.setOption(option = {
        backgroundColor: '#eee',
        animation: false,
        legend: {
            bottom: 10,
            left: 'center',
            data: ['Dow-Jones index', firstSort.groupName,secondSort.groupName,thirdSort.groupName,fourthSort.groupName]
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
                data:data.popCategoryData,
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
                data:data.popCategoryData,
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
                name: firstSort.groupName,
                type: 'line',
                data: data.popNewPrice,
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }

            },
            {
                name: secondSort.groupName,
                type: 'line',
                data: data.popNewPrice2,
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }

            },
            {
                name: thirdSort.groupName,
                type: 'line',
                data: data.popNewPrice3,
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }

            },
            {
                name: fourthSort.groupName,
                type: 'line',
                data: data.popNewPrice4,
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }

            },{
                name: "成交量",
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: firstSort.timeData.volume
            }
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
function timeChartfive(){
    var myChart = echarts.init(document.getElementById('sortChart'));
    var data= sortSplitDataTime5(firstSort.timeData,secondSort.timeData,thirdSort.timeData,fourthSort.timeData,fifthSort.timeData)
    myChart.setOption(option = {
        backgroundColor: '#eee',
        animation: false,
        legend: {
            bottom: 10,
            left: 'center',
            data: ['Dow-Jones index', firstSort.groupName,secondSort.groupName,thirdSort.groupName,fourthSort.groupName,fifthSort.groupName]
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
                data: data.popCategoryData,
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
                data: data.popCategoryData,
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
                name: firstSort.groupName,
                type: 'line',
                data: data.popNewPrice,
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }

            },
            {
                name: secondSort.groupName,
                type: 'line',
                data: data.popNewPrice2,
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }

            },
            {
                name: thirdSort.groupName,
                type: 'line',
                data: data.popNewPrice3,
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }

            },
            {
                name: fourthSort.groupName,
                type: 'line',
                data: data.popNewPrice4,
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }

            },
            {
                name: fifthSort.groupName,
                type: 'line',
                data: data.popNewPrice5,
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }

            },
            {
                name: "成交量",
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: firstSort.timeData.volume
            }
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
function addshareId(){

}