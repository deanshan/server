const express=require('express')
const fs = require('fs')

module.exports = (function() {
    let router = express.Router();

    // 星空图
    router.get('/star', (req, res)=>{

        fs.readFile("./static/view/star.json", function(err, data) {
            if(err) {
                throw err
            } else {
                res.send(data).end();
            }
        })
    });

    // 矩阵图
    router.get('/matrix', (req, res)=>{
        console.log(req.query)
        fs.readFile("./static/view/matrix.json", function(err, data) {
            if(err) {
                throw err
            } else {
                res.send(data).end();
            }
        })
    });

    return router;
}());
