var express     = require('express');
var Teacher     = require('../models/teacher');
var User     = require('../models/user');
var filter      = require('./filter');
var userManager      = require('./userManage');

module.exports = function(app, passport) {
    // fetching all teacher user information
    app.get('/teachers', function(req, res) {
        filter.allTeachers(function(tList) {
            res.send({userlist: tList});
        });
    });

    app.post('/teachers', function(req, res) {
        var targetUserEmail = req.body.email;
        userManager.toggleApprove(targetUserEmail, function (newVal) {
            res.send({newStatus: newVal});
        });
    });

    // fetching all approved teacher list on filter page
    app.get('/teacherlist', function(req, res) {
        filter.approvedTeachers(function(aList) {
            res.render('userlist', {userlist: aList});
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
