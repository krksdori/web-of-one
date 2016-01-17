

var colors = {};

function fetchData(){
	$.get('data/data.txt',init)			
}


// start

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var randColor = '#';
    for (var i = 0; i < 6; i++ ) {
        randColor += letters[Math.floor(Math.random() * 16)];
    }
    return randColor;
}


function init(data){

	data = $.parseJSON(data);


	var wrapper = $( '.wrapper' );

	$.each(data, function(name, nameObj){

		var person = $( '<div class="person">' );
		var location = $( '<div class="location">' ).appendTo( person );
		var nationality = $( '<div class="nationality">' ).appendTo( person );
		var poetics = $( '<div class="google-poetics">' ).appendTo( person );
		var name = $( '<div class="name">' ).text( name )
											.appendTo( poetics ); 


		$.each(nameObj, function(keyword, keywordObj){
			if ( typeof keywordObj == 'string' || typeof keywordObj == 'number' ) {
				var nationality = $( '<div class="nationality">' ).text( nationality)
																  .appendTo( person );

				// show personal

				return true;
			}

			var data = $( '<div class="' + keyword + '">' );
			var keywords = $( '<div class="keywords">' );


			var keywords_html = '<b>' + keyword + '</b>';

			for ( var i=0; i<keywordObj.length; i++ ) {
				var value = keywordObj[ i ];
				var classname = value.toLowerCase( ).split( ' ' ).join( '-' );

				colors[classname] = getRandomColor();

				keywords_html += '<div class="' + classname + '">' + value + '</div>';
			}


			keywords.html( keywords_html )
					.appendTo( data );

			data.appendTo( poetics );
		})



		person.appendTo( wrapper );
	});

	

	$(".keywords div").on("mousedown", function(){

		var keywordClass = "";

		if( $(this).hasClass('highlight') ){

			var classes = $(this).attr("class").split(" ");
			classes.splice( classes.indexOf("highlight", 1));
			keywordClass = classes.join(" ").trim();
			var selector = ".keywords ."+keywordClass;

			$(selector).each(function(){
				$(this).css({
					'background-color': 'white',
					'color': 'black'
				});
			});

		} else {
			
			keywordClass = $(this).attr("class");
			var selector = ".keywords ."+keywordClass;
			var color  = colors[keywordClass];

			$(selector).each(function(){
				$(this).css({
					'background-color': color,
					'color': 'white'
				});
			});

		}


		$(selector).each(function(){
			$(this).toggleClass("highlight");
		});
	
	});

}


$( document ).ready( fetchData );

