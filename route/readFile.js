// 用于读取文件名及文件内容
const express=require('express')
const fs = require('fs')
const marked = require('marked')

const dir_name = "./static/typora"  // 要读取的指定文件夹

// 读取指定文件夹前，判断该文件夹是否存在或正确
const isDirectory = () => {
    fs.stat(dir_name, (err, stats) => {
        if(err) {
            throw new Error("Incorrect folder name!", err)
        } else {
            console.log("The folder name is correct!")
            return true
        }
    })
}

const getFileList = async () => {
    let fileList = {         // 用于存放并区分文件和文件夹
        dir:[],         // 存储目录
        filename:[],    // 存储文件
    }
    // 获取指定文件夹下的所有文件（并过滤掉其它文件夹）

    fs.readdir(dir_name, (err, files) => {
        if(err) { throw new Error(err) }
        else {
            for(let i = 0; i < files.length; i++) {
                await new Promise(resolve => {
                    fs.stat(`${dir_name}/${files[i]}`, (error, stats) => {
                        if(error) { throw new Error(error) }
                        else {
                            if(stats.isDirectory()) fileList.dir.push(files[i])
                            if(stats.isFile())  fileList.filename.push(files[i])
                        }
                        resolve()
                    })
                })
            }
            console.log(fileList)
            return fileList
        }
    })
}

// 读取文件内容
const readFile = (files) => {
    console.log(files)
    return new Promise((resolve, reject) => {
        fs.readFile(`${dir_name}/${files[1]}`, function(error, data) {

            if (error) return reject(error)
            resolve(data)
        })
    })
}

module.exports = (() => {
    let router = express.Router();

    router.get('/', async (req, res) => {
            const files = await getFileList()
            const data = await readFile(files)

            res.send(marked(data.toString())).end()

    });
    return router;
});
