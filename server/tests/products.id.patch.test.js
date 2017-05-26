/* global describe, it */

const expect = require('expect');
const request = require('supertest');
const helpers = require('./helpers');
const constants = require('./constants');
const {app} = require('./../server');

const {email, password, updatedProductName} = constants;

describe('/PATCH /products/:id', () => {

	it('should update the product', (done) => {
		helpers.login(email, password, done, token => {
			helpers.getProducts(token, products => {
				request(app)
					.patch('/products/' + products[0]._id)
					.set('Authorization', token)
					.send({name: updatedProductName})
					.expect(200)
					.expect((res) => {
						expect(res.body.status).toBe(true);
					})
					.end((err) => {
						if(err) {
							return done(err);
						}
						request(app)
							.get('/products/' + products[0]._id)
							.set('Authorization', token)
							.expect(200)
							.expect((res) => {
								expect(res.body.product[0].name).toBe(updatedProductName);
							})
							.end((err) => {
								if (err) {
									return done(err);
								}
								done();
							});
					});
			});
		});
	});

	it('should not update the product with invalid id', (done) => {
		helpers.login(email, password, done, token => {
			helpers.getProducts(token, products => {
				request(app)
					.patch('/products/' + products[0]._id + '__')
					.set('Authorization', token)
					.send({name: updatedProductName})
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

	it('should not update the product with unauthorized user', (done) => {
		helpers.login(email, password, done, token => {
			helpers.getProducts(token, products => {
				request(app)
					.patch('/products/' + products[0]._id)
					.set('Authorization', token + '__')
					.send({name: updatedProductName})
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