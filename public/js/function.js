   $('.tos-agreement').click(function () {
        if ($(this).is(':checked')) {
            $('.register-btn').removeAttr('disabled');

        } else {
            $('.register-btn').attr('disabled', true);
        }
    });