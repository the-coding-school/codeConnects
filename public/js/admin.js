$(document).ready(function() {
    $('.approveToggle').click(function() {
        var $clickTarget = $(this);
        var $appBtn = $appIcon = null;

        if ($clickTarget.hasClass('btn')) {
            $appBtn = $clickTarget;
            $appIcon = $clickTarget.children('.glyphicon');;
        }
        else if ($clickTarget.hasClass('glyphicon')) {
            $appIcon = $clickTarget;
            $appBtn = $clickTarget.closest('.btn');
        }

        var emailCellText = {
            email: $clickTarget.closest("tr").children("td:first").html()
        };

        $.ajax({
            url: "http://localhost:3000/teachers",
            data: emailCellText,
            method: 'POST',
            success: function(res) {
                if (res.newStatus) {
                    $appBtn.removeClass('btn-danger').addClass('btn-success');
                    $appIcon.removeClass('glyphicon-remove').addClass('glyphicon-ok');
                }
                else {
                    $appBtn.removeClass('btn-success').addClass('btn-danger');
                    $appIcon.removeClass('glyphicon-ok').addClass('glyphicon-remove');
                }
            },
            error: function(err) {
                console.log('Approve toggle failed!');
                console.log(err.responseText);
            }
        });

    });
});
