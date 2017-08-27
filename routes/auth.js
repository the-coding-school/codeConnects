var dynogels = require('dynogels');
var User            = require('../models/user');
var Teacher            = require('../models/teacher');
var Student            = require('../models/student');

// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('auth/login.pug', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', loginStoreCookie, passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('auth/signup.pug', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', signupStoreCookie, passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res, next) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

function loginStoreCookie(req, res, next){
    var email = req.body.email;

    User.get( email, function(err, user){
        if (err){
            console.log(err);
            return done(err);
        }
        
        if(user){
            res.clearCookie('user');
            var session = {
                'email'         : email,
                'teacher_role'  : user.attrs.teacher_role
            };
            res.cookie('user', session);
            return next();
        }
    });
    }

function signupStoreCookie(req, res, next){
    var email        = req.body.email;
    var teacher_role = (req.body.role == 1 ? true : false);

    var session = {
            'email'         : email,
            'teacher_role'  : teacher_role
    }

    res.clearCookie('user');
    res.cookie('user', session, {
        expires: new Date(Date.now() + 3000000)
    })
    return next();
}