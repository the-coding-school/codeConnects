// load the things we need
var dynogels = require('dynogels');
var bcrypt   = require('bcrypt-nodejs');
var Joi = require('joi');

// define the schema for our user model
var studentModel = dynogels.define('studentModel', {
    hashKey : 'email',
    
    schema : {
            email           : Joi.string(),
            first_name      : Joi.string(),
            last_name       : Joi.string(),
            first_language  : Joi.string(),
            grade           : Joi.string(),
            school          : Joi.string(),
            location        : Joi.string(),
            focus           : Joi.string()
        },

    tableName: 'Students'
});

module.exports = studentModel;