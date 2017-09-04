process.env.NODE_ENV = 'test';
var request = require("supertest");

/*
* ROUTE TESTS
*
* server starts/closes before/after each test
*
* if signup aborts, database is untouched
* if signup succeeds, database is dirty
*   - (afterEach hook responsible for db cleanup)
* */


var User = require('../models/user');

describe("Route tests", function()
{
	var validEmail = "approved_teacher@tcs.com";
	var invalidEmail = "random_teacher@tcs.com";
	var validPass = "test";
	var invalidPass = "junk";
	var server;

	beforeEach(function() {
		delete require.cache[require.resolve('../bin/www')];
		server = require('../bin/www')
		this.timeout(0)
	});

	afterEach(function(done) {
		server.close(done)
	});

	// testing root /
	it("GET /, homepage", function(done) {
		request(server)
		.get("/")
		.expect(200)
		.expect("Content-Type", /text\/html/, done)
	});

	// testing /login #######################################
	it("POST /login, valid credentials, should redirect to /profile", function(done) {
		request(server)
		.post("/login")
		.send('email='+validEmail)
		.send('password='+validPass)
		.expect('Content-Type', /text/)
		.expect('Location', /\/profile/)
		.end(function(err, res) {
			if (err) return done(err);
			done()
		})

	});

	it("POST /login, invalid credentials, should redirect to /login", function(done) {
		request(server)
		.post("/login")
		.send('email='+invalidEmail)
		.send('password='+invalidPass)
		.expect('Content-Type', /text/)
		.expect('Location', /\/login/)
		.end(function(err, res) {
			if (err) return done(err);
			done()
		})

	});

	// testing /signup #######################################
	it("POST /signup, failed signup, should redirect to /signup", function(done) {
		request(server)
		.post("/signup")
		.send('email='+validEmail)
		.send('password='+validPass)
		.send('role=1')
		.expect("Content-Type", /text/)
		.expect('Location', /\/signup/)
		.end(function(err, res) {
			if (err) return done(err);
			done()
		})
	});

	describe("Users table needs restore", function() {
		it("POST /signup, successful signup, should redirect to homepage", function(done) {
			request(server)
			.post("/signup")
			.send('email='+invalidEmail)
			.send('password='+validPass)
			.send('role=1')
			.expect('Content-Type', /text/)
			.expect('Location', /\/profile/)
			.end(function(err, res) {
				if (err) return done(err);
				done()
			})
		});

		afterEach(function(done) {
			User.destroy({email: invalidEmail}, function(err, res) {
				if (err) return done(err);
				else {
					console.log('\t- deleted test item: '+ invalidEmail);
					done()
				}
			})
		})
	})

});
