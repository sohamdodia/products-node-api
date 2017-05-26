/* global describe, it */

const expect = require('expect');
const request = require('supertest');
const {app} = require('./../server');
const helpers = require('./helpers');
const constants = require('./constants');
const {email, password} = constants;

describe('/GET /products', () => {
	it('should display all the products', (done) => {
		helpers.login(email, password, done, token => {
			request(app)
				.get('/products')
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

	it('should not display all the products with unauthorized user', (done) => {
		helpers.login(email, password, done, token => {
			request(app)
				.get('/products')
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