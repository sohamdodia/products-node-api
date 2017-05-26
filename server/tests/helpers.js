const request = require('supertest');
const {app} = require('./../server');

const login = (email, password, done, callback) => {
	request(app)
		.post('/login')
		.send({
			email: email,
			password: password
		})
		.end((err, res) => {
			if (err) {
				return done(err);
			}
			const token = res.body.token;
			callback(token);
		});
};

const getProducts = (token, callback) => {
	request(app)
		.get('/products/my')
		.set('Authorization', token)
		.end((err, res) => {
			callback(res.body.products);
		});
};

module.exports = {
	getProducts,
	login
};
