function clearForm() {
    $('ul#userlist').html('');
    $('input[type="hidden"]').val('');

    var buttonNames = ['focus', 'language', 'ethnicity', 'gender'];
    var ddCaption = "Select&nbsp;<span class='caret'></span>" ;
    for (var i in buttonNames) {
        $('#btn-'+buttonNames[i]).html(ddCaption);
    }
}


function getUserList(targetUrl, data) {
    $.ajax({
        url: targetUrl,
        data: data,
        method: 'POST',
        success: function(res) {
            $('ul#userlist').html('');
            updateList(res);
        }
    });
}


function updateList(res) {
    var newList = res.userlist;

    for (var i in newList) {
        var teacher = newList[i];
        var teacherBundle = {
            name: teacher.last_name+", "+teacher.first_name,
            focus: teacher.focus,
            email: teacher.email
        };
        var listDiv = createListItemTemplate(teacherBundle);
        $('#teacherlist').append(listDiv);
    }
}


function createListItemTemplate(t) {
    var newDiv = $('<div>').addClass('well container').append(
        $('<ul>').attr('style', 'list-style: none').append(
            $('<li>').append($('<strong>').text(t.name)).append(
            $('<li>').append(t.focus)).append(
            $('<li>').append($('<a>')
                .attr('href', 'mailto:'+t.email)
                .text(t.email))
            )
        )
    );
    return newDiv;
}


$(document).ready(function() {
    //$('#filterUserListForm').on('reset', function(ev) {
    //    clearForm();
    //});

    /*$('#filterUserListForm').on('submit', function(ev) {
        ev.preventDefault();
        var POST_TARGET = "http://localhost:3000/userlist";
        var attributes = {};

        $.each($(this).serializeArray(), function(i, field) {
            attributes[field.name] = field.value;
        });

        getUserList(POST_TARGET, attributes);
    });*/
});
