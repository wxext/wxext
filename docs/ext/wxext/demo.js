module.exports = {
    OnReq: function (obj, callback) {
        //30秒内执行callback返回是（传入数据）否（传入空）拦截,否则请求返回超时
        //避免超时先回调callback()，再继续处理
        //OnReq事件需要在package.json中定义OnReq字段才会生效
        //如不需要拦截请求消息，需删除package.json中的OnReq字段
        console.log('收到请求事件', obj)
        if (obj.isLocal) return callback()//如果是本地请求，不拦截
        callback({ msg: '不允许外网访问' })//外网访问拦截
    }
    , OnRes: async function (obj) {
        console.log('收到响应事件', obj)
        if (!obj.data) return console.log('不是消息')
        if (obj.data.fromid == obj.myid) return console.log('收到自己的消息')
        //如果是群聊---只复读这个群的
        if (obj.data.memid && obj.data.fromid != '24218554582@chatroom') return
        //探索人类的本质---复读机的实现
        let result = await FuDuJi(obj)
        console.log('复读结果', result)
    }
    , OnStart: function () {
        //插件启动
    }
}

async function FuDuJi(obj) {
    //如果是文本消息，则回复文本
    if (obj.type == 1)
        return await Send({ method: 'sendText', wxid: obj.data.fromid, msg: obj.data.msg })
    //如果是图片消息，则回复图片
    //图片type=3，但是这里没有图片路径，用xml资源事件来实现
    if (obj.type == 708)
        return await Send({ method: 'sendImage', wxid: obj.data.fromid, img: obj.data.path, imgType: 'file' })
    //如果是动态表情，则回复动态表情
    if (obj.type == 47)
        return await Send({ method: 'sendEmojiForward', wxid: obj.data.fromid, xml: obj.data.msg })
    //如果是小程序、文章链接，则回复小程序、文章链接
    if (obj.type == 49)
        return await Send({ method: 'sendAppmsgForward', wxid: obj.data.fromid, xml: obj.data.msg })
    //有人加群，加群type=702 但是没有邀请人id，用群成员信息更新来实现
    if (obj.type == 701) {
        for (let user of obj.data.member) {
            if (user.new) {
                //这是新用户
                return await Send({ method: 'sendText', wxid: obj.data.fromid, msg: '又增加了新伙伴' })
            }
        }
    }
    //有人退群
    if (obj.type == 703)
        return await Send({ method: 'sendText', wxid: obj.data.fromid, msg: '小伙伴离开了我们' })

}