'use strict';

module.exports = function(tweetService) {

  var express = require('express');
  var router = express.Router();

  router.get('/', tweetService.index);
  router.get('/:id', tweetService.show);
  router.post('/', tweetService.create);
  router.put('/:id', tweetService.update);
  router.delete('/:id', tweetService.destroy);

  return router;
};
