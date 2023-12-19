const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type:String,required:true,min:4},
  desc: { type:String,required:true,min:8},
  userId: { type:String, required:true },
price:{type:Number,required:true},
img:{ type:String, required:true},
review:{type:Number,required:true},
category:{ type:String, required:true}
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
