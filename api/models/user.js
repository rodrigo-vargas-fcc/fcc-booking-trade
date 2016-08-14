var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({  
  email        : { type: String, index: true, unique: true, required: true },
  password     : { type: String, required: true },
  name         : String,
  city         : String,
  state        : String  
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.getName = function() {
  return this.name ? this.name : this.email;
}

module.exports = mongoose.model('User', userSchema);