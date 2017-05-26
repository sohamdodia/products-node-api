const mongoose = require('mongoose');
// let {mongoose} = require('../db/mongoose');
const Seller = mongoose.model('Seller', {
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 1
	},
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: 1
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
	token: {
		type: String
	},
	token_expires_at: {
		type: Number
	}
});

module.exports = {Seller};
