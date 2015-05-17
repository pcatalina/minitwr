'use strict';

module.exports = function(userService, authService) {

  var express = require('express');
  var router = express.Router();

  /*
   /api/users

   retrieve array of all users    GET     '/'          auth
   retrieve user by id            GET     '/:id        auth
   create user                    POST    '/'          auth
   update existent user by id     PUT     '/:id'       auth
   delete user by id              DELETE  '/:id'       auth, admin

   */

  router.get('/', authService.isAuthenticated, userService.index);
  router.get('/:id', authService.isAuthenticated, userService.show);
  router.post('/', userService.create);
  router.put('/:id', authService.isAuthenticated, userService.update);
  router.delete('/:id', authService.isAdmin, userService.destroy);

  return router;
};
