'use strict';

var bodyParser = require('body-parser');
var express    = require('express');
var jwt        = require('jwt-simple');
var morgan     = require('morgan');
var passport   = require('passport');
var mongoose   = require('mongoose');

var routes     = require('./app/routes/index.js');

var app        = express();
var mongoUrl = process.env.MONGOLAB_URI || "mongodb://localhost:27017/rvg-book-trading";
var port = process.env.PORT || 3000;

app.use(morgan('dev'));

mongoose.connect(mongoUrl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   
   console.log('Successfully connected to MongoDB on ' + mongoUrl);

   // Express Configuration

   app.use(express.static(__dirname + '/public'));   
   app.use('/models', express.static(process.cwd() + '/app/models'));
   app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
   app.use( bodyParser.json() );
   app.use(bodyParser.urlencoded({
      extended: true
   }));

   require('./config/passport')(passport);
   
   routes(app, db, jwt);

   app.listen(3000, function () {
      console.log('Node.js listening on port 3000...');
   });
});
