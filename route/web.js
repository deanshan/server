const express=require('express')
const fs = require('fs')
const marked = require('marked')

module.exports = (function() {
  let router = express.Router();

  router.get('/', (req, res)=>{
    fs.readFile("./static/mdfile/es6.md", function(err, data) {
      if(err) {
          throw err
      } else {
          res.send(marked(data.toString())).end();
      }
    })
  });
  return router;
}());
