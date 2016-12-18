var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
	name: { type: String, required: true, trim: true },
	email: {type: String, required:true, trim: true, unique: true},
	password: {
		type: String,
		required: true,
		minlength: 8,
		maxlength: 32,
		validate: {
			validator: function( value ) {
				//1 number, 1 UpperCase, 1 LowerCase, 1 Special between 8 and 32 characters
				return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( value );
			},
				message: "Password failed validation, you must have at least 1 number, uppercase and special character"
		}
	},
	images: [{ type: Schema.Types.ObjectId, ref: 'Draw'}],
	admin: {type: Boolean, default: false}
},{
	timestamps:{
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
})



userSchema.pre('save', function(next){
    var user = this;
    if (!user.isModified('password')) return next();
 
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);
 
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);
 
            user.password = hash;
            next();
        });
    });
});


mongoose.model('User', userSchema);