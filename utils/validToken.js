const mysql = require('mysql')

// 数据库连接池
let dbView = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'view'
})
let dbAdmin = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'admin'
})

// 处理token是否携带，是否存在，是否有效
function validToken (token) {
    let time = new Date().getTime()
    let result = {
        status: 200,
        msg: ''
    }

    return new Promise((resolve, reject) => {

        // 未携带token或携带的token为空
        if(!token) {

            result = { status: 403, msg: 'Token Error' }    //403:服务器拒绝请求
        } else {

            dbAdmin.query(`SELECT * FROM token_table WHERE token='${token}'`, (error, data) => {
                if(error) {

                    result = { status: 500, msg: 'database error' }
                    reject(error)
                } else {

                    if(data.length === 0) {

                        result = { status: 404, msg: 'Database token no exist' } //404: 服务器找不到请求的数据
                        reject(result)
                    } else {

                        let diff = Math.floor((Number(time) - Number(data[0].time)) / 60 / 1000)

                        if(diff < 20) {

                            resolve(result)
                        } else {

                            result = { status: 401, msg: 'Token out of date' }  //401：用户验证
                            reject(result)
                        }
                    }
                }
            })
        }
    })
}

module.exports = (function() {

    async function exception (SQL, req, res) {
        try {
            await validToken(req.headers.token)
            dbView.query(SQL, (error, data) => {

                if(error) res.send('database error').end()
                else res.send(data).end()
            })
        } catch(error) {

            res.status(error.status).send(error.msg).end()
        }
    }

    return exception
}());