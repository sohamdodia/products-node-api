/* global before, describe, it */

const expect = require('expect');
const request = require('supertest');
const constants = require('./constants');
const {app} = require('./../server');
const {Seller} = require('./../models/seller');

const {email, name, password} = constants;

before((done) => {
	Seller.remove({email: email}).then(() => {
		done();
	});
});

describe('POST /signup', () => {
	it('should create a new seller', (done) => {
		request(app)
			.post('/signup')
			.send({
				name: name,
				email: email,
				password: password
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.status).toBe(true);
			})
			.end((err) => {
				if(err) {
					return done(err);
				}

				Seller.find({'email':email}).then((seller) => {
					expect(seller.length).toBe(1);
					expect(seller[0].name).toBe(name);
					expect(seller[0].email).toBe(email);
					done();
				}).catch((error) => {
					done(error);
				});
			});
	});

	it('should not create seller with invalid body data', (done) => {
		let name = 'xyz';
		request(app)
			.post('/signup')
			.send({name: name})
			.expect(400)
			.expect((res) => {
				expect(res.body.error).toBe('missing parameters');
				expect(res.body.parameters.length).toBe(2);
				expect(res.body.status).toBe(false);
			})
			.end((err) => {
				if(err) {
					return done(err);
				}
				done();
			});
	});
});