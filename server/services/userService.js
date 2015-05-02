'use strict';

module.exports = function(mongoose) {

  var userSchema = {
    username: String,
    email: String,
    password: String
  };

  var user = mongoose.model('userModel', userSchema);


  return {
    addUser: function(username, email, password) {

      var user = new user({
        username: username,
        email: email,
        password: password()
      });

      user.save(function(err) {
        if(err)
          console.log(err);
      });
    },

    register: function(req, res, next) {
      var user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      };

      user.addUser(user);

      res.redirect('/tweets');
    }
  };
};

