const express=require('express')
const fs = require('fs')
const marked = require('marked')

// let data = {
//   text: '111111111111'
// }


module.exports = (function() {
  let router = express.Router();

  router.get('/', (req, res)=>{
    let data
    let path = "es6.md"
    fs.readFile(path, function(err, data) {
      if(err) {
          throw err
      } else {
          data = marked(data.toString())
      }
    })
    res.send(data).end();
  });

  return router;
}());
