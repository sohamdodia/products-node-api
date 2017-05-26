const auth = require('../auth');
const {Product} = require('../models/product');

const POST = (request, response) => {
	const value_list = ['name','actual_price','selling_price','units_in_stock','category_id'];
	let send_list = [];
	for(let i = 0; i < value_list.length; i++) {
		let check = request.body[value_list[i]];
		if(check == '' || check == null) {
			send_list.push(value_list[i]);
		}
	}

	if(send_list.length > 0) {
		return response.status(400).send({
			status: false,
			error: 'missing parameters',
			parameters: send_list
		});
	}

	let rating = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
	let number_of_ratings = Math.floor(Math.random() * (500 - 300 + 1)) + 300;
	let number_of_reviews = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
	let name = request.body.name;
	let actual_price = request.body.actual_price;
	let selling_price = request.body.selling_price;
	let units_in_stock = request.body.units_in_stock;
	let category_id = request.body.category_id;

	auth(request, response, () => {
		let product = new Product({
			name: name,
			actual_price: actual_price,
			selling_price: selling_price,
			units_in_stock: units_in_stock,
			rating: rating,
			number_of_ratings: number_of_ratings,
			number_of_reviews: number_of_reviews,
			category_id: category_id,
			seller_id: request.seller.id
		});

		product.save().then((product) => {
			response.status(200).send({
				status: true,
				product: product
			});
		}).catch((error) => {
			console.log(error);
			response.status(400).send(error);
		});
	});
};

module.exports = {
	POST
};
