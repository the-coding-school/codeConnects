var express     = require('express');
var Teacher     = require('../models/teacher');
var filter      = require('./filter');

function checkPropsAreNull(obj) {
    for(var key in obj) {
        if (obj[key]) {
            return false;
        }
    }
    return true;
}

module.exports = function(app, passport) {

    /* GET: fetching all teachers. */
    app.get('/teacherlist', function(req, res) {
        var list = [];
        filter.approvedTeachers(list, function(){
            res.render('userlist', {userlist: list});
        });
    });

    /* POST: fetching filtered teachers. */
    app.post('/teacherlist', function(req, res) {
        var list = [];
        var attributes = req.body;

        if (checkPropsAreNull(attributes)) {
            var list = [];
            filter.approvedTeachers(list, function() {
                res.render('userlist', {userlist: list});
            });
        }
        else {
            filter.attributes(list, attributes, function() {
                res.send({userlist: list});
            });
        }
    });
};
