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

module.exports = (function() {
    let router = express.Router();

    // 星空图
    // 返回城市列表
    router.get('/star/citylist', (req, res)=>{

        db.query('SELECT * FROM citylist', (error, data) => {
            console.log(data)
        })

        fs.readFile("./static/view/star/citylist.json", function(err, data) {
            if(err) {
                throw err
            } else {
                res.send(data).end();
            }
        })
    });
    // 根据cityId来返回相应的数据
    router.get('/star/citydata', async (req, res)=>{

        let cityId = req.query.cityId
        let citydata = {}

        await new Promise((resolve, reject) => {
            fs.readFile("./static/view/star/citydata.json", (error, data) => {

                if (error) return reject(error)

                // citydata.push(JSON.parse(data))
                citydata = JSON.parse(data) //必须要对读取的文件内容data做处理

                resolve(citydata)
            })
        })

        for(let key in citydata) {

            if(cityId === key) {

                res.send(citydata[key]).end();

            }
        }
    });

    // 矩阵图
    // 返回世纪列表
    router.get('/matrix/century', (req, res)=>{

        fs.readFile("./static/view/matrix/centurylist.json", function(err, data) {
            if(err) {
                throw err
            } else {
                res.send(data).end();
            }
        })
    });
    // 返回对应世纪中的年份
    router.get('/matrix/year', async (req, res)=>{

        let centuryId = req.query.centuryId
        let year = {}

        await new Promise((resolve, reject) => {

            fs.readFile("./static/view/matrix/yearlist.json", function(error, data) {

                if (error) return reject(error)

                year = JSON.parse(data)

                resolve(year)
            })
        })

        for(let item of Object.values(year)) {

            if(item.centuryId === centuryId) {

                res.send(item).end();

            }
        }
    });
    // 返回指定年份下的日期状态
    router.get('/matrix/date', async (req, res)=>{

        let yearId = req.query.yearId
        let date = {}

        await new Promise((resolve, reject) => {

            fs.readFile("./static/view/matrix/datelist.json", function(error, data) {

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
