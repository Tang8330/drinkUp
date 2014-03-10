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
		$(".default-input").show();
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

$(document.body).on('click', 'ul.food li', function() {
	$(".cookie-select").hide();
	$(".cookie-label").hide();
	$(".bagel-select").hide();
	$(".bagel-label").hide();
	$(".donut-select").hide();
	$(".donut-label").hide();
	$(".default-select").hide();
	$(".default-input").hide();
	$(".sandwich-panini-select").hide();
	$(".sandwich-panini-label").hide();
	
	if ($(this).hasClass("cookie")) {
		$(".cookie-select").show();
		$(".cookie-label").show();
		$(".default-input").show();
	} else if ($(this).hasClass("bagel")) {
		$(".bagel-select").show();
		$(".bagel-label").show();
		$(".default-input").show();
	} else if ($(this).hasClass("donut")) {
		$(".donut-select").show();
		$(".donut-label").show();
		$(".default-input").show();
	} else if ($(this).hasClass("sandwich-panini")) {
		$(".sandwich-panini-select").show();
		$(".sandwich-panini-label").show();
		$(".default-input").show();
	} else {
		$(".default-select").show();
		$(".default-input").show();
	}
	$('.food-header').text($(this).text());
});