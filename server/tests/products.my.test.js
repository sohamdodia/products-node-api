/* global describe, it */

const expect = require('expect');
const request = require('supertest');
const helpers = require('./helpers');
const {app} = require('./../server');
const constants = require('./constants');

const {email, password} = constants;

describe('/GET /products/my', () => {

	it('should display user\'s product', (done) => {
		helpers.login(email, password, done, token => {
			request(app)
				.get('/products/my')
				.set('Authorization', token)
				.expect(200)
				.expect((res) => {
					expect(res.body.status).toBe(true);
					expect(res.body.products.length).toBe(1);
				})
				.end((err) => {
					if(err) {
						return done(err);
					}
					done();
				});
		});
	});

});