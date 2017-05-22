/**
 * Created by Administrator on 2017/5/22.
 */
function sort() {
    var array1 = ["冷冻食品", "婴儿尿布", "日常护理", "路由器", "手机", "手机贴膜", "米面杂粮", "休闲食品", "水果"];
    var array2 = ["蜜饯干果", "面膜", "乳液面霜", "饮品甜品", "移动电源", "洁面", "沐浴", "电水壶", "食用油", "禽肉蛋品", "休闲零食", "插座", "电饭煲", "蔬菜", "手机保护套"];
    var hasMove = false;
    initPop(array1, array2);
    disLike(array1);
    recommendmove(array1, array2)
    choosemove(array1, array2, hasMove);
}

// 创建
function initPop(array1,array2){
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
        var lastmodelY=parseInt(array1.length/4)*2+4.9
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
                    "top":""+(1.85+parseInt(i/4)*2-2)+"rem",
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
    var _height=$(".chooseList4").offset().top-$(".chooseList0").offset().top?$(".chooseList5").offset().top-$(".chooseList1").offset().top:10000
    var _width=$(".chooseList1").offset().left-$(".chooseList0").offset().left?$(".chooseList2").offset().left-$(".chooseList1").offset().left:10000
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

                $(".recommend ul").prepend("<li style='position:absolute;z-index:0;top:1.85rem;left:0.85rem;visibility:hidden'>"+array2[0]+"</li>");
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
                    $(".changeModel").css("visibility",null);
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
}
function timingChartP(){
    for(var i=0;i<arr1.length;i++){

    }

}
