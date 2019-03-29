const express = require('express')
const mysql = require('mysql')

const md5 = require('../utils/md5')



// 数据库连接池
let db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'admin'
})

let token;

module.exports = (function() {
    let router = express.Router();

    router.post('/userinfo', (req, res)=>{

        let userinfo = req.body.userInfo

        // 判断该用户是否存在
        db.query(`SELECT * FROM user_info WHERE username = '${userinfo.username}'`, (error, data) => {
            console.log(data)
            if(error) {
                res.status(500).send('database error').end();
            } else {
                if(data.length !== 0) {

                    res.status(400).send('用户名已存在').end();
                } else {
                    //TODO:数据库只插入了用户名和密码
                    db.query(`INSERT INTO user_info(username, password) VALUES('${userinfo.username}', '${userinfo.password}')`, (error, data) => {
                        if(error){
                            res.status(500).send('database error').end();
                        }
                    })
                    res.status(200).send({ code: 200, msg: '注册成功'}).end()
                }
            }
        })
    });

    return router;
}());
