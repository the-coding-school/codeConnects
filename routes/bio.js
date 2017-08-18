module.exports = function(app, passport) {
    // =====================================
        // PROFILE SECTION =====================
        // =====================================
        // we will want this protected so you have to be logged in to visit
        // we will use route middleware to verify this (the isLoggedIn function)
        app.get('/profile', isLoggedIn, function(req, res) {
            var attributes = req.user.attrs;
            if(attributes.role == "student"){
                 /* function render_student*/
                if(attr.approved == true){
                    res.render('student/student-bio', {
                    user : req.user.attrs // get the user out of session and pass to template
                });
                }
                else{
                    res.redirect('/');
                }
                /*-----*/
            }
            if(attributes.role == "teacher"){
                /* function render_teacher*/
                if(attributes.approved == true){
                    res.render('teacher/teacher-bio', {
                    user       : req.user.attrs // get the user out of session and pass to template
                });
                }
                else{
                    //redirect to index if they're not approved
                    res.redirect('/');
                }
                /*-----*/
            }
        });

        app.post('/teacher-bio', isLoggedIn, function(req, res){
            var user = req.user;
            var form = req.body;
            var bio = {
                teacher: req.body
            }
            user.set(bio);
            user.save();
        });
};

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

function render_student(res, attr){
    /*--TO-DO--*/
}

function render_teacher(res, attr){
    /*--TO-DO--*/
}