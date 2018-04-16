window.Teremok = {
	count: 0,
	timerTeremok: false,
	init: function() {
		$( function() {
			$( '.teremok' ).not( '.teremoked' ).each( function() {
				
				$(this).addClass( 'teremoked' );//Защита от двойного срабатывания
				var div = $( this );
				var src = div.data( 'src' );
				var data = {
					"src": src
				}
				var button = div.find( '.buttonTeremok' );
				button.css( { 'display': 'none', opacity: 0.0 } );
				$.getJSON( '/vendor/oduvanio/teremok/teremok.php', data, function( ans ) {
					if ( !ans.result ) {
						if ( ans.msg ) ans.msg = 'На сервере произошла ошибка c teremok';
						console.error( ans.msg );
						return;
					}

					Teremok.ans = ans;
					localStorage.setItem('Teremok', JSON.stringify(ans.list));
					var images = JSON.parse(localStorage.getItem('Teremok'));
					

					div.each( function() {
						if(ans.indicators) {
							$( this ).append( '<div class="teremokIndicators"></div>' );
						}
						for ( var i = 0, l = images.length; i < l; i++ ) {
							$( this ).append( '<div class="image" id="imageTeremok' + i + '" style="background-image:url(/vendor/infrajs/imager/?w=2500&src=' + images[i].image +')"></div>' );
							if(ans.indicators) {
								$( '.teremokIndicators' ).append('<a class="teremokIndicator" href="'+ i + '" id="teremokIndicator' + i + '"></a>');
								document.getElementById('teremokIndicator' + i).onclick = function() {
									Teremok.count = this.getAttribute('href');
									clearTimeout(Teremok.timerTeremok);
									Teremok.tick()
									return false;
								}
							}
						}
					});
					clearTimeout(Teremok.timerTeremok);
					Teremok.tick();
				});
			});
		});	
	},
	tick: function() {
		var images = JSON.parse(localStorage.getItem('Teremok'));
		var div = $( '.teremok' );
		var teremokIndicator = div.find('.teremokIndicator');
		teremokIndicator.removeClass('active');
		var button = div.find( '.buttonTeremok' );
		button.css( { 'display': 'none', opacity: 0.0 } );
		var height = div.css( 'height' );
		
		if (Teremok.count >= images.length) {
			Teremok.count = 0;
		}
		teremokIndicator.eq(Teremok.count).addClass('active');
		$('#imageTeremok' + Teremok.count).css( { 'height':height } ).appendTo(div).animate( { opacity: 1.0 }, 2000 ).toggleClass( 'scale' );
		console.log(images[Teremok.count].btnhref);
		if ( images[Teremok.count].btnhref !== null ) {
			if (button[0] != undefined) {
				button[0].innerHTML = images[Teremok.count].btnhref.title;
				button[0].href = images[Teremok.count].btnhref.href;
				button.css( { 'display': 'block' } ).animate( { opacity: 1.0 }, 2000 );
				console.log('111');
			}
		}
		Teremok.count++;
		clearTimeout(Teremok.timerTeremok);
		Teremok.timerTeremok = setTimeout( Teremok.tick, 20000 );
	}
}

