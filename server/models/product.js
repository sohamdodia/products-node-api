const mongoose = require('mongoose');

const Product = mongoose.model('Product',{
	name: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	actual_price: {
		type: Number,
		required: true,
		trim: true
	},
	selling_price: {
		type: Number,
		required: true,
		trim: true
	},
	units_in_stock: {
		type: Number,
		required: true,
		trim: true
	},
	rating: {
		type: Number,
		trim: true
	},
	number_of_ratings: {
		type: Number,
		trim: true
	},
	number_of_reviews: {
		type: Number,
		trim: true
	},
	category_id: {
		type: Number,
		required: true,
		trim: true
	},
	seller_id: {
		type: String,
		trim: true
	}
});

module.exports = {Product};
