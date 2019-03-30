const express = require('express')

module.exports = (function () {
  let router = express.Router();

  router.use('/login/', require('./login.js'));
  router.use('/register/', require('./register.js'));

  return router
}());