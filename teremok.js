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
					});
					var height = div.css('height');
					
					var image = div.find('.image');
					image.css({opacity: 0.0, 'height':height, 'background-image':'url(/vendor/infrajs/imager/?w=2500&src=' + images[0] + ')'});
					image.eq(0).animate({opacity: 1.0}, 3000).toggleClass('scale');
					
					var i = 1;
					setInterval(function(){
						var height = div.css('height');
						
						if (i >= images.length) {
							i=0;
						}
						if (i == 0) {
							image.last().animate({opacity: 0.0}, 1000);
						} else {
							image.eq(i-1).animate({opacity: 0.0}, 1000);
						}
						image.eq(i).css({'height':height, opacity: 0.0, 'background-image':'url(/vendor/infrajs/imager/?w=2500&src=' + images[i++] +')'}).toggleClass('scale')
						.animate({opacity: 1.0}, 3000);
					}, 10000);
				});
			});
		});	
	}
}
