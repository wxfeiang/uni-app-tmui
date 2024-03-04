## 升级uni-app
npx @dcloudio/uvm@latest
npx @dcloudio/uvm@ 3.0.0-alpha-4000120240201002

## 类型报错提示
pnpm add  -D @types/node



## 项目说明

pnpm

## 项目文档


## 发布微信
# 仅编译uni-app项目到微信小程序
cli publish --platform mp-weixin --project 项目名称

# 编译uni-app项目到微信小程序，并上传发行小程序到微信平台
cli publish --platform mp-weixin --project 项目名称 --upload true --appid 小程序appid --description 发布描述 --version 发布版本 --privatekey 小程序上传密钥文件

cli publish --platform mp-weixin --project 项目名称 --upload true --appid 小程序appid --description 发布描述 --version 发布版本 --privatekey 小程序上传密钥文件  --robot 2

## UI地址
 [tmui 框架](https://tmui.design/start/%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B.html)


## 请求相关

[alova.js 请求库](https://alova.js.org/zh-CN/tutorial/getting-started/method)

### Post
**注意：** 3个参数位置
```
Post(
    DOWNFILE,  // 请求地址
    {
       userId: 2,     // post 参数 JSON 格式
    },
    {
      responseType: 'arraybuffer',  // 配置参数
      params: {     // 地址栏参数  必须是key为params
        userId: 2,
      },
    },
  );

```

### Get
**注意：** 2个参数位置
```
Get(
    DOWNFILE,  // 请求地址
    {
      responseType: 'arraybuffer',  // 配置参数
      params: {     // 地址栏参数  必须是key为params
        userId: 2,
      },
    },

  );
```

## Router
**注意：** 路由方法已经按需加载
[路由插件地址](https://moonofweisheng.github.io/uni-mini-router/guide/introduction.html)
```
	{
			"path": "pages/index/index",
			"name":"Index",     // 路由名称
			 "meta": {
			 	"ignoreAuth": true // 忽略校验 ,直接进入路由
			 },
			"style": {
				"navigationBarTitleText": "首页"
			}
		}

```