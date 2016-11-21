//To get error reports, include this at the top of your server.js
"use strict";

//These are the requirements for a node project
var mongoose = require('mongoose'), 		//mongodb interaction
	express = require('express'),   		//express routing
	session = require('express-session'), 	//sessions
	bp		= require('body-parser'), 		//request body parser
	path 	= require('path'),				//easy file path
	root	= __dirname,					//current file path
	port 	= process.env.PORT || 8000,		//define port
	app 	= express();					//start a new express app

//configure session
var sessionConfig = {
	secret:'CookieMonster',
	resave:false,
	saveUninitialized:true,
	name:'myCookie',
	cookie:{
		secure: false,
		httpOnly:false,
		maxAge: 3600000
	}
}



app.use(bp.urlencoded({extended:true}));
app.use(bp.json({extended:true}));
app.use(express.static(path.join(root,'client')));
app.use(session(sessionConfig));

//start using mongoose
require('./server/config/mongoose.js');
//include routes in your app
require("./server/config/routes.js")(app);

//Start server
app.listen(port, function(){
	console.log('Step 04: Server running on port: '+port)
})