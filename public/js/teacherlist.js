function clearForm() {
    $('ul#teacherlist').html('');
    $('input[type="hidden"]').val('');

    var buttonNames = ['focus', 'language', 'ethnicity', 'gender'];
    var ddCaption = "Select&nbsp;<span class='caret'></span>" ;
    for (var i in buttonNames) {
        $('#btn-'+buttonNames[i]).html(ddCaption);
    }
}

function updateList(res) {
    var newList = res.userlist;

    for (var i in newList) {
        var teacher = newList[i];
        var teacherName = teacher.last_name + ", " + teacher.first_name;
        var teacherFocus = teacher.focus;
        var teacherEmail = teacher.email;

        var newDiv = $('<div>').addClass('well container').append(
            $('<ul>').attr('style', 'list-style: none').append(
                $('<li>').append(
                    $('<strong>').text(teacherName)
                ).append(
                    $('<li>').append(
                        teacherFocus
                    ).append(
                        $('<li>').append(
                            teacherEmail
                        )
                    )
                )
            )
        );

        $('#teacherlist').append(newDiv);
    }
}

function getTeacherList(targetUrl, data) {
    $.ajax({
        url: targetUrl,
        data: data,
        method: 'POST',
        success: function(res) {
            $('ul#teacherlist').html('');
            updateList(res);
        }
    });
}

$(document).ready(function() {
    $('#filterTeacherListForm').on('reset', function(ev) {
        clearForm();
    });

    $('#filterTeacherListForm').on('submit', function(ev) {
        ev.preventDefault();
        var POST_TARGET = "http://localhost:3000/teacherlist";
        var attributes = {};

        $.each($(this).serializeArray(), function(i, field) {
            attributes[field.name] = field.value;
        });

        getTeacherList(POST_TARGET, attributes);
    });
});
