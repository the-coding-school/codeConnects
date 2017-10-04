var Teachers     = require('../models/teacher');
var Users     = require('../models/user');

var manager = {
    toggleApprove: function(targetEmail, cb) {
        Users.get(targetEmail, function(err, user) {
            if (err)
                throw err;
            var newApprove = !user.attrs.approved;
            var newApprovalState = {
                approved: newApprove
            }
            user.set(newApprovalState);
            user.save(function(err) {
                if (err)
                    throw err;
                cb(newApprove);
            });
        });
    }
}

module.exports = manager;
