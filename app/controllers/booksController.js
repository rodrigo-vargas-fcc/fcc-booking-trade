'use strict';

var jwt           = require('jsonwebtoken');

var User          = require('../models/user');
var Book            = require('../models/book');

var Config        = require('../../config/secret');
var Helpers         = require('../helpers');

function BooksController () { }

BooksController.getAll = function(req, res) {
  var token = Helpers.getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, Config.secret);
    console.log(decoded.local);
    User.findOne({
      'local.email': decoded._doc.local.email
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
      } 
      else
      {
        Book.find(function(err, books){
          res.json({success: true, books : books});
        })
      }
    });
  } 
  else 
  {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
}

BooksController.new = function(req, res) {
  var token = Helpers.getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, Config.secret);
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
}

module.exports = BooksController;
