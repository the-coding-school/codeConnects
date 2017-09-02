var express = require('express');

var Teacher     = require('../models/teacher');

module.exports = function(app, passport) {
  /* GET users listing. */
  app.get('/teacherlist', function(req, res) {
    var list = [];
    
    Teacher.scan()
    .where('approved').equals(true)
    .exec(function(err, teachers){
      for(index in teachers.Items){
        var attr = teachers.Items[index].attrs;
        list.push(attr);
      }
      res.render('userlist', {userlist: list});
    });
  });

};
