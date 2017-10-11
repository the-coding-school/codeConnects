var express     = require('express');
var Teacher     = require('../models/teacher');
var filter      = require('./filter');

module.exports = function(app, passport) {
    // fetching all approved teacher list on filter page
    app.get('/teacherlist', function(req, res) {
        filter.approvedTeachers(function(aList) {
            res.render('userlist', {userlist: aList});var express     = require('express');
var Teacher     = require('../models/teacher');
var filter      = require('./filter');
var profile      = require('./profile');

module.exports = function(app, passport) {
    // fetching all approved teacher list on filter page
    app.get('/teacherlist', function(req, res) {
        filter.approvedTeachers(function(aList) {
            console.log("T Hello Get");
            res.render('teacherlist', {userlist: aList});
            console.log("Hello Get");
        });
    });


    // fetching filtered teacher list
    app.post('/teacherlist', function(req, res) {
        var filterAttrs = req.body;
        console.log("T Hello in post");
        if (checkPropsAreNull(filterAttrs)) {
            filter.approvedTeachers(function(aList) {
                res.render('teacherlist', {userlist: aList});
            });
        }
        else {
            filter.attributes(filterAttrs, function(list) {
                res.send({teacherlist: list});
            });
        }
    });

    // fetching all approved teacher list on filter page
    app.get('/userlist', isLoggedIn, function(req, res) {
        var teacher_role = req.cookies.user.teacher_role
        if(teacher_role == true)
        {
            console.log("Teacher");
            var err = new Error('Not Found');
            err.status = 404;
            throw err;
        }
        else
        {
            console.log("Student");
            filter.approvedUsers(function(aList) {
            console.log("Hello Get");
            res.render('userlist', {userlist: aList});
        });
        }
        
    });

    // fetching filtered teacher list
    app.post('/userlist', function(req, res) {
        var filterAttrs = req.body;
          console.log("Hello Post");
          
        if (checkPropsAreNull(filterAttrs)) {
            filter.approvedUsers(function(aList) {
                res.render('userlist', {userlist: aList});
            });
        }
        else {
            filter.attributes(filterAttrs, function(list) {
                res.send({userlist: list});
            });
        }
    });
};


// returns true if all properties have null values
function checkPropsAreNull(obj) {
    for(var key in obj) {
        if (obj[key]) return false;
    }
    return true;
}

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


        });
    });


    // fetching filtered teacher list
    app.post('/teacherlist', function(req, res) {
        var filterAttrs = req.body;
        if (checkPropsAreNull(filterAttrs)) {
            filter.approvedTeachers(function(aList) {
                res.render('userlist', {userlist: aList});
            });
        }
        else {
            filter.attributes(filterAttrs, function(list) {
                res.send({userlist: list});
            });
        }
    });
};


// returns true if all properties have null values
function checkPropsAreNull(obj) {
    for(var key in obj) {
        if (obj[key]) return false;
    }
    return true;
}
