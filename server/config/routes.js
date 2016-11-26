var path		= require('path'),
	products	= require('../controllers/products.js');
	users		= require('../controllers/users.js');
	draw		= require('../controllers/drawings.js');

console.log("Step 03: Server Side Routes");

module.exports = function(app){
	app.get('/products', products.index);			//View all products
	app.post('/products/create', products.create);  //Create a new product
	app.get('/users', users.index);					//View all users
	app.post('/users/create', users.register);  //Create a new user
	app.post('/users/login', users.login);  //Login a user
	app.get('/users/:id', users.delete);  //Delete a user
	app.post('/draw/create', draw.create); //Create a drawing
	app.get('/draw', draw.index); //Create a drawing
}