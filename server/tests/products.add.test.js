/* global describe, it */

const expect = require('expect');
const request = require('supertest');
const {app} = require('./../server');
const helpers = require('./helpers');
const constants = require('./constants');

const {email, password, product} = constants;

describe('/POST /products/add', () => {
	it('should add a product', (done) => {
		const {name, actual_price, selling_price, units_in_stock, category_id} = product;

		helpers.login(email, password, done, token => {
			request(app)
				.post('/products/add')
				.set('Authorization', token)
				.send({
					name: name,
					actual_price: actual_price,
					selling_price: selling_price,
					units_in_stock: units_in_stock,
					category_id: category_id
				})
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
	it('should give authorization failure', (done) => {
		const {name, actual_price, selling_price, units_in_stock, category_id} = product;

		helpers.login(email, password, done, token => {
			request(app)
				.post('/products/add')
				.set('Authorization', token + '__')
				.send({
					name: name,
					actual_price: actual_price,
					selling_price: selling_price,
					units_in_stock: units_in_stock,
					category_id: category_id
				})
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

	it('should not add a product with invalid body data', (done) => {
		const {name, actual_price} = product;

		helpers.login(email, password, done, token => {
			request(app)
				.post('/products/add')
				.set('Authorization', token + '__')
				.send({
					name: name,
					actual_price: actual_price
				})
				.expect(400)
				.expect((res) => {
					expect(res.body.error).toBe('missing parameters');
					expect(res.body.parameters.length).toBe(3);
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