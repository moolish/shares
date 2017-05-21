基本api
define,require,requirejs。  require===requirejs
通过define定义一个模块
a.js下
define(function(){
    function fun1(){
        var a=0;
        console.log(a);
    }
})
html中通过require使用
<script>
require(["js/a"]，function(){
        alert("ok")//用于处理完的响应
});
</script>

加载文件path
require.config({
    paths:{
        "jquery": ["http://libs.baidu.com/jquery/2.0.3/jquery", "js/jquery"],
        "a":"js/a"
    }
})
require(["jquery","a"],function(){

});
data-main入口
异步打开main.js
<script data-main="script/main" src="js/require.js"></script>
定义模块
模块仅值对，没有任何依赖
define("当前js",function(request,exports,module){
    var Until=require(引用js)
    var cartoon={
        init：
        
    }
})