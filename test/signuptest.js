process.env.NODE_ENV = 'test';
var app = require('../app');
var Browser = require('zombie');
var assert = require('assert');

describe('user visits signup page', function(done) {
	before('initialize the test browser', function() {
		this.browser = new Browser({ site: 'http://localhost:3000' });
	});

	beforeEach('load the signup page', function(done) {
		this.browser.visit('/signup', done);
  	});

	it('should show a signup form', function(done){
		var browser = this.browser;
		assert.ok(browser.success);
		assert.equal(browser.text('h1'), 'Signup');
		assert.equal(browser.text('form label'), 'EmailPassword');
		done();
	});

	it.only('should not signup with pre-existing email', function(done){
		var browser = this.browser;
		browser.fill('email', 'unapproved_teacher@tcs.com');
		browser.fill('password', 'somepass');
		browser.fill('role', 1);
		browser.pressButton('Apply').then(function(){
			assert.ok(browser.success);
			assert.equal(browser.text('h1'), 'Signup');
			browser.assert.text("div.alert", 'That email is already taken.')
		}).then(done, done);
	});

	//
	// it('should not accept incomplete submissions', function(done){
	// 	var browser = this.browser;
	// 	browser.fill('email', 'John@gmail.com');
	// 	browser.pressButton('Apply').then(function(){
	// 		assert.ok(browser.success);
	// 		assert.equal(browser.text('h1'), 'Signup');
	// 		assert.equal(browser.text('div.alert'), 'Please fill in all the fields to continue');
	// 	}).then(done, done);
	// });
	//
	// it('should keep values of the incomplete submissions', function(done){
	// 	var browser = this.browser;
	// 	browser.fill('email', 'John@gmail.com');
	// 	browser.pressButton('Apply').then(function(){
	// 		assert.equal(browser.field('email').value, 'John@gmail.com');
	// 	}).then(done, done);
	// });
	//
	// it('should not accept invalid emails', function(done){
	// 	var browser = this.browser;
	// 	browser.fill('email', 'incorrect email'
);
	// 	browser.pressButton('Apply').then(function(){
	// 		assert.ok(browser.success);
	// 		assert.equal(browser.text('h1'), 'Signup');
	// 		assert.equal(browser.text('div.alert'), 'Please include an \'@\' in the email address. \'incorrect email\' is missing an \'@\'.');
	// 	}).then(done, done);
	// });
	//
	// //it('Every email should have an @ sign');
	// //it('Every email should have one dot after @ sign');
	//
	// //Should accept the form if both a valid email and a password is present
	it('Should have a correct email and password combination',function(req, email, password, done){
		var browser = this.browser;
		browser.fill('email', 'Jonny@gmail.com');
		browser.fill('password', 'test');
		browser.fill('role', 1);
		browser.pressButton('Apply').then(function() {
      		assert.ok(browser.success);
      		assert.equal(browser.text('h1'), 'Form Submitted');
      		//assert.equal(browser.text('p'), 'Thank you for your submission. We\'ll answer you shortly.'');
    		}).then(done, done);
	});
});
