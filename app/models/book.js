var mongoose =  require('mongoose');

var bookSchema = mongoose.Schema({
  title : String,
  owner_id : String,
  owner_name : String,
  excerpt : String,
  image_url: String,
  trades : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trade' }],
  traded : Boolean
});

module.exports = mongoose.model('Book', bookSchema);