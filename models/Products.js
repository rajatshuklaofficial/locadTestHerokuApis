const mongoose=require('mongoose');
const Schema=mongoose.Schema;



// creating schema
const ProductSchema = new Schema({
	productName:{
		type:String,
		required:true,
		unique: true
	},
	productId:{
		type:String,
		required:true,
		unique: true
	},
	productPrice:{
		type:String,
		required:true,
	},
	productImageUrl:{
		type:String,
		required:true,
	},
	date:{
		type:Date,
		default:Date.now
	},
})

module.exports=Product = mongoose.model('products',ProductSchema);
