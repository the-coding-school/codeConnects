// load the things we need
var dynogels = require('dynogels');
var bcrypt   = require('bcrypt-nodejs');
var Joi = require('joi');

// define the schema for our user model
var lessonModel = dynogels.define('lessonModel', {
    hashKey : 'student_id',
    
    schema : {
            student_id      : Joi.number().integer(),
            teacher_id      : Joi.number().integer(),
            student_hours   : Joi.number().integer(),
            teacher_hours   : Joi.number().integer(),
            verified        : Joi.boolean(),
            schedule        : Joi.object.keys({
                monday      : Joi.binary(),
                tuesday     : Joi.binary(),
                wednesday   : Joi.binary(),
                thursday    : Joi.binary(),
                friday      : Joi.binary(),
                saturday    : Joi.binary(),
                sunday      : Joi.binary(),
            }),
            history         : Joi.object.keys({
                1           : Joi.number().integer(),
                2           : Joi.number().integer(),
                3           : Joi.number().integer(),
                4           : Joi.number().integer(),
                5           : Joi.number().integer(),
                6           : Joi.number().integer(),
                7           : Joi.number().integer(),
                8           : Joi.number().integer(),
                9           : Joi.number().integer(),
                10           : Joi.number().integer()
            })
        },

    tableName: 'Lessons'
});

module.exports = lessonModel;