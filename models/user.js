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
        email            : Joi.string(),
        role             : Joi.string(),
        approved         : Joi.boolean(),
        local            : Joi.object().keys({
            email        : Joi.string().email(),
            password     : Joi.string(),
        }),
        facebook         : {
            id           : Joi.string(),
            token        : Joi.string(),
            email        : Joi.string().email(),
            name         : Joi.string()
        },
        google           : {
            id           : Joi.string(),
            token        : Joi.string(),
            email        : Joi.string().email(),
            name         : Joi.string()
        },
        teacher         : Joi.object().keys({
            name           : Joi.string(),
            employer       : Joi.string(),
            bio            : Joi.string()
        }),
        student         : Joi.object().keys({
            name            : Joi.string(),
            preferences     : Joi.object().keys({
                language        : Joi.string(),
                gender          : Joi.string(),
                ethnicity       : Joi.string(),
                city            : Joi.string(),
                state           : Joi.string(),
                focus           : Joi.string()
            })
        })
    },

    tableName: 'Users'
});

// methods ======================
// generating a hash
userModel.prototype.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userModel.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.attrs.local.password);
};

// create the model for users and expose it to our app
module.exports = userModel;
