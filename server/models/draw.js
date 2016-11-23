var mongoose = require('mongoose');

var drawSchema = new mongoose.Schema({
	url: { type: String, required: true },
},{
	timestamps:{
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
})

mongoose.model('Draw', drawSchema);