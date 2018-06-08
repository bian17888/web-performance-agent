# Web Performance Agent

项目介绍 + 账号信息文档, 参见[此链接](https://lark.alipay.com/aliyun_connect/ouyaro)

## 一 Node.js 项目 

### 1 软件安装

- 安装 Node.js
- 安装 tnpm
- 安装 n

#### 安装 Node.js

	// Mac 系统
	// 安装 homebrew
	见 : https://brew.sh/index_zh-cn.html
	// 安装Node.js
	brew install node
	
	// Windows系统
	见 : https://nodejs.org/en/

#### 安装 tnpm

	// 全局安装
	npm install tnpm -g --registry=http://r.npm.alibaba-inc.com

参考 : [tnpm](http://gitlab.alibaba-inc.com/node/tnpm)

#### 安装 n

	// 安装 n
	tnpm install -g n
	
	// 安装并使用 Node.js LTS 版本
	n lts
	n 回车
	选择 LTS 版本

参考 : [n](https://github.com/tj/n)

### 2 配置

#### 安装依赖 tnpm

	// 在项目目录下
	tnpm install

### 3 启动

	node src/server/app.js


## 二 客户端

### Postman

	{
        "dingTalk": "https://oapi.dingtalk.com/robot/send?access_token=45e588eabe9c73d335537ec215c1f4dd44e72eb10c5caaedbe5a0a45c15b1b76",
        "task": [
            "https://rdsnew.console.aliyun.com/#/rdsList/basic/",
            "https://oss.console.aliyun.com/index"
        ],
        "cookies": []
    }

### Chrome Cookie 插件

[EditThisCookie](https://chrome.google.com/webstore/detail/editthiscookie/fngmhnnpilhplaeedifhccceomclgfbg)

## 三 POC1 规划

### 本地

- Node.js + Java 打通 - 结果回传到 Client (或 OSS)
- Client (用熟悉技术) - 展示结果

### 远端
		
- 环境初始化 - 项目run - 打包镜像
- 复制镜像到多region

### 挑战点

- Dom自动登录 (配置用户名+密码)
	- 目前Cookie登录, 会有失效时间的问题
	- 坑 : 无法获取到内嵌iframe load完状态
