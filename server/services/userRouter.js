'use strict';

module.exports = function(userService) {

  var express = require('express');
  var router = express.Router();

  router.get('/', userService.index);
  router.get('/:id', userService.show);
  router.post('/', userService.create);
  router.put('/:id', userService.update);
  router.delete('/:id', userService.destroy);

  return router;
};
