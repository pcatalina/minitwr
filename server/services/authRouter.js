'use strict';

module.exports = function(authService) {

  var express = require('express');
  var router = express.Router();

  /*
   /api/auth

   authenticate user              POST   '/'

   */

  router.post('/', authService.authenticate);

  return router;
};
