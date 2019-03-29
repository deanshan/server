const express = require('express')

module.exports = (function () {
  let router = express.Router();

  router.use('/admin/login/', require('./login.js'));
  router.use('/admin/register', require('./register.js'));
  router.use('/view/', require('./view.js'));
  // router.use('/', require('./readFile.js'));
  router.use('/admin/', require('./admin/index.js'));

  return router
}());