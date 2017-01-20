console.log('Step 02: Load User Controller')


var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var User = mongoose.model('User');
var Draw = mongoose.model('Draw');


function usersController(){
	//View all users
	this.index = function(req,res){ // app.get('/products', products.index);
		User.find({}).exec(function(err, users){
			console.log('Step 00: usersController > index()')
			// console.log(users)
			var newUserData = []

			for (idx in users){
				console.log("this is one user:",users[idx])
				newUserData.push({
					name: users[idx].name,
					_id: users[idx]._id,
					admin: users[idx].admin
				})
			}

			res.json(newUserData);
		})
	}

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
		User.create(req.body, function(err, result){
			if(err){
				console.log('There were validation errors', err);
				res.json(err);
			} else {
				res.json(result);
			}
		});
	};


	this.drawings = function(req,res){
		User.findOne({_id: req.params.id }, false, true).populate('images').exec(function(err, drawings){
			var data = {
				name: drawings.name,
				quantity: drawings.images.length,
				images: drawings.images
			}

			res.json(data);
		})
	}
	



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
				bcrypt.compare( req.body.password, user.password, function(err) {
					if(err){
						console.log(err);
						res.json(err);
					}
				});
				req.session.user = {
					name: user.name,
					_id: user._id
				}
				var userdata = {
					name: user.name,
					_id: user._id,
					admin: user.admin	
				}

				res.send(userdata);
			}
		})
	},
	this.logout = function(req,res){
		req.session.user = {};
		res.send("You successfully logged out")
	}
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