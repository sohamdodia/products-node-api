const {Seller} = require('../models/seller');
const moment = require('moment');

const POST = (request, response) => {
	const value_list = ['name','password','email'];
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
			parameters : send_list
		});
	}
	let name = request.body.name;
	let password = request.body.password;
	let email = request.body.email;
	let token = '';
	let token_expires_at = moment().add(24, 'hour').valueOf();
	let seller = new Seller({
		name: name,
		password: password,
		email: email,
		token: token,
		token_expires_at: token_expires_at
	});

	seller.save().then(() => {
		response.status(200).send({
			status: true
		});
	}).catch((error) => {
		console.log(error);
		response.status(500).send();
	});
};

module.exports = {
	POST
};
