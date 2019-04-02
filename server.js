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

  // 服务器支持的所有头信息字段，多个字段用逗号分隔
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,token');

  res.header('Content-Type', 'application/json;charset=utf-8');

  // 设置所允许的HTTP请求方法
  req.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');

  // 是否允许发送Cookie，ture为运行,如果设置为true，'Access-Control-Allow-Origin'就不能设置为'*'，要设置为具体的url
  // req.header('Access-Control-Allow-Credentials', true);

  next();
});

// 获取请求数据
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());  //FIXME:如果不转为json,body只是个空对象
server.use(upload.any());   //  接收任何文件

// 解析cookie、处理session
server.use(cookieParser());

//FIXME:session是基于cookie的，存在于服务器，相对cookie安全，但session也存在session劫持的风险， 所以需要一串很长很多的秘钥数组来增加破解的难度。同时设置manAge过期时间， 减少留给坏人破解时间

/**
 * FIXME:如果使用session代替token，需要做如下设置
 * req.header('Access-Control-Allow-Credentials', true)
 * 同时'Access-Control-Allow-Origin'就不能设置为'*'，要设置为具体的url
 * 同时前端使用axios请求需要设置axios.defaults.withCredentials=true;允许携带cookie
 * */
(function() {
    let keys = [];
    for(let i = 0; i < 100000; i++) {
        keys.push(`keys${Math.random()}`)
    }
    //cookieSession 必须放在cookieParser后面
    server.use(cookieSession({
        name: 'session_id',       // 可以改变浏览器cookie的名字
        keys,                     // session的秘钥，防止session劫持。 这个秘钥会被循环使用，秘钥越长，数量越多，破解难度越高
        maxAge: 20 * 3600 * 1000  // session过期时间，不易太长。20min
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