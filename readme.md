# 服务器
## 技术栈
 + node
    + fs
 + express
 + express-static   //处理静态文件
 + body-parser      //解析post数据
 + multer           //解析post文件
 + cookie-parser    //解析cookie（签名：简单密钥）
 + cookie-session   //处理session
 + marked           //解析md文件，转换成html文件


## 目录结构
|——server.js   服务器入口文件
|——static      静态文件
|——utils       js工具
|——route       路由文件
|   |——route.js