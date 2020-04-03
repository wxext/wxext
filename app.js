//<script>hitokoto()</script>
function loadScript(src) {
    var hm = document.createElement('script');
    hm.src = src;
    var s = document.getElementsByTagName('body')[0];
    s.parentNode.insertBefore(hm, s);
}
window.loadTime = +new Date();
loadScript('/run.js?t='+loadTime)
