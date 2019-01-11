// 获取本地ipv4地址，过滤掉ipv6和127.0.0.1

const os = require('os');

module.exports = (function (){
    var interfaces = os.networkInterfaces();    //  获取网络接口列表
    var ipv4s = [];                             //  存储IP4v地址，同一接口可能有不止一个IP4v地址

    Object.keys(interfaces).forEach(function (key){
      interfaces[key].forEach(function (item){

          //跳过IPv6 和 '127.0.0.1'
          if ( 'IPv4' !== item.family || item.internal !== false ) return;

          ipv4s.push(item.address);
          console.log(key+'--'+item.address);
      })
    })

    return ipv4s;
}())
