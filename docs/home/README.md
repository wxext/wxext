# e小天

pc微信小助手,软件本地运行，不联网，安全可靠

本机进程管理工具,方便管理本机微信

旨在提高生产生活效率，禁止骚扰营销

[:memo: 编辑本文档](https://github.com/wxext/wxext/blob/master/docs/home/README.md)

> 本框架使用门槛较高,需要开发者有一定的编码能力

# 开发准备

+ [安装服务端](https://www.wxext.cn/app/install.html "安装e小天")

+ [PC微信安装](https://pc.weixin.qq.com/ "微信PC版")支持最新版微信（每个人最新版不一样咋办呀?那就都支持）

# 更新日志

>+ 修复已知bug,稳定支持最新版
>+ 支持使用任意语言进行开发应用,使用WxExtApp.exe进行调试应用
>+ 请求同步响应数据,如 网络更新好友信息同步返回结果
>+ 部分参数变化,如同意好友请求参数encryptusername,一般接口返回 invalid xxx就是缺少xxx参数
>+ 提高安全性,访问需要key和IP白名单
>+ 默认关闭日志

# 成员贡献项目,仅供参考
>+ [JAVA+HTTPAPI_DEMO](https://github.com/wxext/wechat-java-api-window "JAVA+HTTPAPI_DEMO")
>+ [易语言](https://github.com/wxext/wechat-e "易语言模块")
>+ [Python](https://gitee.com/KratosMax/WxextBasedWeChatBot "Python调用")
>+ [nodejs微信复读机](https://github.com/wxext/wxext/blob/master/docs/ext/wxext/demo.js "微信复读机demo")，可复读文字、图片、动态表情、文章链接、小程序，群成员变化通知等

## 设置页面

>+ [展示页面](https://www.wxext.cn/app/demo.html "e小天|展示页面")

>+ [功能测试](https://www.wxext.cn/app/test.html "e小天|功能测试")

>+ [软件授权](https://www.wxext.cn/app/settings.html "e小天|设置中心")

>+ [管理插件](https://www.wxext.cn/home/i.html "e小天|个人中心")

# 应用开发
插件应用通过websocket进行连接通讯
数据为json格式

## 创建应用

>+ [创建应用](https://www.wxext.cn/app/app.html "e小天|创建应用")

## 开发应用
>+ 框架支持启动命令行运行应用,如 node,python,java 等
>+ 框架启动DLL类型应用时,会执行应用的 WxExt_Run 方法
>+ 应用启动后在第一时间连接框架,否则会关闭应用

```
//应用导出Run方法即可
extern "C" __declspec(dllexport) void __cdecl WxExt_Run(void) {
    //执行应用启动代码
}
//无法导出函数的,以下形式创建对应的Run方法
namespace WxExt
{
    public class WxExtApp
    {
        public void WxExt_Run()
        {
            //执行应用启动代码
        }
    }
}
```

>+ 应用启动后,通过websocket连接即可,连接链接为
>+ ws://127.0.0.1:8202/wx?name=应用名称&key=连接密钥
>+ 应用名称和连接密钥可在环境变量中取得
>+ 测试应用可打开WxExtApp.exe查看密钥

## 调试应用
把安装目录下的 WxExtApp.exe 复制到需要调试的开发目录,打开即可调试
调试之前在运营中心启动对应的调试应用,WxExtApp刷新获取调试信息

## 应用通讯
>+ 应用通过websocket连接接收消息和发送消息,消息为json格式
>+ 登录多个微信时,用pid来选择，默认情况下(0使用第一个，-1操作全部)

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
### 插件列表
```
{
    "method": "ext",
    "action": "list",
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
    "method": "getUser",
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
>+ 多人艾特用|分割，同时msg要对应多个艾特文本
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
>+ 紧急事件可以通过发送语音通话实现
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
>+ 可以推送到php等服务地址接收消息，然后通过http(需ip白名单带key请求)回复发送消息
>+ 插件通过websocket实时接收消息
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
login   724  登录,可以工具time过期时间判断有没有自动授权
logout  725
expired 729 到期前半小时通知/主动请求无效通知

callVoipAudio  726  发起电话
callVoipAudio  727  挂断电话
callVoipAudio  728  接通电话

exterr  802 插件连接断开通知
exterr  803 微信连接断开通知
tips  810   系统提示点击确定通知
```