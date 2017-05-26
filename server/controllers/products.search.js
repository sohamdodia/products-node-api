const {Product} = require('../models/product');
const auth = require('../auth');
const GET = (request, response) => {
	let query = request.params.query;
	auth(request, response, () => {
		Product.find({'name' : {$regex: new RegExp(query, 'ig')}}).then((products) => {
			response.status(200).send({
				status: true,
				products: products
			});
		}).catch((error)=> {
			console.log(error);
			response.status(500).send();
		});
	});
};

module.exports = {
	GET
};
