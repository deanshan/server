const express = require('express')

module.exports = (function () {
  let router = express.Router();

  // router.use('/', require('./web.js'));
  router.use('/', require('./readFile.js'));
  router.use('/admin/', require('./admin/index.js'));

  return router
}());