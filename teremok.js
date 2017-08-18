window.Teremok = {
	init:function() {
		$(function(){
			$('.teremok').not('.teremoked').each( function ( ){
				$(this).addClass('teremoked');//Защита от двойного срабатывания
				var div=$(this);
				var src = div.data('src');
				var data = {
					"src": src
				}

				$.getJSON('/vendor/oduvanio/teremok/teremok.php', data, function (ans) {
					if (!ans.result) {
						if (ans.msg) ans.msg = 'На сервере произошла ошибка c teremok';
						console.error(ans.msg);
						return;
					}
					Teremok.ans=ans;
					var images = ans.list;

					div.each(function(){
						for (var i = 0, l = images.length; i < l; i++) {
							$(this).append('<div class="image"></div>');
						}
						if (images[i].btnhref !== null) {
							$(this).append('<a class="btn ' + images[i].btnhref.styleBtn + ' buttonTeremok" href="' + images[i].btnhref.href + '">' + images[i].btnhref.title + '</a>');	
						} else {
							$(this).append('<a class="buttonTeremok" href="">""</a>');
						}
					});
					var height = div.css('height');
					
					var image = div.find('.image');
					var button = div.find('.buttonTeremok');
					image.css({opacity: 0.0, 'height':height, 'background-image':'url(/vendor/infrajs/imager/?w=2500&src=' + images[0] + ')'});
					button.css({'display': 'none'});
					image.eq(0).animate({opacity: 1.0}, 3000).toggleClass('scale');
					if (image.eq(0).next('.buttonTeremok')[0].innerHTML !== "\"\"") {
						image.eq(0).next('.buttonTeremok').css({'display': 'block'}).animate({opacity: 1.0}, 2000);
					}
					
					var i = 1;
					var timer = setTimeout(function tick(){
						var div = $('.teremok');
						var button = div.find('.buttonTeremok');
						button.css({'display': 'none', opacity: 0.0});
						var height = div.css('height');
						
						if (i >= images.length) {
							i=0;
						}
						if (i == 0) {
							image.last().animate({opacity: 0.0}, 1000);
							if (image.eq(i).next('.buttonTeremok')[0].innerHTML !== "\"\"") {
								image.eq(i).next('.buttonTeremok').css({'display': 'block'}).animate({opacity: 1.0}, 2000);
							}
						} else {
							image.eq(i-1).animate({opacity: 0.0}, 1000);
							if (image.eq(i).next('.buttonTeremok')[0].innerHTML !== "\"\"") {
								image.eq(i).next('.buttonTeremok').css({'display': 'block'}).animate({opacity: 1.0}, 2000);
							}
						}
						image.eq(i).css({'height':height, opacity: 0.0, 'background-image':'url(/vendor/infrajs/imager/?w=2500&src=' + images[i++] +')'}).toggleClass('scale')
						.animate({opacity: 1.0}, 3000);
						timer = setTimeout(tick, 20000)
					}, 20000);
				});
			});
		});	
	}
}
