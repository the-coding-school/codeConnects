var supertest = require("supertest");
var should = require("chai").should();
var server = supertest.agent("http://localhost:3000");

describe("testing all routes", function()
{
	// root GET call
	it("returns home page", function(done) {
		server.get("/")
		.expect("Content-type",/text\/html/)
 		.end(function(err, res) {
			if (err) return done(err)
  			res.status.should.equal(200);
  			done();
		});
	});

	it("redirects to profile with valid login credentials", function(done) {
		server.post("/login")
		.send('email=approved_teacher@tcs.com')
		.send('password=test')
		.expect("Content-type",/text/)
 		.end(function(err, res) {
			if (err) return done(err)
			res.status.should.equal(302);
			res.header.location.should.eql('/profile')
			done();
		});
	});

	it("redirects back to login with invalid login credentials", function(done) {
		server.post("/login")
		.send('email=teacher@gmail.com')
		.send('password=badpass')
		.expect("Content-type",/text/)
 		.end(function(err, res) {
			if (err) return done(err)
			res.status.should.equal(302);
			res.header.location.should.eql('/login')
			done();
		});
	});

	it("redirects to homepage for successful signup", function(done) {
		server.post("/signup")
		.send('email=someone@email.com')
		.send('password=somepassword')
		.send('role=1')
		.expect("Content-type", /text/)
 		.end(function(err, res) {
			if (err) return done(err)
			res.status.should.equal(302);
			res.header.location.should.eql('/profile')
			done();
		});
	});

	it.only("redirects back to signup if email exists", function(done) {
		server.post("/signup")
		.send('email=approved_teacher@tcs.com')
		.send('password=test')
		.send('role=1')
		.expect("Content-type", /text/)
		.expect("Location", /\/signup/)
 		.end(function(err, res) {
			if (err) return done(err)
			console.log(res.body)
			res.text.should.match(/That email is already taken./)
			done();
		});
	});

});
