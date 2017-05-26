/* global describe, it */

const expect = require('expect');
const request = require('supertest');
const constants = require('./constants');
const {app} = require('./../server');

const {email, password, invalidEmail, invalidPassword} = constants;

describe('POST /login', () => {
	it('should successfully signin and retrieve token', (done) => {
		request(app)
			.post('/login')
			.send({
				email: email,
				password: password
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.status).toBe(true);
				expect(res.body.token.length).toBe(16);
			})
			.end((err) => {
				if(err) {
					return done(err);
				}
				done();
			});
	});

	it('should not login with invalid password', (done) => {

		request(app)
			.post('/login')
			.send({
				email: email,
				password: invalidPassword
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

	it('should not login with invalid email', (done) => {

		request(app)
			.post('/login')
			.send({
				email: invalidEmail,
				password: password
			})
			.expect(400)
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