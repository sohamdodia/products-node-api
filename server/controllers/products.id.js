const _ = require('lodash');
const auth = require('../auth');
const {Product} = require('../models/product');
const responses = require('../responses');

const GET = (request, response) => {
	auth(request, response, () => {
		let id = request.params.id;
		Product.find({'_id': id}).then((product) => {
			if(!product || product.length != 1) {
				return response.status(404).send(responses.idNotFoundResponse);
			}
			return response.send({
				status: true,
				product: product
			});

		}).catch(() => {
			response.status(404).send({
				status: false
			});
		});
	});
};

const DELETE = (request, response) => {
	let id = request.params.id;
	auth(request, response, () => {
		Product.find({'_id': id}).then((product) => {
			if(!product || product.length != 1) {
				return response.status(404).send(responses.idNotFoundResponse);
			}
			let product_seller_id = product[0]['seller_id'];
			let seller_id = request.seller.id;
			if(seller_id === product_seller_id) {
				Product.findByIdAndRemove(id).then((product) => {
					return response.status(200).send({
						status: true,
						product: product
					});
				}).catch((error) => {
					console.log(error);
					return response.status(500).send();
				});
			} else {
				return response.status(403).send(responses.authenticationFailureResponse);
			}
		}).catch(() => {
			response.status(404).send({
				status: false
			});
		});
	});
};

const PATCH = (request, response) => {
	let id = request.params.id;
	let body = _.pick(request.body, ['name', 'actual_price','selling_price','units_in_stock', 'category_id']);	
	auth(request, response, () => {
		Product.find({'_id': id}).then((product) => {

			if(!product || product.length != 1) {
				return response.status(404).send(responses.idNotFoundResponse);
			}

			let product_seller_id = product[0]['seller_id'];
			let seller_id = request.seller.id;
			if(seller_id === product_seller_id) {
				Product.findByIdAndUpdate(id, {$set: body}, {new: true}).then((product) => {
					if(!product) {
						return response.status(404).send(responses.idNotFoundResponse);
					}
					return response.status(200).send({
						status: true,
						product: product
					});
				}).catch((error) => {
					console.log(error);
					response.status(500).send();
				});
			} else {
				response.status(403).send(responses.authenticationFailureResponse);
			}
		}).catch(() => {
			response.status(404).send({
				status: false
			});
		});
	});
};

module.exports = {
	GET,
	DELETE,
	PATCH
};
