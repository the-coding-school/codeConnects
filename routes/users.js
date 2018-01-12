var express     = require('express');
var Teacher     = require('../models/teacher');
var filter      = require('./filter');

module.exports = function(app, passport) {
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
