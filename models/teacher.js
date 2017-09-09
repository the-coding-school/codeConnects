// load the things we need
var dynogels = require('dynogels');
var bcrypt   = require('bcrypt-nodejs');
var Joi = require('joi');

// define the schema for our user model
var teacherModel = dynogels.define('teacherModel', {
    hashKey : 'email',
    
    schema : {
            email           : Joi.string(),
            approved        : Joi.boolean(),
            first_name      : Joi.string(),
            last_name       : Joi.string(),
            first_language  : Joi.string(),
            second_language : Joi.string(),
            gender          : Joi.string(),
            ethnicity       : Joi.string(),
            location        : Joi.string(),
            employer        : Joi.string(),
            focus           : Joi.string(),
            paid            : Joi.boolean(),
            bio             : Joi.string(),
            complete        : Joi.boolean(),
            availability    : Joi.object().keys({
                monday      : Joi.binary(),
                tuesday     : Joi.binary(),
                wednesday   : Joi.binary(),
                thursday    : Joi.binary(),
                friday      : Joi.binary(),
                saturday    : Joi.binary(),
                sunday      : Joi.binary(),
            }),
        },

    tableName: 'Teachers'
});

module.exports = teacherModel;