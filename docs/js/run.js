$(function () {
    if($('.logo').length){
        function loadSay(){loadScript('https://v1.hitokoto.cn/?c=e&encode=js&select=%23hitoko')}
        $('.logo').popover({html:true,content:"<div id='hitoko'></div>"}).popover('show')
        setInterval(loadSay, 3000);
        loadSay()
    }
    function GetNewImg(src){
        return new Image().src=src  
    }
    var _hmt = _hmt || [];
    (function () {
        loadScript('https://hm.baidu.com/hm.js?ef106eeafd562752956afb9ae1582bf1')
        loadScript('https://tajs.qq.com/stats?sId=66538180')
        loadScript('https://s4.cnzz.com/z_stat.php?id=1278728235&web_id=1278728235')
    })();

})