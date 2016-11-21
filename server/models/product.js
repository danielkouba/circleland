//Always require mongoose at the top
var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	quantity: { type: String, required: true}
},{
	timestamps:{
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
})

mongoose.model('Product', productSchema);