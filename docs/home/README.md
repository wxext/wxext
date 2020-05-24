# e小天
采用nodejs开发微信扩展应用

pc微信小助手,软件本地运行，不联网，安全可靠

方便管理本机微信，通过配置插件等进行网络连接

[:memo: 编辑本文档](https://github.com/wxext/wxext/blob/master/docs/home/README.md)

# 开发准备

+ [安装服务端](https://www.wxext.cn/app/install.html "安装e小天")
+ 扩展开发采用nodejs[安装nodejs](https://nodejs.org/dist/v12.16.3/node-v12.16.3-x64.msi "nodejs")
+ nodejs官网:https://nodejs.org/zh-cn/

## 安装开发工具
>+ nodejs自带npm命令，打开命令行执行
>+ npm i wxext -g

## 初始化一个demo
>+ 这是一个复读机demo，可复读文字、图片、动态表情、文章链接、小程序，群成员变化通知等
>+ wxext init
>+ [插件源码](https://github.com/wxext/wxext/blob/master/docs/ext/wxext/demo.js "微信复读机")

## 进入目录
>+ cd wxext

## 安装这个demo
>+ 把demo安装到插件目录下，刷新插件管理界面进行管理（启动、停止、删除）
>+ wxext install

## 运行这个demo
>+ 开发测试时直接使用nodejs测试，需先上一步安装完才可使用
>+ wxext

## 设置页面

>+ 软件需要授权使用  [去授权](https://www.wxext.cn/app/settings.html "e小天|设置中心")

>+ 设置通知推送到crm系统  [去配置](https://www.wxext.cn/app/settings.html "e小天|设置中心")

>+ 管理插件  [去设置](https://www.wxext.cn/home/i.html "e小天|个人中心")

# 功能列表
json数据格式，插件和http请求通用

## 主动请求
>+ 插件内使用Send函数发送数据
>+ http调用将数据post请求 http://127.0.0.1:8203/api?json 
>+ 请求同步返回微信操作结果
>+ 登录多个微信时,用pid来选择，0默认使用第一个，-1操作全部

### 启动功能
>+ 0取当前第一个微信，-1新启动一个微信
```
{
    "method": "run",
    "pid": 0
}
```
### 抖动微信
>+ 将微信抖动置顶
```
{
    "method": "show",
    "pid": 0
}
```
### 点击登录
>+ 点击微信启动时的登录页面
```
{
    "method": "clickLogin",
    "pid": 0
}
```
### 跳转二维码
```
{
    "method": "gotoQr",
    "pid": 0
}
```
### 退出登录
```
{
    "method": "loginOut",
    "pid": 0
}
```
### 结束进程
```
{
    "method": "kill",
    "pid": 0
}
```
### 连接列表
```
{
    "method": "list",
    "pid": 0
}
```
### 获取登录信息
```
{
    "method": "getInfo",
    "pid": 0
}
```

### 获取通讯录
>+ 包括好友、群聊、公众号
```
{
    "method": "list",
    "pid": 0
}
```
### 获取群列表
>+ 包括好友、群聊、公众号
```
{
    "method": "getGroup",
    "pid": 0
}
```
### 获取群成员
>+ 群内昵称，列表第一个为群主
```
{
    "method": "getGroupUser",
    "wxid": "23942162341@chatroom",
    "pid": 0
}
```
### 设置群公告
```
{
    "method": "setRoomAnnouncement",
    "wxid": "24288152652@chatroom",
    "msg": "朋友一生一起走",
    "pid": 0
}
```
### 设置备注
```
{
    "method": "setRemark",
    "wxid": "wxid_vw2prmx8xv5n22",
    "msg": "落落",
    "pid": 0
}
```
### 群踢人
```
{
    "method": "delRoomMember",
    "wxid": "4429337922@chatroom",
    "msg": "wxid_vw2prmx8xv5n22",
    "pid": 0
}
```
### 群拉人
```
{
    "method": "addGroupMember",
    "wxid": "4429337922@chatroom",
    "msg": "wxid_vw2prmx8xv5n22",
    "pid": 0
}
```
### 设置群名称
```
{
    "method": "setRoomName",
    "wxid": "24288152652@chatroom",
    "msg": "hello",
    "pid": 0
}
```
### 退出群聊
```
{
    "method": "quitChatRoom",
    "wxid": "23177484571@chatroom",
    "pid": 0
}
```
### 群邀请发送
```
{
    "method": "sendGroupInvite",
    "wxid": "4429337922@chatroom",
    "msg": "wxid_vw2prmx8xv5n22",
    "pid": 0
}
```
### 查头像
```
{
    "method": "getUserImg",
    "wxid": "wxid_vw2prmx8xv5n22",
    "pid": 0
}
```
### 查昵称信息
```
{
    "method": "getUserInfo",
    "wxid": "wxid_vw2prmx8xv5n22",
    "pid": 0
}
```
### 获取数据库列表
```
{
    "method": "getDbName",
    "pid": 0
}
```
### 执行数据库语句
```
{
    "method": "runSql",
    "db": "MicroMsg.db",
    "sql": "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;",
    "pid": 0
}
```


### 发送文本消息
>+ 需要艾特人时，传入atid
```
{
    "method": "sendText",
    "wxid": "filehelper",
    "msg": "https://www.baidu.com/",
    "atid": "",
    "pid": 0
}
```
### 转发图片
```
{
    "method": "sendImage",
    "wxid": "filehelper",
    "img": "图片本地路径",
    "imgType": "file",
    "pid": 0
}
```
### 转发动态表情
```
{
    "method": "sendEmojiForward",
    "wxid": "filehelper",
    "xml": "type=47收到的msg中的xml",
    "pid": 0
}
```
### 转发文章链接小程序
```
{
    "method": "sendAppmsgForward",
    "wxid": "filehelper",
    "xml": "type=49收到的msg中的xml",
    "pid": 0
}
```
### 发送语音通话
```
{
    "method": "callVoipAudio",
    "wxid": "wxid_vw2prmx8xv5n22"
}
```
### 清空聊天记录
```
{
    "method": "ClearMsgList"
}
```
## 事件通知
>+ 设置通知地址后会将事件推送到指定地址  [去设置](https://www.wxext.cn/app/settings.html "e小天|设置中心")
>+ 可以推送到php等服务地址接收消息，然后通过http回复发送消息
>+ 插件OnRes接收事件消息
>+ 每一个事件都有一个 type 字段表示含义

```
newmsg  type(1,3,34,43,37,47,48,49,10000) 微信消息
getchatroommemberdetail 701             群成员信息更新（new为1表示新成员，这里有邀请人id）
chatroommemberAdd   702             群成员增加（只有wxid）
chatroommemberSub   703         群成员减少（只有wxid）
getcontact  704                 联系人信息更新
tenpay  705                 收款结果
verifyuser  706             好友验证结果
createchatroom  707         创建群聊结果
xmlinfo 708                 对应xml图片地址

登录相关信息通知
info    flag(open,qrchange,auth,login,logout)
auth    720                 
open    721
qrchange    723
login   724
logout  725

callVoipAudio  726  发起电话
callVoipAudio  727  挂断电话
callVoipAudio  728  接通电话

exterr  802 插件连接断开通知
exterr  803 微信连接断开通知
tips  810   系统提示点击确定通知
```


## Websocket连接
>+ 每个Websocket连接都作为一个插件存在
>+ 每个插件只允许有一个连接
### 自定义Websocket连接
>+ 首先在e小天创建一个插件
>+ 在Websocket的headers里加入字段name的值为插件名
>+ 每个名称只能有一个连接，只有断开后才能接受其他连接
>+ 可在插件管理页面管理插件状态


+ 创建插件方法一

>+ 使用wxext命令（安装方式 npm i wxext -g）
>+ wxext add 插件名称
>+ 创建成功

+ 创建插件方法二

>+ 打开e小天软件，点查看日志，在打开的文件夹中返回上一层
>+ 进入ext目录，创建一个以插件名称命名的文件夹
>+ 在文件夹下创建一个package.json文件，内容如下
```
{"name":"插件名称","version":"1.0.0","description":"ws client","main":""}
```
> 此时就可以用这个插件名称连接了
