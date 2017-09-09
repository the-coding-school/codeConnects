// app/models/user.js
// load the things we need
var dynogels = require('dynogels');
var bcrypt   = require('bcrypt-nodejs');
var Joi = require('joi');

// define the schema for our user model
var userModel = dynogels.define('userModel', {
    hashKey : 'email',

    timestamps : true,

    schema : {
        email            : Joi.string().email(),
        password         : Joi.string(),
        teacher_role     : Joi.boolean(),
        approved         : Joi.boolean()
    },
    tableName: 'Users'
});

// methods ======================
// generating a hash
userModel.prototype.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(12), null);
};

// checking if password is valid
userModel.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.attrs.password);
};

// create the model for users and expose it to our app
module.exports = userModel;
