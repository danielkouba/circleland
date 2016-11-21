console.log('Step 02: Load Product Controller')


var mongoose = require('mongoose');
var Product = mongoose.model('Product');

function productsController(){
	//View all products
	this.index = function(req,res){ // app.get('/products', products.index);
		Product.find({}).exec(function(err, products){
			console.log('Step 00: productsController > index()')
			res.json(products);
		})
	}
	//Create a new product
	// app.post('/products/create', products.create);  
	//The data comes from the front end, goes through product controller, to product factory
	//Product factory calls the route '/products/create' which calls this function
	this.create = function(req,res){
		//This is a mongoose command
		Product.create(req.body, function(err,result){
			console.log('Step 01: productsController > create()')
			if(err){
				console.log('Failed to add Product');
				res.json(err);
			}else{
				console.log('Successfully added Product');
				console.log(result);
				res.json(result);
			}
		});
	};

}


module.exports = new productsController();
