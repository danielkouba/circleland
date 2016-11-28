var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var drawSchema = new mongoose.Schema({
	url: { type: String, required: true },
	_user: 		{ type: Schema.Types.ObjectId, ref: 'User' }
},{
	timestamps:{
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
})

mongoose.model('Draw', drawSchema);