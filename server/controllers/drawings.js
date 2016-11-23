console.log('Step 02: Load Drawings Controller')

var mongoose = require('mongoose');
var base64  = require('base64-js');
var fs 		= require('fs');
var path 	= require('path');
var root	= __dirname;
var Draw = mongoose.model('Draw');

function drawingsController(){
	//View all drawings
	this.index = function(req,res){ // app.get('/products', products.index);
		Draw.find({}).exec(function(err, drawings){
			console.log('Step 00: drawingsController > index()')
			res.json(drawings);
		})
	}
	//Create a new product
	// app.post('/products/create', products.create);  
	//The data comes from the front end, goes through product controller, to product factory
	//Product factory calls the route '/products/create' which calls this function
	this.create = function(req,res){
		//This is a mongoose command


		console.log('/////Creating New Image');
		var saveBase = "../images/"+filename()+".png";
		var saveLoc = path.join(root, saveBase);
		var base64Data = base64.toByteArray(req.body.data);
		// var img = req.body.data;
		// console.log(img[0])

		var binaryData  =   new Buffer(base64Data, 'base64').toString('binary');

		console.log(root);
		fs.writeFile(saveLoc, binaryData, "binary", function(err) {
		   	if(err) {
		        console.log(err);
		    }
    		// res.json('We got it.')
		    console.log("The file was saved!");
		}); 


		var newDrawing = new Draw();
		newDrawing.url = saveBase;

		newDrawing.save(function(err,result){
			console.log('Step 01: drawingController > create()')
			if(err){
				console.log('Failed to add Drawing');
				res.json(err);
			}else{
				console.log('Successfully added Drawing');
				console.log(result);
				res.json(result);
			}
		});
	};


	function filename(){
		var dateObj = new Date();
		var month = dateObj.getUTCMonth() + 1; //months from 1-12
		var day = dateObj.getUTCDate();
		var year = dateObj.getUTCFullYear();
		var time = [ dateObj.getHours(), dateObj.getMinutes(), dateObj.getSeconds() ].join(':');
		var newfilename = year + "-" + month + "-" + day + '_' + time + '-';
		for(var i = 0; i < 3; i++){newfilename += Math.floor(Math.random()*10)};
		return newfilename
	}

}


module.exports = new drawingsController();
