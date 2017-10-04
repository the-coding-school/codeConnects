
var Teacher            = require('../models/teacher');
var Student            = require('../models/student');
var filter            = require('../routes/filter');

module.exports = function(app, passport) {
// =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        var attributes = req.user.attrs;

        if (attributes.admin_role === true) {
            filter.allTeachers(function(tList) {
                res.render('admin/dashboard.pug', {userlist: tList});
            });
        }

        if(attributes.teacher_role == false){
            render_student(req, res, attributes);
        }
        if(attributes.teacher_role == true){
            render_teacher(req, res, attributes);
        }
    });

    app.post('/teacher-bio', isLoggedIn, submitForm, function(req, res){
    });

    app.post('/student-bio', isLoggedIn, submitForm, function(req, res){

    });
}

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

function render_student(req, res, attr){
    var email = req.cookies.user.email
    var keys = []
    var values = []

    /* function render_student*/
        if(attr.approved == true){
            Student.get(email, function (err, student){
                for(key in student.attrs){
                    keys.unshift(key)
                    values.unshift(student.attrs[key])
                }
                res.render('student/student-bio', {
                    keys:       keys,
                    values:     values
                });
            })
        }
        else{
            res.redirect('/');
        }
}

function render_teacher(req, res, attr){
    var email = req.cookies.user.email
    var keys = []
    var values = []

    /* function render_teacher*/
    if(attr.approved == true){
        Teacher.get(email, function(err, teacher){
            for(key in teacher.attrs){
                keys.unshift(key)
                values.unshift(teacher.attrs[key])
            }
            res.render('teacher/teacher-bio', {
                keys:       keys,
                values:     values// get the user out of session and pass to template
            });
        })
    }
    else{
        //redirect to index if they're not approved
        res.redirect('/');
    }
}

function submitForm(req, res, next){
    var form = req.body;
    var user = req.cookies.user;
    var email = user.email;
    var teacher_flag = user.teacher_role;

    if(teacher_flag === true){
        Teacher.get(email, function(err, teacher){
            if(err)
                return done(err);

            for(var key in form){
                console.log(key);
                if(form.hasOwnProperty(key) && form[key] == ''){
                    delete form[key]
                }
            }
            teacher.set(form);
            teacher.save(function(err) {
                if(err)
                    throw err;
                return next();
            });
        });
    }

    else{
        Student.get(email, function(err, student){
            if(err)
                return done(err);

            for(var key in form){
                console.log(key);
                if(form.hasOwnProperty(key) && form[key] == ''){
                    delete form[key]
                }
            }
            console.log(form);
            student.set(form);
            student.save(function(err) {
                if(err)
                    throw err;
                return next();
            });
        });
    }
}
