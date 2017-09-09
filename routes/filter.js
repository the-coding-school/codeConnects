
var Teacher     = require('../models/teacher');

var filter = {
    approvedTeachers :  function(list, callback) {
        Teacher.scan()
        .where('approved').equals(true)
        .exec(function(err, teachers){
          for(index in teachers.Items){
            var attr = teachers.Items[index].attrs;
            list.push(attr);
          }
          callback();
        });
    },

    
    attributes : function(list, attributes, callback) {

        callback();
    }
}

module.exports = filter;