'use strict';

module.exports = function(authService) {

  var express = require('express');
  var router = express.Router();

  router.post('/', authService.authenticate);

  return router;
};
