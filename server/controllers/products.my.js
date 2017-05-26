const auth = require('../auth');
const {Product} = require('../models/product');

const GET = (request, response) => {
	auth(request, response, () => {
		let seller_id = request.seller.id;
		Product.find({'seller_id' : seller_id}).then((products) => {
			response.status(200).send({
				status: true,
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
