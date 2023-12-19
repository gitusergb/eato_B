const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: { type:String,required:true,unique:true},
  email: { type:String,required:true,unique:true},
  password: { type:String,required:true,min:6,max:16},
  isAdmin:{type:Boolean,default:false},
  city: { type:String,required:false},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
