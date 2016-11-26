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
	// this.register = function(req,res){
	// 	console.log('>> server >> controllers >> user.js >> register: ')
	// 	if(req.body.password != req.body.pw_confirm){
	// 		res.sendStatus(400);
	// 	}else{
	// 		var user = new User(req.body);
	// 		user.save(function(err,user){
	// 			if(err){
	// 				res.sendStatus(500);
	// 			}else{
	// 				req.session.user = {
	// 					name:user.name,
	// 					_id: user._id
	// 				}
	// 				res.sendStatus(200)
	// 			}
	// 		});
	// 	}
	// }


	this.register = function(req,res){ // called by server routes >> app.post('/create', users.create); 
		console.log('Step 06: server user controller >> create');
		User.create(req.body, function(err, result){
			if(err){
				console.log('There were validation errors', err);
				res.json(err);
			} else {
				console.log('Successfully added a user!');
				res.json(result);
			}
		});
	};




	this.login = function(req,res){
		console.log('Step 03: UserController Login()')


		//define error message
		var errors = {errors:{
			general: 'Invalid login information'
		}}


		User.findOne({email:req.body.email}).exec(function(err,user){
			
			if(!req.body.password || !req.body.email || !user){
				console.log(errors);
				res.json(errors);
			} else{
				if(user.password != req.body.password){
					console.log(errors);
					res.json(errors);
				}else{
					req.session.user = {
						name: user.name,
						_id: user._id
					}
					res.send(user);
				}
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