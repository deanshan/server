const express = require('express')

module.exports = (function () {
  let router = express.Router();

  router.use('/view/', require('./view.js'));
  // router.use('/', require('./readFile.js'));
  router.use('/admin/', require('./admin/index.js'));

  return router
}());