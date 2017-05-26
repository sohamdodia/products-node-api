const auth = require('../auth');
const {Product} = require('../models/product');

const GET = (request, response) => {
	auth(request, response, () => {
		Product.find().then((products) => {
			response.status(200).send({
				status : true,
				products: products
			});
		}).catch((error) => {
			console.log(error);
			response.status(500).send();
		});
	});
};

module.exports = {
	GET
};
