const express=require('express');
const expressStatic=require('express-static');        //  处理静态文件

const bodyParser=require('body-parser');              //解析post数据
const multer=require('multer');                       //解析上传的post文件
const upload=multer({dest: './static/upload'});       //指定上传路径，文件大小

const cookieParser=require('cookie-parser');          //解析cookie（签名：简单密钥）
const cookieSession=require('cookie-session');        //处理session

const ipv4 = require(__dirname + '/utils/ipv4.js');   // 获取本地IPV4地址

const server = express();

//设置允许跨域访问该服务
server.all('*', function (req, res, next) {
  // 允许来自所有域名请求
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  // 是否允许发送Cookie，ture为运行
  // req.set('Access-Control-Allow-Credentials', true);

  // 设置所允许的HTTP请求方法
  // req.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');

  // 服务器支持的所有头信息字段，多个字段用逗号分隔
  // req.set('Access-Control-Allow-Headers', 'x-requested-with, x-ui-request， lang');
  next();
});

// 获取请求数据
server.use(bodyParser.urlencoded({extended: false}));
server.use(upload.any());   //  接收任何文件

// 解析cookie、处理session
server.use(cookieParser());

(function() {
  let keys = [];
  for(let i = 0; i < 100000; i++) {
    keys.push(`keys${Math.random()}`)
  }
  server.use(cookieSession({
    name: 'session_id',
    keys,
    maxAge: 20 * 3600 * 1000  // 20min
  }))
}());

// 注册路由：只能用server.use()
server.use('/', require('./route/route.js'));

// 静态文件
server.use(expressStatic('./static/'));

// 设置端口号
server.set('port', process.env.PORT || 3100);

var app = server.listen(server.get('port'), function() {
  console.log(`Express app server listening on:${ipv4}:${app.address().port}`);
});