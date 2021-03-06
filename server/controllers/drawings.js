console.log('Step 02: Load Drawings Controller')

var mongoose = require('mongoose');
var base64  = require('base64-js');
var fs 		= require('fs');
var path 	= require('path');
var root	= __dirname;
var Draw = mongoose.model('Draw');
var User = mongoose.model('User');




//This is what the session user looks like
	// req.session.user = {
	// 	name: user.name,
	// 	_id: user._id
	// }





function drawingsController(){
	//View all drawings
	this.index = function(req,res){ // app.get('/products', products.index);
		Draw.find({}, false, true).populate('_user').exec(function(err, drawings){
			console.log('Step 00: drawingsController > index()')
			
			//Cleanse of any sensitive data
			var data = [];
			for (idx in drawings){
				data.push({
					_id: drawings[idx]._id,
					created_at: drawings[idx].created_at,
					url: drawings[idx].url,
					_user: {
						_id: drawings[idx]._user._id,
						name: drawings[idx]._user.name
					}
				})
			}
			console.log(data)
			res.json(data);
		})
	}

	//Create a new product
	// app.post('/products/create', products.create);  
	//The data comes from the front end, goes through product controller, to product factory
	//Product factory calls the route '/products/create' which calls this function
	this.create = function(req,res){
		//This is a mongoose command
		console.log('/////Creating New Image');
		// Set up File Path
		var saveBase = "/images/"+filename()+".png";
		var saveLoc = path.join(root, "../../client/assets"+ saveBase);
		// Format Base64 to Byte Array, Then from Base64 to binary
		var base64Data = base64.toByteArray(req.body.data);
		var binaryData  =   new Buffer(base64Data, 'base64').toString('binary');
		//Save out file
		fs.writeFile(saveLoc, binaryData, "binary", function(err) {
		   	if(err) {
		        console.log(err);
		    }
    		// res.json('We got it.')
		    console.log("The file was saved!");
		}); 


		var newDrawing = new Draw();
		newDrawing._user = req.session.user._id;
		newDrawing.url = saveBase;
		newDrawing.save(function(err,result){
			console.log('Step 01: drawingController > create()')
			if(err){
				console.log('Failed to add Drawing');
				res.json(err);
			}else{
				User.findOne({ _id: req.session.user._id }).exec(function(err,user){ //find gallery user
					if(err){
						res.json(err)
					}else{
						user.images.push(newDrawing._id); //Push the image id to the user
						user.save(function(err,results){
							if(err){
								res.json(err)
							}else{
								console.log('Successfully added Drawing');
								console.log(result);
								res.json(result);
							}
						})
					}
				})
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
