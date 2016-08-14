var mongoose =  require('mongoose');

var tradeSchema = mongoose.Schema({
  _book : { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  _requester : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  completed : Boolean,
  accepted : Boolean
});

module.exports = mongoose.model('Trade', tradeSchema);