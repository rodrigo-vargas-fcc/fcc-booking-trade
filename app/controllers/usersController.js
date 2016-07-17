'use strict';

var jwt           = require('jsonwebtoken');

var User          = require('../models/user');
var Config        = require('../../config/secret');

function UsersController () { }

UsersController.login = function(req, res) {
  var query = { 'local.email': req.body.email };
  User.findOne(query, function(err, user) {
    if (err) 
      throw err;

    if (!user)
    {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
      return;
    } 
    
    if (!user.validPassword(req.body.password))
    {
      res.send({success: false, msg: 'Authentication failed. Wrong password.'});
      return;
    }

    var token = jwt.sign(user, Config.secret);
      
    res.json({success: true, token: 'JWT ' + token});      
  });
}

UsersController.signup = function(req, res) {
  if (!req.body.email || !req.body.password)
  {
    res.json({success: false, msg: 'Please pass email and password.'});
  }
  else 
  {
    var newUser = new User();
    newUser.local.name = req.body.email;
    newUser.local.email = req.body.email;
    newUser.local.password = newUser.generateHash(req.body.password);
    
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }

      var token = jwt.sign(newUser, Config.secret);

      res.json({  success: true, 
                  msg: 'Successful created new user.',
                  token :'JWT ' + token });
    });
  }
}

module.exports = UsersController;
