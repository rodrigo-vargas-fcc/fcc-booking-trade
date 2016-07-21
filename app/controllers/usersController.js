'use strict';

var jwt           = require('jsonwebtoken');

var User          = require('../models/user');
var Config        = require('../../config/secret');
var Helpers       = require('../helpers');

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
      
    var user = { name : user.getName(), token : 'JWT ' + token };

    return res.json({ success: true, user: user });      
  });
}

UsersController.signup = function(req, res) {
  if (!req.body.email || !req.body.password)
    return res.json({success: false, msg: 'Please pass email and password.'});
  
  var newUser = new User();
  newUser.local.name = req.body.email;
  newUser.local.email = req.body.email;
  newUser.local.password = newUser.generateHash(req.body.password);
  
  newUser.save(function(err) {
    if (err) {
      return res.json({success: false, msg: 'Username already exists.'});
    }

    var token = jwt.sign(newUser, Config.secret);

    var user = { name : newUser.getName(), token : 'JWT ' + token };

    return res.json({  success: true, 
                msg: 'Successful created new user.',
                user : user });
  });  
}

UsersController.update = function(req, res) {
  var token = Helpers.getToken(req.headers);
  if (!token)
    return res.status(403).send({success: false, msg: 'No token provided.'});

  var decoded = jwt.decode(token, Config.secret);

  User.findOne({
    'local.email': decoded._doc.local.email
  }, function(err, user) {
    if (err) 
      throw err;

    user.local.city = req.body.user.city;
    user.local.state = req.body.user.state;
    user.local.name = req.body.user.name;

    user.save();

    return res.json({success: true});
  });
}

UsersController.getCurrent = function(req, res) {
  var token = Helpers.getToken(req.headers);
  if (!token)
    return res.status(403).send({success: false, msg: 'No token provided.'});

  var decoded = jwt.decode(token, Config.secret);

  User.findOne({
    'local.email': decoded._doc.local.email
  },
  function(err, user) {
    if (err) 
      throw err;

    var returnedUser =  { 
                          name : user.getName(), 
                          state : user.local.state, 
                          city : user.local.city
                        };

    return res.json({success: true, user : returnedUser });
  });
}

module.exports = UsersController;
