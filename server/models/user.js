var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	name: { type: String, required: true },
},{
	timestamps:{
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
})

mongoose.model('User', userSchema);