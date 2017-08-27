// config/passport.js

var Teacher            = require('../models/teacher');
var Student            = require('../models/student');
// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var User            = require('../models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.email);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.get(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {
        
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.get( email,  function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
                createUser(req, email, password, done);
            }

        });

        });

    }));



    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.get( email, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // if the user is unapproved, return the message
            if (user.attrs.approved == false)
                return done(null,false, req.flash('loginMessage', 'Uh oh! You have not been approved yet.'));

            // all is well, return successful user
            var attributes = user.attrs;
            return done(null, attributes);
        });

    }));

};

function createUser(req, email, password, done){
    var teacher_role = null
    teacher_role = (req.body.role == 1 ? true : false);

    // if there is no user with that email
    // create the user
    var newUser            = new User();
    var credentials = {
        email           : email ,
        password        : newUser.generateHash(password),
        teacher_role    :teacher_role,
        approved        : false
    }
    // set the user's local credentials
    newUser.set(credentials);
    var attributes = newUser.attrs;
    
    // save the user
    newUser.save(function(err) {
        if (err)
            throw err;
        if(teacher_role){
            createTeacher(email, attributes, done);
        }
        else{
            createStudent(email, attributes, done);
        }
    });
}

function createTeacher(email, attributes, done){
    var newTeacher      = new Teacher();
    var credentials = {
        email       : email,
    }
    newTeacher.set(credentials);

    newTeacher.save(function(err){
        if(err)
            throw err;
        return done(null, attributes);
    })
}

function createStudent(email, attributes, done){
    var newStudent      = new Student();
    var credentials = {
        email       : email,
    }
    newStudent.set(credentials);

    newStudent.save(function(err){
        if(err)
            throw err;
        return done(null, attributes);
    })
}