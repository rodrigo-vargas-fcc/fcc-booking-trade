'use strict';

function pages_controller () {  
  this.home = function (req, res) {      
    res.render('pages/home');
  }

  this.login = function (req, res) {      
    res.render('pages/login');
  }

  this.signup = function (req, res) {      
    res.render('pages/signup');
  }

  this.books = function (req, res) {      
    res.render('pages/books');
  }

  this.book = function (req, res) {      
    res.render('pages/book');
  }
}

module.exports = pages_controller;
