process.env.NODE_ENV = 'test';

var Browser = require('zombie');

/*
* ZOMBIE UI TESTS LEVEL 1 - LOGIN PAGE
*
* server starts/closes before/after each test
*
* */

var User = require('../models/user');

describe('login page ui tests', function(){
    var validEmail = "approved_teacher@tcs.com";
    var newEmail = "zombie_teacher@tcs.com";
    var validPass = "test";
    var newPass = "junk";
    var TEST_URL = 'http://localhost:3000';
    var appLocation = '../bin/www';
    var server;


    before('initialize test browser', function() {
        this.browser = new Browser();
    });


    beforeEach('initialize app', function(done) {
        delete require.cache[require.resolve(appLocation)];
        server = require(appLocation);
        this.browser.site = TEST_URL;
        // loading login page
        this.browser.visit('/login', done);
        // disabling default timeouts
        this.timeout(0);
    });


    afterEach(function(done) {
        server.close(done)
    });



	it('should show a login form', function(done){
	    var browser = this.browser;
        browser.assert.success();
        browser.assert.text('h1', 'Login');
        browser.assert.text('form label', 'EmailPassword');
        done();
	});


    it('should abort if login credentials invalid',function(done){
        var browser = this.browser;
        browser.fill('email', newEmail);
        browser.fill('password', newPass);
        browser.pressButton('Login').then(function() {
            browser.assert.success();
            browser.assert.text('div.alert', 'No user found.');
        }).then(done, done);
    });


    it('should abort if invalid password', function(done) {
        var browser = this.browser;
        browser.fill('email', validEmail);
        browser.fill('password', newPass);
        browser.pressButton('Login').then(function () {
            browser.assert.success();
            browser.assert.text('h1', 'Login');
            browser.assert.text('div.alert', 'Oops! Wrong password.');
        }).then(done, done);
    });


    // TODO: unable to test incomplete input fields(required) error messages
	// TODO: if many form fields, test all combinations of incomplete inputs with generic method

	/*
	it('should not accept empty submissions', function(done){
		var browser = this.browser;
		browser.pressButton('Login').then(function(){
			browser.assert.success();
			browser.assert.text('h1', 'Login');
			browser.assert.text('div.alert.alert-danger', 'Please enter all the fields to login');
		}).then(done, done);
	});


	it('should not login only with email', function(done){
		var browser = this.browser;
		browser.fill('email', 'John@gmail.com');
		browser.pressButton('Login').then(function(){
	       browser.assert.success();
	       browser.assert.text('h1', 'Login');
	       browser.assert.text('div.alert', 'Please fill in all the fields to continue');
		}).then(done, done);
	});


	it('should not login only with password', function(done){
		var browser = this.browser;
		browser.fill('password', 'test');
		browser.pressButton('Login').then(function(){
			assert.ok(browser.success);
			assert.equal(browser.text('h1'), 'Login');
			assert.equal(browser.text('div.alert'), 'Please fill in all the fields to continue');
		}).then(done, done);
	});
	*/

});
