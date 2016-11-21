var path		= require('path'),
	products	= require('../controllers/products.js');
	users		= require('../controllers/users.js');

console.log("Step 03: Server Side Routes");

module.exports = function(app){
	app.get('/products', products.index);			//View all products
	app.post('/products/create', products.create);  //Create a new product
	app.get('/users', users.index);					//View all user
	app.post('/users/create', users.create);  //Create a new product
	app.get('/users/:id', users.delete);  //Create a new product
}