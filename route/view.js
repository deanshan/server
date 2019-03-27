const express=require('express')
const fs = require('fs')
const mysql = require('mysql')

// 数据库连接池
let db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'view'
})

// 读取mysql数据

module.exports = (function() {
    let router = express.Router();

    // 返回始发城市列表
    router.get('/star/citylist', (req, res)=>{

        db.query('SELECT * FROM citydata WHERE city_id="C10000"', (error, data) => {

            res.send(data).end()
        })
    });
    // 根据cityId来返回相应的数据
    router.get('/star/citydata', async (req, res)=>{

        let cityId = req.query.cityId

        db.query(`SELECT * FROM citydata WHERE city_id='${cityId}'`, (error, data) => {

            res.send(data).end()
        })
    });

    router.get('/matrix/century', (req, res)=>{

        db.query(`SELECT * FROM yearlist WHERE centuryId='SJ00000'`, (error, data) => {

            res.send(data).end()
        })
    });
    // 返回对应世纪中的年份
    router.get('/matrix/year', (req, res)=>{

        let centuryId = req.query.centuryId

        db.query(`SELECT * FROM yearlist WHERE centuryId='${centuryId}'`, (error, data) => {

            res.send(data).end()
        })
    });
    // 返回指定年份下的日期状态(数据太大，通过读取文件来获取)
    router.get('/matrix/date', async (req, res)=>{

        let yearId = req.query.yearId
        let date = {}

        await new Promise((resolve, reject) => {

            fs.readFile("./static/data/datelist.json", function(error, data) {

                if (error) return reject(error)

                date = JSON.parse(data)

                resolve(date)
            })
        })

        for(let item of Object.values(date)) {

            for(let key in item) {

                if(yearId === key) {

                    res.send(item[key]).end();

                }
            }
        }
    });

    return router;
}());


// 读取文件数据返回到客户端

// module.exports = (function() {
//     let router = express.Router();

//     router.get('/star/citylist', (req, res)=>{

//         // fs.readFile("./static/view/star/citylist.json", function(err, data) {
//         //     if(err) {
//         //         throw err
//         //     } else {
//         //         res.send(data).end();
//         //     }
//         // })
//     });

//     router.get('/star/citydata', async (req, res)=>{

//         let cityId = req.query.cityId
//         let citydata = {}

//         await new Promise((resolve, reject) => {
//             fs.readFile("./static/view/star/citydata.json", (error, data) => {

//                 if (error) return reject(error)

//                 // citydata.push(JSON.parse(data))
//                 citydata = JSON.parse(data) //必须要对读取的文件内容data做处理

//                 resolve(citydata)
//             })
//         })

//         for(let key in citydata) {

//             if(cityId === key) {

//                 res.send(citydata[key]).end();

//             }
//         }
//     });

//     router.get('/matrix/century', (req, res)=>{

//         fs.readFile("./static/view/matrix/centurylist.json", function(err, data) {
//             if(err) {
//                 throw err
//             } else {
//                 res.send(data).end();
//             }
//         })
//     });

//     router.get('/matrix/year', async (req, res)=>{

//         let centuryId = req.query.centuryId
//         let year = {}

//         db.query(`SELECT * FROM citydata WHERE city_id='${cityId}'`, (error, data) => {

//             res.send(data).end()
//         })

//         await new Promise((resolve, reject) => {

//             fs.readFile("./static/view/matrix/yearlist.json", function(error, data) {

//                 if (error) return reject(error)

//                 year = JSON.parse(data)

//                 resolve(year)
//             })
//         })

//         for(let item of Object.values(year)) {

//             if(item.centuryId === centuryId) {

//                 res.send(item).end();

//             }
//         }
//     });
//     // 返回指定年份下的日期状态
//     router.get('/matrix/date', async (req, res)=>{

//         let yearId = req.query.yearId
//         let date = {}

//         await new Promise((resolve, reject) => {

//             fs.readFile("./static/view/matrix/datelist.json", function(error, data) {

//                 if (error) return reject(error)

//                 date = JSON.parse(data)

//                 resolve(date)
//             })
//         })

//         for(let item of Object.values(date)) {

//             for(let key in item) {

//                 if(yearId === key) {

//                     res.send(item[key]).end();

//                 }
//             }
//         }
//     });

//     return router;
// }());
