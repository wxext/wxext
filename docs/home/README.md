# e小天

pc微信小助手,软件本地运行，不联网，安全可靠

本机进程管理工具,方便管理本机微信,扩展功能

旨在提高生产生活效率，禁止骚扰营销

[:memo: 编辑本文档](https://github.com/wxext/wxext/blob/master/docs/home/README.md)

# 开发准备

+ [PC微信安装](https://pc.weixin.qq.com/ "微信PC版")自适应匹配最新版PC微信

# 功能页面

>+ [管理插件](../home/i.html ":ignore e小天|个人中心")

>+ [展示页面](../app/demo.html ":ignore e小天|展示页面")

>+ [功能测试](../app/test.html ":ignore e小天|功能测试")

# 问题反馈
如遇微信崩溃,可下载该程序获取崩溃信息进行反馈
[TxBugClear](https://pan.wyfxw.cn/plainwizard/TxBugClear.exe "TxBugClear")

# 下载
[e小天安装包](https://pan.wyfxw.cn/plainwizard/Setup_wxext.msi "e小天")


# 更新 3.9.7.1
+ 解决网络问题
+ 支持x86最新版
+ 修复已知问题
+ 新增标签管理、群设置、转发引用等功能
+ 详见文档




# 这是最后一次更新

通过proxy访问后，不再以此项目作为界面代码，后续将不再更新此文档。

# proxy 本地代理
由于网络环境复杂，通过本机代理进行互联网访问  
用户可根据自身网络环境自选最优节点IP  
也可自行使用稳定的云服务进行中转访问  
可自行开发网页界面,仅支持https
```
{
    "method": "proxy",
    "addr": "节点服务地址IP或域名",
    "host": "wxext.cn.wscdns.com",
    "name": "节点名称"
}
```
设置中转节点后可访问 http://127.0.0.1:8203/proxy/app/demo.html

# 已支持CDN列表 
+ 各地区自选最优IP不同
+ 从自选IP列表中选择最优IP填入addr即可
+ host每个cdn对应不同，自建可不填或任意
+ name 自定义名称方便识别
## cloudflare 
自选IP列表:https://www.cloudflare.com/ips-v4
```
{
    "method": "proxy",
    "addr": "pcwx.wxext.cn",
    "host": "pcwx.wxext.cn",
    "name": "cloudflare"
}
```
## cachefly 
自选IP列表:https://cachefly.cachefly.net/ips/cdn.txt
```
{
    "method": "proxy",
    "addr": "wxext.cachefly.net",
    "host": "wxext.cachefly.net",
    "name": "cachefly"
}
```
## gcore 
自选IP列表:https://api.gcore.com/cdn/public-ip-list
```
{
    "method": "proxy",
    "addr": "gcore.com",
    "host": "wxext.cn.wscdns.com",
    "name": "gcore"
}
```
## alwaysdata 
自选IP列表:https://help.alwaysdata.com/en/security/ip-ranges/
```
{
    "method": "proxy",
    "addr": "www.wechat.com",
    "host": "www.wechat.com",
    "name": "alwaysdata"
}
```

+ 设置节点时，各cdn对应的host不可变，addr填写自选IP

>如自选 cloudflare 的IP地址 216.24.57.1
```
{
    "method": "proxy",
    "addr": "216.24.57.1",
    "host": "pcwx.wxext.cn",
    "name": "自选节点"
}
```
# 使用nginx做cdn转发自建节点

1. 直接https透传，内容不可修改，无需证书  
stream放在和http同一级
```
stream {
    map $ssl_preread_server_name $name {
        pcwx.wxext.cn node1;
    }
    upstream node1 {
        server pcwx.wxext.cn:443;
    }
    server {
        listen 443;
        proxy_pass $name;
        ssl_preread on;
    }
}
```
2 .转发配置，可用自己服务器内容替代，需要配置ssl证书  
server放在http内部
```
server
{
        listen 443;
        server_name wxext.cn;
        ssl on;
        ssl_certificate /ssl/wxext.cn/fullchain.pem;
        ssl_certificate_key /ssl/wxext.cn/privkey.pem;
        location / {
            proxy_pass https://pcwx.wxext.cn;
            proxy_set_header Host pcwx.wxext.cn;
        }
}
```

# 功能列表
```
getcontactlabellist 获取标签
{
    "method": "getcontactlabellist"
}
addcontactlabel 添加标签
{
    "method": "addcontactlabel",
    "name": "标签名字"
}
updatecontactlabel 修改标签
{
    "method": "updatecontactlabel",
    "id": "6",
    "name": "新名字"
}
delcontactlabel 删除标签
{
    "method": "delcontactlabel",
    "id": "6,"
}
modifycontactlabellist 修改联系人标签
{
    "method": "modifycontactlabellist",
    "data": [
        {
            "wxid": "wxid11111",
            "tag": "6,"
        },
        {
            "wxid": "wxid222",
            "tag": "6,7,8,"
        }
    ]
}

back_ 后台调用功能，界面上无显示
back_send_quote 发送引用
默认引用回复当前聊天对象，toid可指定其他
{
    "method": "back_send_quote",
    "msg": "文本内容",
    "tag": "",
    "sid": "引用sid"
}
back_send_emoji 转发表情
{
    "method": "back_send_emoji",
    "wxid": "filehelper",
    "sid": "sid"
}
back_send_appmsg 转发文章小程序
{
    "method": "back_send_appmsg",
    "wxid": "filehelper",
    "sid": "sid"
}
back_get_sns 获取朋友圈
填写wxid获取指定人的朋友圈，不填获取所有人的
填写返回的tag和id翻下一页，不填获取首页
{
    "method": "back_get_sns",
    "wxid": "wxid11",
    "tag": "",
    "id": ""
}
back_set_op 保存通讯录
{
    "method": "back_set_op",
    "wxid": "44728791513@chatroom",
    "type": "save",
    "flag": "1"
}
set_group_mute 设置免打扰
{
    "method": "set_group_mute",
    "wxid": "44728791513@chatroom",
    "flag": "1"
}
set_group_minimize 设置折叠
{
    "method": "set_group_minimize",
    "wxid": "44728791513@chatroom",
    "flag": "1"
}
inviteName 获取群邀请人信息
系统默认会自动获取，接收事件即可
手动更新可以获取指定版本之后的动态
可通过netUpdateUser获取chatroomVersion
或接收chatroommember事件中的ver属性
{
    "method": "inviteName",
    "wxid": "15849946639@chatroom",
    "ver": "700003586",
    "pid": 0
}
```


# 更新
[v3.8.0.1]
```
修复已知问题,支持所有版本(适配至3.8,低版本已修复)
新增 获取图片接口 启动设置代理

按需获取图片
建议使用该接口获取图片,本地不存在图片时会从服务器下载
{
  "method": "getimgbyid",
  "sid": "5128124805257345615",
  "pid": "0"
}

通过代理启动微信
{
    "method": "run",
    "pid": -1,  //-1 为始终启动一个新的
    "path":"c:\\a\\bb\\Wechat.exe", // 指定安装路径,可省略
    "wxid":"wxid_xxx",//指定使用该wxid的配置快速进入微信(不存在则空配置)
    "proxy":"127.0.0.1:1080",//格式为  address:port/username:password
}

# 更新
[v3.7.5.0]
```
修复已知问题
新增配置管理,方便启动指定微信,换机不异常
启动时指定wxid,方便自动进入无需确认
换机时,点击软件上的查看配置,将wxconfig目录复制到新机
传入指定wxid启动,则使用就设备配置,不会出现新设备异常
始终保持微信活跃状态,防止消息延迟

获取配置列表
{
    "method": "wxconfig_list",
}
启动微信
{
    "method": "run",
    "pid": -1  //-1 为始终启动新的,可省略
    "path":"c:\\a\\bb\\Wechat.exe" // 指定安装路径,可省略
    "wxid":"配置列表中的wxid"//指定使用该wxid的配置运行微信,可省略
}
删除配置
{
    "method": "wxconfig_del",
    "wxid": "配置列表中的wxid"
}

获取群成员
返回群信息和成员信息对象
重新按显示排序,群主和管理员排最前,utype标识群主和管理员
{
    "method": "getGroupUser_v2",
    "wxid": "25686579579@chatroom"
}
原getGroupUser返回成员信息数组,排序为入群时间


转发消息
{
    "method": "forwardMsg",
    "id": "本地id或服务端id"
}
图片视频等需要先下载才能转发,收到消息时延时转发
如果转发失败,请检查是否开启自动下载
设置所有时段自动下载{"method": "downrange","flag": "0","data": "00:00-00:00"}
```

[v3.7.0.1]
```
修复了一些已知问题
提高稳定性和适应能力
移除添加好友相关功能
```

[v3.6.0.1]
```
移除xmlpath,cdntask等通知消息
新增主动获取消息能力
如需获取消息的图片可查询{"method": "getMsg", "sid": "xxxxx" }
如需获取dat图片可获取{"method": "getfile", "path": "C:\\Users\\xxx.dat" }
如需开启全天自动下载可设置不下载时段{"method": "downrange","flag": "0","data": "00:00-00:00"}
获取撤回消息sid是通知消息中"type":10002中的newmsgid

获取消息
{
    "method": "getMsg",
    "type": 1
}
可选参数:
sid:返回等于该id的消息(sid为消息通知中的19位id)
id:返回大于该id的消息
flag:返回小于上述id的消息
type:返回指定类型的消息
msg:返回包含相关内容的消息(搜xml加前缀x:)
fromid:返回指定对象消息
memid:返回指定群成员消息


网络获取群成员邀请信息
{
    "method": "getchatroommemberdetail",
    "wxid": "xxx@chatroom"
}
网络获取群成员详细信息
{
    "method": "netUpdateUser",
    "wxid": "wxid_xxx",
    "groupid": "xxx@chatroom"
}
查找微信号
{
    "method": "netSearchUser",
    "wxid": "wxid_xxx"
}
同意好友
{
    "method": "agreeUser",
    "encryptusername": "v3_020b6b@stranger",
    "ticket": "v4_000b701ffc82@stranger",
    "scene": 收到消息中的scene字段内容
}
刷新朋友圈
{
    "method": "mmsnstimeline"
}
退回
{
    "method": "agreeCash",
    "wxid": "wxid_xxx",
    "transferid": "op=refuse&trans_id=10000500012xxx",
    "pid": 0
}
查询状态
{
    "method": "agreeCash",
    "wxid": "wxid_xxx",
    "transferid": "trans_id=10000500012xxx",
    "pid": 0
}
接收
{
    "method": "agreeCash",
    "wxid": "wxid_xxx",
    "transferid": "10000500012xxx",
    "pid": 0
}
```

# 应用开发
>+ 插件应用通过websocket进行连接通讯
>+ 数据为json格式
>+ 开发者交流群:321620171

## 应用开发

>+ [创建应用](../home/app.html ":ignore e小天|创建应用")
>+ 框架支持启动命令行运行应用,如 node,python,java 等
>+ 框架启动DLL类型应用时,会执行应用的 WxExt_Run 方法
>+ 应用启动后在第一时间连接框架,否则会关闭应用

### web应用示例

关键词回复应用 https://github.com/wxext/ext-nodejs-keyhelp
web复读机应用 https://github.com/wxext/ext-js-demo

### dll应用开发

```
//应用导出Run方法即可
extern "C" __declspec(dllexport) void __cdecl CN_WXEXT_RUN(void) {
    //执行应用启动代码
}
//无法导出函数的,以下形式创建对应的Run方法
namespace CN.WXEXT
{
    public class WxExtApp
    {
        public void CN_WXEXT_RUN()
        {
            //执行应用启动代码
        }
    }
}
```

>+ 应用启动后,通过websocket连接即可,连接链接为
>+ ws://127.0.0.1:8202/wx?name=应用名称&key=连接密钥
>+ 应用名称和连接密钥可在启动参数中取得(程序内获取应用的启动参数),参考 关键词回复应用
>+ 测试应用会在应用目录下写入key,应用名称为www开头时,可通过http获取密钥
>+ 测试应用可打开WxExtApp.exe查看密钥

### web应用示例
```
应用中心搜索www
输入密钥:123按回车添加应用
到个人中心启动应用
此时可以通过http获取ws连接密钥
http://127.0.0.1:8203/ext/www/key.ini

```


### 创建应用
```
应用运行填写示例:
运行程序 cmd  主程序 /c node app.js
说明:通过cmd执行node app.js命令

运行程序 node  主程序 app.js
说明:通过node程序执行app.js

两种填法都可以实现运行app.js应用
```

## 调试应用
把安装目录下的 WxExtApp.exe 复制到需要调试的开发目录,打开即可调试
调试之前在运营中心启动对应的调试应用,WxExtApp刷新获取调试信息

## 应用通讯
>+ 应用通过websocket连接接收消息和发送消息,消息为json格式
>+ 登录多个微信时,用pid来选择，默认情况下(0使用第一个，-1操作全部)

### 软件配置
>+ 该方法返回所有配置项,部分配置可传入修改,重启软件生效
```
{
    "method": "setConfig",
    "log": 0,//1开启日志
    "allowNet": 1,//1开启外网,已新增key和ip白名单验证,可安全使用
}
```
### 应用配置
>+ 消息日志,插件日志,http推送日志,都有单独的配置.特别的:无论是否开启日志,都会记录错误日志
```
{
    "method": "setExt",
    "log": 0,//1开启日志
    "name": "wxext",//插件名称
}
```
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
>+ 群内昵称，排序为入群时间
```
返回成员信息数组
{
    "method": "getGroupUser",
    "wxid": "23942162341@chatroom",
    "pid": 0
}

返回群信息和成员信息对象
重新按显示排序,群主和管理员排最前,utype标识群主和管理员
{
    "method": "getGroupUser_v2",
    "wxid": "23942162341@chatroom",
    "pid": 0
}
```
### 设置群公告
>+ 会自动添加@所有人
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
艾特消息
{
    "method": "sendText",
    "wxid": "23942162341@chatroom",
    "msg": "@昵称1 @昵称2 艾特消息",
    "atid": "wxid_xxx1|wxid_xxx2",
    "pid": 0
}
```
### 转发图片
```
{
    "method": "sendImage",
    "wxid": "filehelper",
    "img": "图片本地路径",//自动下载的路径通过xmlinfo推送来获取
    "imgType": "file",
    "pid": 0
}
```

### 发送动态表情
```
{
    "method": "sendEmoji",
    "wxid": "filehelper",
    "path": "C:\\Users\\hello.gif",//本地路径
    "pid": 0
}
```
### 转发动态表情
```
{
    "method": "sendEmojiForward",
    "wxid": "filehelper",
    "xml": "type=47收到的msg中的xml",//参考接收到的xml
    "pid": 0
}
```
### 转发文章链接小程序
```
{
    "method": "sendAppmsgForward",
    "wxid": "filehelper",
    "xml": "type=49收到的msg中的xml",//参考接收到的xml
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
>+ 长时间运行建议清空聊天记录
```
{
    "method": "ClearMsgList"
    "pid": -1//全部
}
```
### 其他
>+ lazy
```
向应用发送请求(应用需要回应请求)
{
    "method": "e",
    "name": "测试插件",
    "xxx","xxx"
}
发起通知(同时向ws和http推送type = 840的消息)
{
    "method": "extNotify",
    "xx": "xx",
    "xxx": "xxx"
}
获取文件数据
{
    "method": "getfile",
    "path": "C:\\Users\\....7fadd4bfe.dat"
}
保存数据(可选type:base64,hex,url,默认为保存文本)
{
    "method": "savefile",
    "path": "hello.txt"
    "data": "hello world"
}
保存图片
{
    "method": "saveimg",
    "type": "url"
    "data": "https://www.baidu.com/img/flexible/logo/pc/result.png"
}
接收转账收款
{
    "method": "agreeCash",
    "wxid": "对方wxid",
    "transferid": "收到的xml中获取",
    "pid": 0
}
忙时段设置图片等不自动下载
有三个时间段可以单独设置
flag=1 2 3 分别设置三个时间段
flag=0同时设置3个时间段
请求后会返回三个时间段
设置成 00:00-00:00 24小时自动下载
{
    "method": "downrange",
    "flag": "1",
    "data": "18:00-23:15"
}
网络获取详细信息,昵称 头像
{
    "method": "netGetUser",
    "wxid": "wxid_vw2prmx8xv5n22|wxid_vryy2hqz4mv212",
    "pid": 0
}

搜索文章下一页
searchID:"返回的searchID"
searchOffset:"返回的偏移offset"

判断是否需要好友验证,对方为好友或者关闭验证时不需要验证
被加入黑名单时,返回:对方拒绝接收你的消息
{
    "method": "userid",
    "wxid": "wxid_vw2prmx8xv5n22",
    "pid": 0
}
### HTTPKEY
key计算方式:sha1("httpkey|wxext.cn|MachineName|密码")
MachineName为本机机器名,密码初始为空
本地请求带上referer可免key
修改key
{
    "method": "key",
    "old": "",//旧密码,默认为空
    "pwd": "",//设置新密码
    "ips": "127.0.0.1"//设置ip白名单
}
```
## 事件通知
>+ 设置通知地址后会将事件推送到指定地址  [去设置](../app/settings.html ":ignore e小天|设置中心")
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
xmlinfo 708                 对应xml资源下载到本机事件

登录相关信息通知
info    flag(open,qrchange,auth,login,logout)
auth    720                 
open    721
qrchange    723
login   724  登录,可以根据time过期时间判断有没有自动授权
logout  725
expired 729 授权到期前半小时通知/主动请求未授权通知

callVoipAudio  726  发起电话
callVoipAudio  727  挂断电话
callVoipAudio  728  接通电话

mmsns 731 朋友圈红点点
mmsns 732 新朋友圈推送
mmsns 733 朋友圈列表


exterr  802 插件连接断开通知
exterr  803 微信连接断开通知
exterr  804 http推送状态连续出错超过20次被停止推送
tips  810   系统提示点击确定通知
840   插件通知消息

应用状态 -1未安装 0已安装 1正在初始化 2正在运行 3运行错误 4停止运行
推送状态 1停止 2运行 3错误
```