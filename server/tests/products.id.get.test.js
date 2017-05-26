/* global describe, it */

const expect = require('expect');
const request = require('supertest');
const helpers = require('./helpers');
const constants = require('./constants');
const {app} = require('./../server');

const {email, password} = constants; 

describe('/GET /products/:id', () => {
	it('should display search product which is searched by the ID', (done) => {
		helpers.login(email, password, done, token => {
			helpers.getProducts(token, products => {
				const productId = products[0]._id;
				request(app)
					.get('/products/' + productId)
					.set('Authorization', token)
					.expect(200)
					.expect((res) => {
						expect(res.body.status).toBe(true);
						expect(res.body.product.length).toBe(1);
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

	it('should not display the product with invalid ID', (done) => {
		helpers.login(email, password, done, token => {
			helpers.getProducts(token, products => {
				let productId = products[0]._id + '1';
				request(app)
					.get('/products/' + productId)
					.set('Authorization', token)
					.expect(404)
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

	it('should not display the product with unauthorized user', (done) => {
		helpers.login(email, password, done, token => {
			helpers.getProducts(token, products => {
				let productId = products[0]._id + '1';
				request(app)
					.get('/products/' + productId)
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
});