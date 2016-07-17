'use strict';

var jwt           = require('jsonwebtoken');

var User          = require('../models/user');
var Book          = require('../models/book');

var Config        = require('../../config/secret');
var Helpers       = require('../helpers');

function BooksController () { }

BooksController.getAll = function(req, res) {
  var token = Helpers.getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, Config.secret);
    
    User.findOne({
      'local.email': decoded._doc.local.email
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
      } 
      else
      {
        Book.find({})
       .populate('trades')
       .exec(function(err, books) {
          var booksReturned = [];

          books.forEach(function(book){
            var yetProposed = false;
            book.trades.forEach(function(trade){
              if (trade._requester.toString() == user._id.toString())
                yetProposed = true;
            });

            booksReturned.push({  
                                  _id : book._id,
                                  owner_name : book.owner_name,
                                  yet_proposed : yetProposed,
                                  owner_id : book.owner_id,
                                  image_url : book.image_url,
                                  title : book.title,
                                  trades : book.trades
                                });
          });

          res.json({success: true, books : booksReturned});
        });
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
      'local.email': decoded._doc.local.email
    }, function(err, user) {
      if (err) 
        throw err;

      if (!user) {
        return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
      } 
      else
      {
        var ownerName = user.getName();
        
        var book = new Book( { 
                                title : req.body.name,
                                owner_id : user._id,
                                owner_name : ownerName,
                                image_url : req.body.image_url });
        
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

BooksController.destroy = function(req, res) {
  var token = Helpers.getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, Config.secret);
    User.findOne({
      'local.email': decoded._doc.local.email
    }, function(err, user) {
      if (err) 
        throw err;

      if (!user) {
        return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
      } 
      else
      {
        Book.find({ _id: req.body.id }).remove().exec(function (err, book) {
          if (err) 
            throw err;
          
          return res.json({success: true});
        });
      }
    });
  } 
  else 
  {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
}

module.exports = BooksController;
