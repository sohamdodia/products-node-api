/* global describe, it */

const expect = require('expect');
const request = require('supertest');
const constants = require('./constants');
const {app} = require('./../server');
const helpers = require('./helpers');
const {email, password} = constants;

describe('/GET /products/search/:id', () => {
	it('should display searched products', (done) => {
		const name = constants.product.name;
		let searchStr = name.substring(0, parseInt(name.length / 2));
		helpers.login(email, password, done, token => {
			request(app)
				.get('/products/search/' + searchStr)
				.set('Authorization', token)
				.expect(200)
				.expect((res) => {
					expect(res.body.status).toBe(true);
					expect(res.body.products.length).toBeGreaterThan(0);
				})
				.end((err) => {
					if(err) {
						return done(err);
					}
					done();
				});
		});
	});

	it('should not display searched products with unauthorized user', (done) => {
		const name = constants.product.name;
		let searchStr = name.substring(0, parseInt(name.length / 2));
		helpers.login(email, password, done, token => {
			request(app)
				.get('/products/search/' + searchStr)
				.set('Authorization', token + '__')
				.expect(403)
				.expect((res) => {
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
});