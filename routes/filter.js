

var Teachers     = require('../models/teacher');
var Users     = require('../models/user');

var filter = {
    approvedTeachers:  function(cb) {
        var aList = [];     // approved teachers list to be returned
        var approvedEmails = [];    // emails of approved teachers from Users
        Users.scan()
            .where('approved').equals(true)
            .where('teacher_role').equals(true)
            .exec(function(err, approvedUsers) {
                if (err)
                    throw err;
                for(idx in approvedUsers.Items) {
                    var keyEmail = approvedUsers.Items[idx].attrs.email;
                    approvedEmails.push(keyEmail);
                }
                Teachers.scan()
                    .where('email').in(approvedEmails)
                    .exec(function(err, approvedTeachers) {
                        if (err)
                            throw err;
                        for(idx in approvedTeachers.Items) {
                            var teacherAttr = approvedTeachers.Items[idx].attrs;
                            aList.push(teacherAttr);
                        }
                        cb(aList);
                });
        });
    },

    attributes: function(attributes, cb) {
        var filterExp = [];
        var attrNames = {};
        var attrValues = {};
        var fList = [];

        for (var key in attributes) {
            if (attributes[key]) {
                var nameKey = "#an" + key.toUpperCase();
                attrNames[nameKey] = key;
                var valueKey = ":av" + key.toUpperCase();
                attrValues[valueKey] = attributes[key];
                var attr = [nameKey, valueKey].join(' = ');
                filterExp.push(attr);
            }
        }

        filterExpStr = filterExp.join(' AND ');

        Teachers.scan()
            .filterExpression(filterExpStr)
            .expressionAttributeNames(attrNames)
            .expressionAttributeValues(attrValues)
            .projectionExpression('last_name, first_name, focus, approved, email')
            .exec(function(err, teachers) {
                if (err) throw err;
                for (index in teachers.Items) {
                    var attr = teachers.Items[index].attrs;
                    fList.push(attr);
                }
                cb(fList);
        });
    },

    approvedUsers:  function(cb) {
        var aList = [];     // approved users list to be returned
        var approvedEmails = [];    // emails of approved users from Users
        Users.scan()
            .where('approved').equals(true)
            .exec(function(err, approvedUsers) {
                if (err)
                    throw err;
                for(idx in approvedUsers.Items) {
                    var keyEmail = approvedUsers.Items[idx].attrs.email;
                    approvedEmails.push(keyEmail);
                }
                Users.scan()
                    .where('email').in(approvedEmails)
                    .exec(function(err, approvedUsers) {
                        if (err)
                            throw err;
                        for(idx in approvedUsers.Items) {
                            var userAttr = approvedUsers.Items[idx].attrs;
                            aList.push(userAttr);
                        }
                        cb(aList);
                });
        });
    },

    attributes: function(attributes, cb) {
        var filterExp = [];
        var attrNames = {};
        var attrValues = {};
        var fList = [];

        for (var key in attributes) {
            if (attributes[key]) {
                var nameKey = "#an" + key.toUpperCase();
                attrNames[nameKey] = key;
                var valueKey = ":av" + key.toUpperCase();
                attrValues[valueKey] = attributes[key];
                var attr = [nameKey, valueKey].join(' = ');
                filterExp.push(attr);
            }
        }

        filterExpStr = filterExp.join(' AND ');

        Users.scan()
            .filterExpression(filterExpStr)
            .expressionAttributeNames(attrNames)
            .expressionAttributeValues(attrValues)
            .projectionExpression('last_name, first_name, approved, email')
            .exec(function(err, teachers) {
                if (err) throw err;
                for (index in users.Items) {
                    var attr = users.Items[index].attrs;
                    fList.push(attr);
                }
                cb(fList);
        });
    }
}

module.exports = filter;
