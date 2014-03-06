$.cookie.json = true;
var price = [{"Item":"Coffee-Small","Price":1.33},
{"Item":"Coffee-Medium","Price":1.52},
{"Item":"Coffee-Large","Price":1.71},
{"Item":"Coffee-Extra Large","Price":1.9},
{"Item":"Tea-Small","Price":1.33},
{"Item":"Tea-Medium","Price":1.52},
{"Item":"Tea-Large","Price":1.71},
{"Item":"Tea-Extra Large","Price":1.9},
{"Item":"French Vanilla-Small","Price":1.69},
{"Item":"French Vanilla-Medium","Price":1.95},
{"Item":"French Vanilla-Large","Price":2.24},
{"Item":"French Vanilla-Extra Large","Price":2.48},
{"Item":"Hot Chocolate-Small","Price":1.38},
{"Item":"Hot Chocolate-Medium","Price":1.57},
{"Item":"Hot Chocolate-Large","Price":1.81},
{"Item":"Hot Chocolate-Extra Large","Price":2},
{"Item":"Cafe Mocha-Small","Price":1.9},
{"Item":"Cafe Mocha-Medium","Price":2.24},
{"Item":"Cafe Mocha-Large","Price":2.43},
{"Item":"Cafe Mocha-Extra Large","Price":2.76},
{"Item":"Latte/Cappuccino-Small","Price":2},
{"Item":"Latte/Cappuccino-Medium","Price":2.59},
{"Item":"Latte/Cappuccino-Large","Price":3.29},
{"Item":"Vanilla Bean Latte-Small","Price":2.25},
{"Item":"Vanilla Bean Latte-Medium","Price":2.84},
{"Item":"Vanilla Bean Latte-Large","Price":3.54},
{"Item":"Chocolate Latte-Small","Price":2.6},
{"Item":"Chocolate Latte-Medium","Price":3.19},
{"Item":"Chocolate Latte-Large","Price":3.89},
{"Item":"Flavour Shot","Price":0.25},
{"Item":"Whipped/Espresso Shot","Price":0.6},
{"Item":"Extreme Italian","Price":4.99},
{"Item":"Extreme Italian  Donut Combo","Price":6.79},
{"Item":"Extreme Italian Soup Combo","Price":8.25},
{"Item":"Turkey Bacon Club","Price":4.99},
{"Item":"Turkey Bacon Club Donut Combo","Price":6.79},
{"Item":"Turkey Bacon Club Soup Combo","Price":8.25},
{"Item":"Ham & Swiss","Price":4.19},
{"Item":"Ham & Swiss Donut Combo","Price":5.99},
{"Item":"Ham & Swiss Soup Combo","Price":7.45},
{"Item":"BLT","Price":4.19},
{"Item":"BLT Donut Combo","Price":5.99},
{"Item":"BLT Soup Combo","Price":7.45},
{"Item":"Chicken Salad","Price":3.29},
{"Item":"Chicken Salad Donut Combo","Price":5.09},
{"Item":"Chicken Salad Soup Combo","Price":6.55},
{"Item":"Tuscan Chicken Panini","Price":5.29},
{"Item":"Bacon, Tomato and Cheese Panini","Price":5.29},
{"Item":"Grilled Cheese Panini","Price":3.99},
{"Item":"Hot Chicken Wrap","Price":1.99},
{"Item":"Soup","Price":2.89},
{"Item":"Soup Donut Combo","Price":4.69},
{"Item":"Soup Bagel Combo","Price":4.85},
{"Item":"Chili","Price":4.09},
{"Item":"Chili Donut Combo","Price":5.89},
{"Item":"Iced Capp-Small","Price":1.89},
{"Item":"Iced Capp-Medium","Price":2.61},
{"Item":"Iced Capp-Large","Price":3.23},
{"Item":"Iced Coffee-Small","Price":1.48},
{"Item":"Iced Coffee-Medium","Price":1.81},
{"Item":"Iced Coffee-Large","Price":2.13},
{"Item":"Real Fruit Smoothie(Mixed Berry)-Small","Price":2.69},
{"Item":"Real Fruit Smoothie(Mixed Berry)-Medium","Price":3.49},
{"Item":"Real Fruit Smoothie(Mixed Berry)-Large","Price":4.29},
{"Item":"Real Fruit Smoothie(Strawberry Banana)-Small","Price":2.69},
{"Item":"Real Fruit Smoothie(Strawberry Banana)-Medium","Price":3.49},
{"Item":"Real Fruit Smoothie(Strawberry Banana)-Large","Price":4.29},
{"Item":"Real Fruit Smoothie(Orange Tangerine)-Small","Price":2.69},
{"Item":"Real Fruit Smoothie(Orange Tangerine)-Medium","Price":3.49},
{"Item":"Real Fruit Smoothie(Orange Tangerine)-Large","Price":4.29},
{"Item":"Frozen Lemonade-Small","Price":1.49},
{"Item":"Frozen Lemonade-Medium","Price":2},
{"Item":"Frozen Lemonade-Large","Price":2.33},
{"Item":"Frozen Raspberry Lemonade-Small","Price":1.49},
{"Item":"Frozen Raspberry Lemonade-Medium","Price":2},
{"Item":"Frozen Raspberry Lemonade-Large","Price":2.33},
{"Item":"Iced Latte-Small","Price":2},
{"Item":"Iced Latte-Medium","Price":2.59},
{"Item":"Iced Latte-Large","Price":3.29},
{"Item":"Vanilla Bean Iced Latte-Small","Price":2.25},
{"Item":"Vanilla Bean Iced Latte-Medium","Price":2.84},
{"Item":"Vanilla Bean Iced Latte-Large","Price":3.54},
{"Item":"Iced Chocolate Latte-Small","Price":2.6},
{"Item":"Iced Chocolate Latte-Medium","Price":3.19},
{"Item":"Iced Chocolate Latte-Large","Price":3.89}];

/**
 *
 *
 *
 *
 *
**/
var order = new Array();
var id = "";

$(document.body).on('click', '.add-drinks', function() {
	$.cookie('subtotal',0);
	calculatePrice();
});
function calculatePrice() {
	var subtotal = 0;
	var items = new Object();
	var subtotal = 0;
	items.name = $(".drink-header").text();
	items.quantity = $(".drink-item").val();
	items.size = $(".default-select").val();
	items.desc = $(".special-note").val();
	// clear vals
	$(".drink-item").val("1");
	var query = items.name+"-"+items.size;
	for (var i = 0; i < price.length; i++) {
		if (price[i].Item == query) {
			subtotal = parseFloat($(".subtotal").text()) + (parseFloat(items.quantity)*parseFloat(price[i].Price));
			subtotal = +subtotal.toFixed(2);
			realPrice = parseFloat(items.quantity)*parseFloat(price[i].Price);
			realPrice = +realPrice.toFixed(2);
			//update Prices
			$(".subtotal").text(subtotal);
			$.cookie('subtotal',subtotal);
			var template= items.quantity + " " + items.size + " " + items.name + " - $" + realPrice + "<br>";
			$(".items-ordered").append(template);
			order.push(items);
		}
	}
	$.cookie("order", order);
}

$(document.body).on('click', '.order-submit', function() {
	var orderName = $(".order-name").val();
	var postURL = "/order";
	$.post(postURL , { name : orderName });
	$("#main").hide();
	$("#success").show();
});

$(document.body).on('click', '.reOrder', function() {
	location.reload();
});


$(document.body).on('click', '.order-details', function() {
	checkOrderByID($(this).attr("id"));
});


$(document.body).on('click', '.completed', function() {
	$("#"+id).fadeOut("slow");
});


function checkOrder() {
	var getURL = "/getOrders";
	$.get( getURL, function( data ) {
		for (var i = 0; i < data.length; i++ ) {
			if ($("#"+data[i].id).text() == "") {
			var temp2 = "";
			for (var j = 0; j < data[i].detail.length; j++ ){
				temp2 = temp2 + "<div class='col-xs-12'>" + data[i].detail[j].name + " - " + data[i].detail[j].size + " - " + data[i].detail[j].quantity + "</div> ";
			}
			var temp = "<div data-toggle='modal' data-target='#myModal' class='row md-buffer order-details' id=" + data[i].id + "> <div class='col-xs-2'>" + data[i].name + "</div><div class='col-xs-6'>" + temp2 + "</div><div class='col-xs-2'>" + data[i].added + "</div>"+"<div class='col-xs-2'>$" + data[i].total + "</div></div>";
			$(".orders").append(temp);
			}
		}
	});
}

function checkOrderByID(queryID) {
	var temp = "";
	var getURL = "/getOrders/"+queryID;
	id = queryID;
	$("#modalBody").empty();
	//console.log(getURL);
	$.get( getURL, function( data ) {
		console.log(JSON.stringify(data));
		$("#modalHeader").text(data.name +"'s Order Details on " + data.added);
		for (var i = 0; i < data.detail.length; i++) {
			if (data.detail[i].desc) temp = temp + "<div class='col-xs-12'>" + data.detail[i].name + " - " + data.detail[i].size + " - " + data.detail[i].quantity + "<i> "+ data.detail[i].desc + " </i></div> ";
			else {
				temp = temp + "<div class='col-xs-12'>" + data.detail[i].name + " - " + data.detail[i].size + " - " + data.detail[i].quantity + "</div> ";
			}
		}
		$("#modalBody").append(temp);
	});
}
