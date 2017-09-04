process.env.NODE_ENV = 'test';

var Browser = require('zombie');

/*
* ZOMBIE UI TESTS LEVEL 1 - SIGNUP PAGE
*
* server starts/closes before/after each test
*
* if signup aborts, database is untouched
* if signup succeeds, database is dirty
*   - (afterEach hook responsible for db cleanup)
* */


var User = require('../models/user');

describe('signup page ui tests', function() {

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
        // loading signup page
        this.browser.visit('/signup', done);
        // disabling default timeouts
        this.timeout(0);
  	});


    afterEach(function(done) {
        server.close(done)
    });


    describe('users table untouched', function() {
        it('should show a signup form', function (done) {
            var browser = this.browser;
            browser.assert.success();
            browser.assert.text('h1', 'Signup');
            browser.assert.text('form label', 'EmailPassword');
            done();
        });


        it('should abort signup if email in use', function (done) {
            var browser = this.browser;
            browser.fill('email', validEmail);
            browser.fill('password', validPass);
            browser.choose('role', 1);
            browser.pressButton('Apply').then(function () {
                browser.assert.success();
                browser.assert.text('h1', 'Signup');
                browser.assert.text("div.alert", 'That email is already taken.')
            }).then(done, done);
        });


        // TODO: fix, if required fields are missed, Zombie still posts form, weird!
        // it('should retain values if submission incomplete', function (done) {
        //     var browser = this.browser;
        //     browser.fill('email', newEmail);
        //     browser.fill('password', newPass);
        //
        //     browser.pressButton('Apply').then(function () {
        //         browser.assert.text('h1', 'Signup');
        //         browser.assert.text("input[name='email]'", newEmail);
        //         browser.assert.text("input[name='password']", newPass);
        //     }).then(done, done);
        // });
    });


    describe('users table needs restore', function() {
        it('should redirect to homepage if signup form valid and unapproved', function(done){
            var browser = this.browser;
            browser.fill('email', newEmail);
            browser.fill('password', newPass);
            browser.choose('role', 1);
            browser.pressButton('Apply').then(function() {
                browser.assert.redirected();
                browser.assert.text('h1', 'Code Connects');
            }).then(done, done);
        });

        afterEach(function(done) {
            User.destroy({email: newEmail}, function(err, res) {
                if (err) return done(err);
                else {
                    console.log('\t- deleted test item: '+ newEmail);
                    done()
                }
            })
        })
    });
});
