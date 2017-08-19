process.env.NODE_ENV = 'test';
var app = require('../../app');
// use zombie.js as headless browser
var Browser = require('zombie');
var assert = require('assert');

//Testing login page
describe('Login page', function(done){
	before(function() {
    		//this.app = http.createServer(app).listen(3000);
    		// initialize the browser using the same port as the 			test application
    		this.browser = new Browser({ site: 				 		'http://localhost:3000'});
     });
	// load the signup page
	before(function(done) {
    		this.browser.visit('/login', done);
  	});

	//A login form should exist
	it('should show a login form', function(done){
		assert.ok(this.browser.success);
    		assert.equal(this.browser.text('h1'), 'Login');
    		assert.equal(this.browser.text('form label'), 				'EmailPassword');
		done();
	});

	//should not accept empty submissions
	it('should not accept empty submissions', function(done){
		var browser = this.browser;
		browser.pressButton('Login', function(){	
			assert.ok(browser.success);
			assert.equal(browser.text('h1'), 'Login');
			assert.equal(browser.text('div.alert.alert-danger'), 'Please enter all the fields to login').then(done, done);
		});
	});

	//should not accept only the email
	it('should not login only with email', function(done){
		var browser = this.browser;
		browser.fill('email', 'John@gmail.com');	
		browser.pressButton('Login').then(function(){
			assert.ok(browser.success);
			assert.equal(browser.text('h1'), 'Login');
			assert.equal(browser.text('div.alert'), 'Please fill in all the fields to continue');
		}).then(done, done);
	});

	//should not accept only the password
	it('should not login only with password', function(done){
		var browser = this.browser;
		browser.fill('password', 'test');	
		browser.pressButton('Login').then(function(){
			assert.ok(browser.success);
			assert.equal(browser.text('h1'), 'Login');
			assert.equal(browser.text('div.alert'), 'Please fill in all the fields to continue');
		}).then(done, done);
	});

	//Refuse invalid email addresses
	it('should not accept invalid emails', function(done){
		var browser = this.browser;
		browser.fill('email', 'incorrect email');
		browser.pressButton('Login').then(function(){
			assert.ok(browser.success);
			assert.equal(browser.text('h1'), 'Login');
			assert.equal(browser.text('div.alert'), 'Please include an \'@\' in the email address. \'incorrect email\' is missing an \'@\'.');
		}).then(done, done);
	});

	//Should accept the form if both a valid email and a password is present
	it('Should have a correct email and password combination',function(done){
		var browser = this.browser;
		browser.fill('email', 'john@email.com');
		browser.fill('password', 'john');
		browser.pressButton('Login').then(function() {
      		//assert.ok(browser.success);
          		assert.equal(browser.text('div.alert'), 'No user found.');
    		}).then(done, done);
	});

	
});
