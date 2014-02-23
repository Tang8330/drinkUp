   $('.tos-agreement').click(function () {
        if ($(this).is(':checked')) {
            $('.register-btn').removeAttr('disabled');

        } else {
            $('.register-btn').attr('disabled', true);
        }
    });
	
$(document.body).on('click', 'ul.drinks li', function() {
	$(".no-XL-option-select").hide();
	$(".juice-select").hide();
	$(".milk-select").hide();
	$(".milk-type-label").hide();
	$(".default-select").hide();
	$(".default-input").hide();
	
	if ($(this).hasClass("no-XL")) {
		$(".no-XL-option-select").show();
	}
	else if ($(this).hasClass("juice")) {
		$(".juice-select").show();
	}
	else if ($(this).hasClass("milk")) {
		$(".milk-select").show();
		$(".milk-type-label").show();
	}
	else {
		$(".default-select").show();
		$(".default-input").show();
	}
	$('.drink-header').text($(this).text());

});

$(document.body).on('click', 'ul.baked-goods li', function() {
	$(".cookie-select").hide();
	$(".default-select").hide();
	$(".default-input").hide();
	
	if ($(this).hasClass("cookie")) {
		$(".cookie-select").show();
	}
	else {
		$(".default-select").show();
		$(".default-input").show();
	}
	$('.baked-goods-header').text($(this).text());
});