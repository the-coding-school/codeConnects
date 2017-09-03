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
            age             : Joi.number().integer(),
            grade           : Joi.number().integer(),
            school          : Joi.string(),
            location         : Joi.string()
        },

    tableName: 'Students'
});

module.exports = studentModel;