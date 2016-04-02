'use strict';

var PagesController = require(process.cwd() + '/app/controllers/pages_controller.js');
var User            = require('../models/user');
var Book            = require('../models/book');
var config          = require('../../config/database');
var Helpers         = require('../helpers');


module.exports = function (app, db, jwt, passport) {
  var helpers = new Helpers();

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

  app.get('/api/books', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = helpers.getToken(req.headers);
    if (token) {
      var decoded = jwt.decode(token, config.secret);
      User.findOne({
        'local.email': decoded.local.email
      }, function(err, user) {
        if (err) throw err;
 
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } 
        else
        {
          Book.find(function(err, books){
            console.log(books);
            res.json({success: true, email : user.local.email, books : books});
          })
        }
      });
    } 
    else 
    {
      return res.status(403).send({success: false, msg: 'No token provided.'});
    }
  });

  app.post('/api/books/new', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = helpers.getToken(req.headers);
    if (token) {
      var decoded = jwt.decode(token, config.secret);
      User.findOne({
        'local.email': decoded.local.email
      }, function(err, user) {
        if (err) 
          throw err;
 
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } 
        else
        {
          var book = new Book( { title : req.body.name,
                                 ownerId : user._id,
                                 excerpt : 'Blablu',
                                 image_url : 'gluglu' });
          
          book.save(function(err){
            if (err) 
              throw err;
            res.json({success: true});
          })
        }
      });
    } 
    else 
    {
      return res.status(403).send({success: false, msg: 'No token provided.'});
    }
  });

  app.get('/api/user', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = helpers.getToken(req.headers);
    if (token) {
      var decoded = jwt.decode(token, config.secret);
      User.findOne({
        'local.email': decoded.local.email
      }, function(err, currentUser) {
        if (err) 
          throw err;
 
        if (!currentUser) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } 
        else
        {
          User.findOne( { _id : req.query.userId}, function(err, user){
            if (err) 
                throw err;

            Book.find({ ownerId : user._id}, function(err, userBooks){
              if (err) 
                throw err;

              res.json({ success: true, 
                         user : {
                                  email : user.local.email,
                                  books : userBooks
                                }
              });
            });
          });
        }
      });
    } 
    else 
    {
      return res.status(403).send({success: false, msg: 'No token provided.'});
    }
  });

  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });
};

