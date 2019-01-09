const express=require('express');
const expressStatic=require('express-static');
const expressRoute=require('express-route');

const bodyParser=require('body-parser');
const multer=require('multer');
const multerObj=multer({dest: './static/upload'});

const cookieParser=require('cookie-parser');
const cookieSession=require('cookie-session');

const consolidate=require('consolidate');

const mysql=require('mysql');

const server = express();

const app = server.listen(3100, function() {
  console.log('Express app server listening on port %d', app.address().port);
});

//设置允许跨域访问该服务
server.all('*', function (req, res, next) {
  // 允许来自所有域名请求
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  // // 是否允许发送Cookie，ture为运行
  // req.set('Access-Control-Allow-Credentials', true);

  // // 设置所允许的HTTP请求方法
  // req.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');

  // // 服务器支持的所有头信息字段，多个字段用逗号分隔
  // req.set('Access-Control-Allow-Headers', 'x-requested-with, x-ui-request， lang');
  next();
});

// 1、获取请求数据
server.use(bodyParser.urlencoded({extended: false}))
server.use(multerObj.any());

// 2、解析cookie、处理session
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

// 3、模板引擎
server.engine('html', consolidate.ejs);
server.set('views', 'template');
server.set('view engine', 'html');

// 4、route：只能用server.use()
server.use('/', require('./route/route.js'))

// 5、static
server.use(expressStatic('./static/'))