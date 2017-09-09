var express     = require('express');

var Teacher     = require('../models/teacher');
var filter        = require('./filter');

module.exports = function(app, passport) {
  /* GET users listing. */
  app.get('/teacherlist', function(req, res) {
    var list = [];


    filter.approvedTeachers(list, function(){
      res.render('userlist', {userlist: list});
    });

  });

  app.post('/teacherlist', function(req, res){
    var list = [];
    var attributes = {};
    
      filter.attributes(list, attributes, function(){
        res.render('userlist', {userlist: list});
      });
    console.log("posted");
  })

};

