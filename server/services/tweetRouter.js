'use strict';

module.exports = function(tweetService, authService) {

  var express = require('express');
  var router = express.Router();

  /*
   /api/tweets

   retrieve array of all tweets   GET     '/'         auth
   retrieve tweet by id           GET     '/:id       auth
   create tweet                   POST    '/'         auth
   update existent tweet by id    PUT     '/:id'      auth
   delete tweet by id             DELETE  '/:id'      auth, admin

   */

  router.get('/', authService.isAuthenticated, tweetService.index);
  router.get('/:id', authService.isAuthenticated, tweetService.show);
  router.post('/', authService.isAuthenticated, tweetService.create);
  router.put('/:id', authService.isAuthenticated, tweetService.update);
  router.delete('/:id', authService.isAdmin, tweetService.destroy);

  return router;
};
