const express = require('express')
const mysql = require('mysql')

const md5 = require('../../utils/md5')

// 数据库连接池
let db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'admin'
})

module.exports = (function() {
    let router = express.Router();

    router.post('/user', (req, res)=>{
        // 前端提交加密后的字段并和加密过的数据库的数据对比 注册的时候可以加密存储到数据库
        let username = req.body.username;   //  admin
        let password = req.body.password;   //  123

        db.query(`SELECT * FROM user_info WHERE username = '${username}'`, (error, data) => {

            if(error) {
                res.status(500).send('database error').end();
            } else {
                if(data.length === 0) {
                    res.status(400).send('用户名不存在').end();
                } else {
                    if(data[0].password === password) {
                        // 用户名和密码都正确后，生成随机加密的token
                        // token.randomToken(res)
                        db.query(`SELECT * FROM token_table`, (error, data) => {
                            if(error) {
                                res.status(500).send('database error').end();
                            } else {
                                // 用户名和密码都正确后，生成随机加密的token
                                token = md5.MD5(Math.random() + md5.MD5_SUFFIX);
                                let time = new Date().getTime()
                                console.log(token)
                                // 数据库插入不存在token
                                if(data.length === 0) {
                                    db.query(`INSERT INTO token_table(token,time) VALUES('${token}','${time}')`, (err, data) => {
                                        if(err){
                                            res.status(500).send('database error').end();
                                        } else {
                                            res.status(200).send(token).end()
                                        }
                                    })
                                } else {    // 数据库替换已存在token
                                    db.query(`UPDATE token_table SET token='${token}'`, (err, data) => {
                                        if(err){
                                            res.status(500).send('database error').end();
                                        } else {
                                            res.status(200).send(token).end()
                                        }
                                    })
                                }
                            }
                        })

                    } else {
                        res.status(400).send('用户名或密码输入不正确').end();
                    }
                }
            }
        })
    });

    return router;
}());
