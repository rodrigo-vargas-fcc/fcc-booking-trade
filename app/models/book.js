var mongoose =  require('mongoose');
var brycpt = require('bcrypt-nodejs');

var bookSchema = mongoose.Schema({
  title : String,
  ownerId : String,
  excerpt : String,
  image_url: String
});

module.exports = mongoose.model('Book', bookSchema);