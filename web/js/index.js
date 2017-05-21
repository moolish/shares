$(function(){
    // var sharesCode=$("#searchCode").val()|| 0;
    // var searchUrl="searchId="+sharesCode;
    $("#searchShares").on({
        "click":function(){
            var sharesCode=$("#searchCode").val()|| 0;
            var searchUrl="searchId="+sharesCode;
            location.href="search.html?"+searchUrl;
        }
    
    })
})
var historyParam="";
$.ajax({
    url:"http://q.stock.sohu.com/hisHq?code=cn_300228&start=20130930&end=20131231&t=d&res=js",
    dataType:"jsonp",
    jsonp:"callback",
    cache:"false",
    type:"GET",
    jsonpCallback:"historySearchHandler",
    success: function(data){
     // historyParam=data.historySearchHandler;
      console.log(data, 'success')
      // historyChart(historyParam);
    },
    error: function(data){
        console.log(data)
    }
});