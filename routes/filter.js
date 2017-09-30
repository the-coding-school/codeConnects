
var Teachers     = require('../models/teacher');
var Users     = require('../models/user');

var filter = {
    approvedTeachers:  function(list, callback) {
        Users.scan()
        .where('approved').equals(true)
        .where('teacher_role').equals(true)
        .exec(function(err, approvedUsers) {
            if (err) throw err;
            var approvedEmails = [];
            for(idx in approvedUsers.Items) {
                var keyEmail = approvedUsers.Items[idx].attrs.email;
                approvedEmails.push(keyEmail);
            }
            Teachers.scan()
            .where('email').in(approvedEmails)
            .exec(function(err, approvedTeachers) {
                if (err) throw err;
                for(idx in approvedTeachers.Items) {
                    console.log(approvedTeachers.Items[idx].attrs);
                    var teacherAttr = approvedTeachers.Items[idx].attrs;
                    list.push(teacherAttr);
                }
            });
            callback();
        });
    },

    attributes: function(list, attributes, callback) {
        var filterExp = [];
        var attrNames = {};
        var attrValues = {};

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
                    list.push(attr);
                }
                callback();
            });
    }
}

module.exports = filter;
