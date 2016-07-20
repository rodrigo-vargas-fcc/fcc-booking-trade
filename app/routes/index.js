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

  app.post('/api/trades/destroy/:tradeId', passport.authenticate('jwt', { session: false}), TradesController.destroy);

  app.post('/api/trades/accept/:tradeId', passport.authenticate('jwt', { session: false}), TradesController.accept);

  app.post('/api/users/update', passport.authenticate('jwt', { session: false}), UsersController.update);

  app.get('/api/users/getCurrent', passport.authenticate('jwt', { session: false}), UsersController.getCurrent);

  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });
};

