var filter = require('filter-object');

module.exports = function(app, passport) {
    // =====================================
        // PROFILE SECTION =====================
        // =====================================
        // we will want this protected so you have to be logged in to visit
        // we will use route middleware to verify this (the isLoggedIn function)
        app.get('/profile', isLoggedIn, function(req, res) {
            var attr = req.user.attrs;
            if(attr.role == "student"){
                if(attr.approved == true){
                    res.render('student/student-bio', {
                    user : attr // get the user out of session and pass to template
                });
                }
                else{
                    res.redirect('/');
                }
            }
            if(attr.role == "teacher"){
                if(attr.approved == true){
                    res.render('teacher/teacher-bio', {
                    user       : attr // get the user out of session and pass to template
                });
                }
                else{
                    //redirect to index if they're not approved
                    res.redirect('/');
                }
            }
        });

        app.post('/teacher-bio', isLoggedIn, function(req, res){
            var user = req.user;
            var form = req.body;
            var bio = {
                teacher: form
            }
            user.set(bio);
            user.save();
        });

        app.post('/student-bio', isLoggedIn, function(req, res){
            var user = req.user;
            var form = req.body;
            var prefs = {
                student: {
                    name: form.name,
                    preferences: filter(form, ['!name'])
                }
            }
            user.set(prefs);
            user.save();
            res.redirect('back');
        });

};

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
