	var rowNum = 0;
	var login = "oneshopca";
	var api_key = "R_4bdf32256cb14ada80777c5f6f0d0ac1";
	
	$('#add').click( function() {
	rowNum ++;
	var row = "<div><input type='text' name='searchTag' placeholder='Search Tag' required><input type='button' id='remove' class='btn inputApprover' value='Remove'/></div>";
	$('#itemRows').append(row);
	});
	
	$(document.body).on('click', '#remove', function() {
		$(this).closest('div').remove();
	});
	
	$(document.body).on('click', '#bitlyShorten', function() {
		var long_url = $('#bitly').val();
		get_short_url(long_url, function(short_url) {
			$('#bitly').val(short_url);
		});
	});
	
	$(document.body).on('click', '.groupPost', function() {
		$('.groupPostbtn').fadeIn('slow');
	});
	
	$(document.body).on('click', '#edit_profile', function() {
		if ($(".profile").hasClass("hidden")) {
			$(".profile").removeClass("hidden");
			$(".profile_hide").addClass("hidden");
		}
		else {
			$(".profile").addClass("hidden");
			$(".profile_hide").removeClass("hidden");
		}
	});
	$(document.body).on('click', '.addInvite', function() {
	var temp = '<input type="email" class="form-control invite" name="username" placeholder="Email">';
	$('.invite').after(temp);
	});
	$(document.body).on('click', '.delInvite', function() {
		console.log('wot');
	$(this).closest('.invite').remove();
	});
	
	function get_short_url(long_url, func) {
		$.getJSON(
			"http://api.bitly.com/v3/shorten?callback=?", 
			{ 
				"format": "json",
				"apiKey": api_key,
				"login": login,
				"longUrl": long_url
			},
			function(response)
			{
				func(response.data.url);
			}
		);
	}
	
	$(document.body).on('click', '.note', function(e) {
		url = window.location;
		url = url+"/"+e.target.id;
		url = url.replace("team", "note");
		console.log('url is ' + url);
		getNote(url);
	});
	
	$(document.body).on('click', '.edit-btn', function(e) {
		$(".noteTitleEdit").val($(".noteTitle").text());
		CKEDITOR.instances.editor1.setData($(".noteContent").html());
	});
	
	function getNote(url) {
		$.get( url, function( data ) {
			$(".noteContent").html(data.noteContent);
			$(".noteTitle").text(data.title);
			$(".noteTitle").attr("id", data.id);
		});
	}