const express = require('express')

module.exports = (function () {
  let router = express.Router();

  router.use('/admin/', require('./admin/index.js'));
  router.use('/view/', require('./view/view.js'));

  return router
}());