const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true }, // unique doesn't adds the unique validator, only for optimizations
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator); // uniqueValidator now validates unique

module.exports = mongoose.model('User', userSchema);
