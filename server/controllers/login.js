const {Seller} = require('../models/seller');
const randtoken = require('rand-token');
const moment = require('moment');
const responses = require('../responses');

const POST = (request, response) => {
	let email = request.body.email;
	let password = request.body.password;

	Seller.find({'email':email}).then((seller) => {
		if(!seller || seller.length != 1) {
			return response.status(400).send(responses.emailNotFoundResponse);
		}
		seller = seller[0];
		if(password !== seller.password) {
			return response.status(403).send(responses.passwordNotMatchResponse);
		}

		let time = moment().add(24, 'hour').valueOf();
		if(seller.token == null || seller.token == '') {
			let token = randtoken.generate(16);
			let id = seller._id;
			let updateObj = {
				token: token,
				token_expires_at: time
			};
			Seller.findByIdAndUpdate(id, {$set : updateObj}, {new: true}).then((seller) => {
				return response.status(200).send({
					status: true,
					name: seller.name,
					token: seller.token,
					token_expires_at: seller.token_expires_at
				});
			}).catch((error) => {
				console.log(error);
				response.status(500).send();
			});
		}else if(seller.token_expires_at < moment().valueOf()) {
			let id = seller._id;
			let token = randtoken.generate(16);
			let updateObj = {
				token: token,
				token_expires_at: time
			};
			Seller.findByIdAndUpdate(id, {$set : updateObj}, {new: true}).then((seller) => {
				return response.status(200).send({
					status: true,
					name: seller.name,
					token: seller.token,
					token_expires_at: seller.token_expires_at
				});
			}).catch((error) => {
				console.log(error);
				response.status(500).send();
			});
		} else {
			return response.status(200).send({
				status: true,
				name: seller.name,
				token: seller.token,
				token_expires_at: seller.token_expires_at
			});
		}
	}).catch((error) => {
		console.log(error);
		response.status(500).send(error);
	});
};

module.exports = {
	POST
};
