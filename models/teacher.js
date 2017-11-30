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
            paid            : Joi.number(),
            volunteer       : Joi.number(),
            monday      : Joi.array().items(Joi.boolean()).length(24),
            tuesday     : Joi.array().items(Joi.boolean()).length(24),
            wednesday   : Joi.array().items(Joi.boolean()).length(24),
            thursday    : Joi.array().items(Joi.boolean()).length(24),
            friday      : Joi.array().items(Joi.boolean()).length(24),
            saturday    : Joi.array().items(Joi.boolean()).length(24),
            sunday      : Joi.array().items(Joi.boolean()).length(24)
        },

    tableName: 'Teachers'
});

module.exports = teacherModel;