var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: {type: String, required:true},
	password: {type: String, required:true}
	// drawings: []
},{
	timestamps:{
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
})

mongoose.model('User', userSchema);