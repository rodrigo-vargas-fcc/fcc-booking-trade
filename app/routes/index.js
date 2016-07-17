'use strict';

var PagesController  = require(process.cwd() + '/app/controllers/pages_controller.js');
var UsersController  = require(process.cwd() + '/app/controllers/usersController.js');
var BooksController  = require(process.cwd() + '/app/controllers/booksController.js');
var TradesController = require(process.cwd() + '/app/controllers/tradesController.js');

var Helpers         = require('../helpers');

module.exports = function (app, jwt, passport) {
  app.post('/api/signup', UsersController.signup);

  app.post('/api/login', UsersController.login);

  app.get('/api/books', passport.authenticate('jwt', { session: false}), BooksController.getAll);

  app.post('/api/books/new', passport.authenticate('jwt', { session: false}), BooksController.new);

  app.post('/api/books/destroy', passport.authenticate('jwt', { session: false}), BooksController.destroy);

  app.post('/api/trades/propose', passport.authenticate('jwt', { session: false}), TradesController.propose);

  app.get('/api/trades/get/:bookId', passport.authenticate('jwt', { session: false}), TradesController.getOfBook);

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

