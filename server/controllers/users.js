console.log('Step 02: Load User Controller')


var mongoose = require('mongoose');
var User = mongoose.model('User');

function usersController(){
	//View all products
	this.index = function(req,res){ // app.get('/products', products.index);
		User.find({}).exec(function(err, users){
			console.log('Step 00: usersController > index()')
			res.json(users);
		})
	}
	//Create a new product
	// app.post('/products/create', products.create);  
	//The data comes from the front end, goes through product controller, to product factory
	//Product factory calls the route '/products/create' which calls this function
	this.create = function(req,res){
		//This is a mongoose command
		User.create(req.body, function(err,result){
			console.log('Step 01: usersController > create()')
			if(err){
				console.log('Failed to add a User');
				res.json(err);
			}else{
				res.json(result);
			}
		});
	};

	this.login = function(req,res){
		console.log('Step 03: UserController Login()')
		User.findOne({email:req.body.email}).exec(function(err,user){
			if(user.password != req.body.password){
				res.sendStatus(400);
			}else{
				req.session.user = {
					name: user.name,
					_id: user._id
				}
				res.send(user);
			}
		})
	},
	this.delete = function(req, res){
		//your code here
		User.remove({_id: req.params.id}, function(err){
			if(err){
				console.log(err);
			}else{
				res.json({message:"Friend deleted!"})
			}
		})
	};

}


module.exports = new usersController();