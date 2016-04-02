'use strict';

var PagesController = require(process.cwd() + '/app/controllers/pages_controller.js');
var User            = require('../models/user');
var config          = require('../../config/database');

module.exports = function (app, db, jwt) {
  app.post('/api/signup', function(req, res) {
    if (!req.body.email || !req.body.password)
    {
      res.json({success: false, msg: 'Please pass email and password.'});
    }
    else 
    {
      var newUser = new User();
      newUser.local.email = req.body.email;
      newUser.local.password = newUser.generateHash(req.body.password);
      
      newUser.save(function(err) {
        if (err) {
          return res.json({success: false, msg: 'Username already exists.'});
        }
        res.json({success: true, msg: 'Successful created new user.'});
      });
    }
  });

  app.post('/api/login', function(req, res)
  {
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

      var token = jwt.encode(user, config.secret);
        
      res.json({success: true, token: 'JWT ' + token});      
    });
  });

  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });
};
