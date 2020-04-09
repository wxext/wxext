{
    info: {
        name: 'test'//插件名称
        , des: '这是一个测试插件'//描述
        , timer: 10//定时器运行间隔，整数秒或者字符串Cron表达式
        , onmsg: true//是否可拦截通知消息,拦截的意思是不继续往下处理
        , onreq: true//是否可拦截请求信息,返回自定义信息
    }
    , onmsg: function (data) {//接收到消息时
        if(data.Contains('hi'))app.Send(Jstr({method: "sendText", wxid: "filehelper", msg: data}))
        //如果消息包含hi，把消息发给文件传输助手
    }
    , onreq: function (data) {//接收到请求时
        return Jstr({msg:'插件拦截了所有请求消息'})
    }
    , timer: function (data) {
        //定时器指定时间运行，测试时只会立即运行一次
        var time=DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")
        var data={method: "sendText", wxid: "filehelper", msg: "hi,现在是："+time}
        return app.Send(Jstr(data))
    }
    ,onstart:function(params) {
       app.Log('开始运行前初始化动作,比如创建数据库表啥的')
    }
}