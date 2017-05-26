const {Seller} = require('./models/seller');

const responses = require('./responses');

const auth = (request, response, next) => {

	if (!request.headers.authorization) {
		return response.status(403).send(responses.authenticationFailureResponse);
	}

	let authToken = request.headers.authorization;

	Seller.findOne({'token': authToken}).then((seller) => {

		if(seller == null) {
			return response.status(403).send(responses.authenticationFailureResponse);
		}
		request.seller = seller;

		next();

	}).catch((error) => {
		console.log('Error in auth.js');
		console.log(error);
		return response.status(403).send(responses.authenticationFailureResponse);
	});

};

module.exports = auth;
