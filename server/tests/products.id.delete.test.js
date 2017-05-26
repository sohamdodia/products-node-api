/* global describe, it */

const expect = require('expect');
const request = require('supertest');
const helpers = require('./helpers');
const constants = require('./constants');
const {app} = require('./../server');

const {email, password} = constants;

describe('/DELETE /products/:id', () => {

	it('should not delete the product with invalid id', (done) => {
		helpers.login(email, password, done, token => {
			helpers.getProducts(token, products => {
				request(app)
					.delete('/products/' + products[0]._id + '__')
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

	it('should not delete the product with unauthorized user', (done) => {
		helpers.login(email, password, done, token => {
			helpers.getProducts(token, products => {
				request(app)
					.delete('/products/' + products[0]._id)
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

	it('should delete the product', (done) => {
		helpers.login(email, password, done, token => {
			helpers.getProducts(token, products => {
				request(app)
					.delete('/products/' + products[0]._id)
					.set('Authorization', token)
					.expect(200)
					.expect((res) => {
						expect(res.body.status).toBe(true);
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