const mysql = require('mysql')
const md5 = require('md5.js')

// 数据库连接池
let db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'admin'
})

// 生成随机token值，若数据库不存在token，则添加，若存在，则替换
let token;

let select = `SELECT * FROM token`
let insert = `INSERT INTO token(token) VALUES ('${token}')`
db.query(select, (error, data) => {
    if(error) {
        res.status(500).send('database error').end();
    } else {
        if(data.length >= 0) {

        } else {
            token = md5.MD5(Math.random() + md5.MD5_SUFFIX);

            db.query(insert, (error, data) => {
                if(error){
                    res.status(500).send('database error').end();
                }
            })
        }
    }

})
// 每次请求验证token是否携带并正确