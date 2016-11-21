console.log('Step 01: Configure Mongoose db with mongoose.js')

var mongoose = require('mongoose'),
	fs		 = require('fs'),
	path	 = require('path'),
	models_path = path.join( __dirname, '../models'),
	reg		 = new RegExp( ".js$", "i"),
	dbURI	 = 'mongodb://localhost/meanstore';


mongoose.connect( dbURI );


/*
*  CONNECTION EVENTS
*  When successfully connected
*/
mongoose.connection.on( 'connected', function () {
  console.log( `Mongoose default connection open to ${ dbURI }` );
});
/*
*  If the connection throws an error
*/
mongoose.connection.on( 'error', function ( err ) {
  console.error( `Mongoose default connection error: ${ err }` );
});
/*
*  When the connection is disconnected
*/
mongoose.connection.on( 'disconnected', function () {
  console.log( 'Mongoose default connection disconnected' );
});
/*
*  If the Node process ends, close the Mongoose connection
*/
process.on( 'SIGINT', function() {
  mongoose.connection.close( function () {
    console.log( 'Mongoose default connection disconnected through app termination' );
    process.exit( 0 );
  });
});

fs.readdirSync( models_path ).forEach( function( file ){
	if( reg.test( file ) ){
		require( path.join( models_path, file ) );
	}
});