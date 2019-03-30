const mysql = require('mysql')
// const md5 = require('../../utils/md5')

// 数据库连接池
let dbAdmin = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'admin'
})

module.exports = {
    // randomToken: (res) => {

    //     dbAdmin.query(`SELECT * FROM token_table`, (error, data) => {
    //         if(error) {
    //             res.status(500).send('database error').end();
    //         } else {

    //             let token = md5.MD5(Math.random() + md5.MD5_SUFFIX);
    //             let time = new Date().getTime()

    //             if(data.length === 0) { // 数据库不存在token，添加
    //                 dbAdmin.query(`INSERT INTO token_table(token,time) VALUES('${token}','${time}')`, (err, data) => {
    //                     if(err){
    //                         res.status(500).send('database error').end();
    //                     } else {
    //                         res.status(200).send(token).end()
    //                     }
    //                 })
    //             } else {    // 数据库已存在token，替换
    //                 dbAdmin.query(`UPDATE token_table SET token='${token}'`, (err, data) => {
    //                     if(err){
    //                         res.status(500).send('database error').end();
    //                     } else {
    //                         res.status(200).send(token).end()
    //                     }
    //                 })
    //             }
    //         }
    //     })
    // },
    valid: (req) => {
        let time = new Date().getTime()
        let token = req.headers.token

        dbAdmin.query(`SELECT * FROM token_table WHERE token='${token}'`, (error, data) => {

            let diff = (Number(time) - Number(data[0].time)) / 60 / 1000
            console.log(diff)
        })
    }
}