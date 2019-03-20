// 用于读取文件名及文件内容
const express=require('express')
const fs = require('fs')
const marked = require('marked')

// const dir_name = "./static/typora"  // 要读取的指定文件夹
const dir_name = "./static/data"  // 要读取的指定文件夹


// 获取指定文件夹下的所有文件
const getFileList = () => {

    return new Promise((resolve, reject) => {

        fs.readdir(dir_name, (error, files) => {

            if(error) return reject(error)

            resolve(files)
        })
    })
}

// 过滤文件夹
let getFiles = async filelist => {
    let filenames = []
    for(let file of filelist) {
        await new Promise((resolve, reject) => {
            fs.stat(`${dir_name}/${file}`, (err, stats) => {
                if(err) return reject(err)

                if(stats.isFile()) filenames.push(file)

                resolve(filenames)
            })
        })
    }
    return await filenames
}

// 读取文件内容
const readFile = async (filenames) => {
    let filedata = []
    for(let filename of filenames) {
        let obj = {}

        await new Promise((resolve, reject) => {
            fs.readFile(`${dir_name}/${filename}`, (error, data) => {

                if (error) return reject(error)

                // obj.filename = filename
                // obj.content = marked(data.toString())
                obj.content = JSON.parse(data)
                filedata.push(obj)

                resolve(filedata)
            })
        })
    }
    return await filedata
}
async function getFile() {
    try {
        const filelist = await getFileList()        //获取所有文件，包括文件夹
        const filenames = await getFiles(filelist)  //获取所有文件，过滤掉文件夹
        const data = await readFile(filenames)      //读取每个文件的内容，返回文件名及对应的内容

        return data

    } catch(e) {
        console.log('catch-------------------',e)
    }
}
module.exports = (() => {
    let router = express.Router();

    router.get('/', (req, res) => {
        getFile().then(data => {

            res.send(data).end()
        })
    });
    return router;
})();
