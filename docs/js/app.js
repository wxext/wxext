//<script>hitokoto()</script>

let api_url = localStorage.getItem('api_url')||'http://127.0.0.1:8203/api?json', clientPC = {}
function wx(data, fn, url) {
    $.LoadingOverlay("show")
    log()
    $.ajax({
        type: "POST",
        url: url || (api_url + '&key=' + localStorage.getItem('userkey')), data,
        success: function (res, status) {
            if (res.msg) log(res.msg)
            fn(res)
        },
        error: function (xhr, errorText, errorType) {
            log('服务错误,请查看是否已启动服务:' + api_url)
        },
        complete: function () {
            $.LoadingOverlay("hide")
        }
    })
}
function CheckLogin() {
    var key = /key=([A-Z0-9]{40})/.exec(location.search)
    if (key) {
        window.setuserkey = key[1]
        localStorage.setItem('userkey', setuserkey)
    }
    if (!window.$) return
    if (location.pathname.includes('login')) return;
    if (!localStorage.getItem('userkey')) localStorage.setItem('userkey', 'key')
    wx({ method: 'mac' }, function (res) {
        if (res.msg) {
            localStorage.setItem('userkey', '')
            wx({ method: 'setConfig' }, function (res) {
                if (res.msg) return log(res.msg)
                console.log('userkey', res.config.key)
                localStorage.setItem('userkey', res.config.key)
            })
            //location.href = '../app/login.html'
        }
        clientPC = res
        console.log('版本', res.ver)
        console.log('设备', res.id)
    })
}
setTimeout(CheckLogin, 0)

function TipMsg(message) {
    $('<div>')
        .appendTo('body')
        .addClass('alert alert-danger')
        .html(message)
        .show()
        .delay(3000)
        .fadeOut();
};
function log(msg) { $("#tip").text(msg || ''); if (msg) TipMsg(msg) }
function loadScript(src) {
    var hm = document.createElement('script');
    hm.src = src;
    var s = document.getElementsByTagName('body')[0];
    s.parentNode.insertBefore(hm, s);
}

setTimeout(function () {
    var _hmt = _hmt || [];
    (function () {
        loadScript('https://hm.baidu.com/hm.js?ef106eeafd562752956afb9ae1582bf1')
        loadScript('https://s4.cnzz.com/z_stat.php?id=1278728235&web_id=1278728235')
    })();
}, 0)

