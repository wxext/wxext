# wxext
微信扩展使用文档

微信机器人开发
功能扩展

## 使用流程

+ [安装软件](https://www.wxext.cn/app/install.html "install")
```
安装后，在桌面有快捷方式
首次启动右键以管理员权限打开软件,点击启动服务
如您已安装PC微信,可直接使用,未安装请至微信官网下载安装
```
+ [展示界面](https://www.wxext.cn/app/demo.html "demo")
```
在此界面方便的查看和启动本机微信
```

+ [授权使用](https://www.wxext.cn/app/settings.html "settings")
```
使用功能前需要进行授权,登录微信后才能进行授权
授权需要使用wxid
在授权界面会列出本机登录的wxid,复制需要授权的wxid点击授权
授权成功后可以进行其他功能测试
授权token包含本机mac和wxid,授权失败一般是信息不匹配或到期
```

+ [测试界面](https://www.wxext.cn/app/test.html "test")
```
功能较多，自行测试
使用功能前需要进行授权
```

+ [在线开发](https://www.wxext.cn/app/run.html "test")
```
采用JScript脚本语言开发,无需编译,提交即运行
集成了本地数据库,日志，网络访问，系统提示，定时任务 等快捷工具
快速实现功能，解决繁琐人工问题，提高生产效率
```