var price = [{"Item":"Coffee-S","Price":1.33},
{"Item":"Coffee-M","Price":1.52},
{"Item":"Coffee-L","Price":1.71},
{"Item":"Coffee-XL","Price":1.9},
{"Item":"Tea-S","Price":1.33},
{"Item":"Tea-M","Price":1.52},
{"Item":"Tea-L","Price":1.71},
{"Item":"Tea-XL","Price":1.9},
{"Item":"French Vanilla-S","Price":1.69},
{"Item":"French Vanilla-M","Price":1.95},
{"Item":"French Vanilla-L","Price":2.24},
{"Item":"French Vanilla-XL","Price":2.48},
{"Item":"Hot Chocolate-S","Price":1.38},
{"Item":"Hot Chocolate-M","Price":1.57},
{"Item":"Hot Chocolate-L","Price":1.81},
{"Item":"Hot Chocolate-XL","Price":2},
{"Item":"Cafe Mocha-S","Price":1.9},
{"Item":"Cafe Mocha-M","Price":2.24},
{"Item":"Cafe Mocha-L","Price":2.43},
{"Item":"Cafe Mocha-XL","Price":2.76},
{"Item":"Latte/Cappuccino-S","Price":2},
{"Item":"Latte/Cappuccino-M","Price":2.59},
{"Item":"Latte/Cappuccino-L","Price":3.29},
{"Item":"Vanilla Bean Latte-S","Price":2.25},
{"Item":"Vanilla Bean Latte-M","Price":2.84},
{"Item":"Vanilla Bean Latte-L","Price":3.54},
{"Item":"Chocolate Latte-S","Price":2.6},
{"Item":"Chocolate Latte-M","Price":3.19},
{"Item":"Chocolate Latte-L","Price":3.89},
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
{"Item":"Iced Capp-S","Price":1.89},
{"Item":"Iced Capp-M","Price":2.61},
{"Item":"Iced Capp-L","Price":3.23},
{"Item":"Iced Coffee-S","Price":1.48},
{"Item":"Iced Coffee-M","Price":1.81},
{"Item":"Iced Coffee-L","Price":2.13},
{"Item":"Real Fruit Smoothie-S","Price":2.69},
{"Item":"Real Fruit Smoothie-M","Price":3.49},
{"Item":"Real Fruit Smoothie-L","Price":4.29},
{"Item":"Frozen Lemonade-S","Price":1.49},
{"Item":"Frozen Lemonade-M","Price":2},
{"Item":"Frozen Lemonade-L","Price":2.33},
{"Item":"Iced Latte-S","Price":2},
{"Item":"Iced Latte-M","Price":2.59},
{"Item":"Iced Latte-L","Price":3.29},
{"Item":"Vanilla Bean Iced Latte-S","Price":2.25},
{"Item":"Vanilla Bean Iced Latte-M","Price":2.84},
{"Item":"Vanilla Bean Iced Latte-L","Price":3.54},
{"Item":"Iced Chocolate Latte-S","Price":2.6},
{"Item":"Iced Chocolate Latte-M","Price":3.19},
{"Item":"Iced Chocolate Latte-L","Price":3.89}];


/**
 *
 *
 *
 *
 *
**/
var order = new Array();
var subtotal = 0;
$(document.body).on('click', '.add-drinks', function() {
	calculatePrice();
});
function calculatePrice() {
	var items = new Object();
	items.name = $(".drink-header").text();
	items.quantity = $(".drink-item").val();
	items.size = $(".default-select").val();
	// clear vals
	$(".drink-item").val("1");
	console.log(JSON.stringify(items));
	var query = items.name+"-"+items.size;
	console.log(query);
	var label = "Purchased:"
	
	for (var i = 0; i < price.length; i++) {
		if (price[i].Item == query) {
			subtotal = subtotal + parseFloat(price[i].Price);
			subtotal = +subtotal.toFixed(2);
			//update Prices
			$(".subtotal").text(subtotal);
			var size;
			switch(items.size)
				{
				case "S":
					  size = "Small";
					  break;
				case "M":
					  size = "Medium";
					  break;
				case "L":
					size="Large";
					break;
				default:
					size = "Extra Large";
				}
			var template= items.quantity + " " + size + " " + items.name + " - " + price[i].Price + "<br>";
			$(".items-ordered").append(template);
		}		
	}
	
}
