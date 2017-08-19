process.env.NODE_ENV = 'test';
var app = require('../../app');
// use zombie.js as headless browser
var Browser = require('zombie');
var assert = require('assert');

describe('Sign-Up page', function(done) {
	before(function() {
    		//this.app = http.createServer(app).listen(3000);
    		// initialize the browser using the same port as the 			test application
    		this.browser = new Browser({ site: 				 		'http://localhost:3000' });
     });
	// load the signup page
	before(function(done) {
    		this.browser.visit('/signup', done);
  	});
	//A signup form should exist
	it('should show a signup form', function(done){
		assert.ok(this.browser.success);
    		assert.equal(this.browser.text('h1'), 'Signup');
    		assert.equal(this.browser.text('form label'), 				'EmailPassword');
		done();
	});
	//Refusing empty form data submissions
	it('should not accept empty submissions', function(done){
		var browser = this.browser;
		browser.pressButton('Apply', function(){	
			assert.ok(browser.success);
			assert.equal(browser.text('h1'), 'Signup');
			assert.equal(browser.text('div.alert.alert-danger'), 'Please select one of these options').then(done, done);
		});
	});
	//Refusing incomplete form submissions
	it('should not accept incomplete submissions', function(done){
		var browser = this.browser;
		browser.fill('email', 'John@gmail.com');	
		browser.pressButton('Apply').then(function(){
			assert.ok(browser.success);
			assert.equal(browser.text('h1'), 'Signup');
			assert.equal(browser.text('div.alert'), 'Please fill in all the fields to continue');
		}).then(done, done);
	});
	//Keep the values of the partial submissions
	it('should keep values of the incomplete submissions', function(done){
		var browser = this.browser;
		browser.fill('email', 'John@gmail.com');
		browser.pressButton('Apply').then(function(){
			assert.equal(browser.field('email').value, 'John@gmail.com');
		}).then(done, done);
	});
	//Refuse invalid email addresses
	it('should not accept invalid emails', function(done){
		var browser = this.browser;
		browser.fill('email', 'incorrect email');
		browser.pressButton('Apply').then(function(){
			assert.ok(browser.success);
			assert.equal(browser.text('h1'), 'Signup');
			assert.equal(browser.text('div.alert'), 'Please include an \'@\' in the email address. \'incorrect email\' is missing an \'@\'.');
		}).then(done, done);
	});

	//it('Every email should have an @ sign');
	//it('Every email should have one dot after @ sign');
	//Should accept the form if both a valid email and a password is present
	it('Should have a correct email and password combination',function(req, email, password, done){
		var browser = this.browser;
		browser.fill('email', 'Jonny@gmail.com');
		browser.fill('password', 'test');
		browser.fill('req.body.role', 1);
		browser.pressButton('Apply').then(function() {
      		assert.ok(browser.success);
      		//assert.equal(browser.text('h1'), 'Form Submitted');
      		//assert.equal(browser.text('p'), 'Thank you for your submission. We\'ll answer you shortly.'');
    		}).then(done, done);
	});
});
