const express=require('express')
const router=express.Router();
const gravatar=require('gravatar');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const passport=require('passport');
var cors=require('cors'); 

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const Products=require('../../models/Products');
const key=require('../../config/keys');
// API


router.get('/test',(req,res)=>res.json({good:"good"}))

router.post('/create',passport.authenticate('jwt',{session:false}),(req,res)=> {
	if (req.user.id) {
	// body...
		Products.findOne({productId:req.body.productId})
		.then(product =>{
			if (product) {
				return res.status(400).json({product:'Product with same id Already exists '})
			}
			else{
				const newproduct= new Products({
					productName:req.body.productName,
					productId:req.body.productId,
					productPrice:req.body.productPrice,
					productImageUrl:req.body.productImageUrl

				});
				newproduct.save()
				.then(product=>res.json(product)).catch(err=>console.log(err));
			}
		})
	}else{
		return res.status(403).json({error:'unauthorised'})
	}
})

router.get('/allProducts',passport.authenticate('jwt',{session:false}),(req,res)=> {
	if (req.user.id) {
	// body...
		Products.find({})
		.then(products =>{
			return res.status(200).json({allProducts:products})
		})
	}else{
		return res.status(403).json({error:'unauthorised'})
	}
})

router.post('/update',passport.authenticate('jwt', {session:false}),(req,res)=>{
	if (req.user.id) {
		const productFields = {};
	    if (req.body.productName) productFields.productName = req.body.productName;
	    if (req.body.productId) productFields.productId = req.body.productId;
	    if (req.body.productPrice) productFields.productPrice = req.body.productPrice;
	    if (req.body.productImageUrl) productFields.productImageUrl = req.body.productImageUrl;
		Products.findOne({ productId: req.body.productId }).then(product => {
	      if (product) {
	        // Update
	        Products.findOneAndUpdate(
	          { productId: req.body.productId },
	          { $set: productFields },
	          { new: true }
	        ).then(product => res.json(product));
	      } else {
	        // Create
	          new Products(productFields).save().then(product => res.json(product));
	      }
	    });
	}else{
		return res.status(403).json({error:'unauthorised'})
	}
})

router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
	res.json({
		id:req.user.id,
		name:req.user.name,
		email:req.user.email
	})

})



module.exports = router;