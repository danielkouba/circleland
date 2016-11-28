var path		= require('path'),
	users		= require('../controllers/users.js');
	draw		= require('../controllers/drawings.js');

console.log("Step 03: Server Side Routes");


//Logged in Authentication
function loginAuthentication(req,res,next){
	if (req.session.user){
		next();
	}else{
		res.status(401).send("Not Authorized");
	}
}



module.exports = function(app){
	app.post('/users/create', users.register);  	//Create a new user
	app.post('/users/login', users.login);  		//Login a user
	app.get('/draw', draw.index); 					//Get all drawings
	app.get('/users', users.index);					//View all users
	app.get('/users/:id/gallery', users.drawings);	//View users drawings
	app.use(loginAuthentication);				//AUTHENTICATE ALL OF THE BELOW ROUTES
	app.post('/draw/create', draw.create); 			//Create a drawing
	app.get('/users/:id/delete', users.delete);  	//Delete a user
}