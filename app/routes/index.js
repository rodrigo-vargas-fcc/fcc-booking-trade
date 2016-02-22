'use strict';

var PagesController = require(process.cwd() + '/app/controllers/pages_controller.js');

module.exports = function (app, db) {
  var pagesController = new PagesController();
  app.get('/', pagesController.home);

  app.get('/login', pagesController.login)
  app.get('/signup', pagesController.signup)
  app.get('/books', pagesController.books)
  app.get('/user/books/book', pagesController.book)
};