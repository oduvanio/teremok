window.Teremok = {
	init:function() {
		$(function(){
			$('.teremok').each(function(){
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
							$(this).prepend('<div class="image"></div>');
						}
					});
					var height = div.css('height');
					
					var image = div.find('.image');
					image.css({opacity: 0.0, 'height':height, 'background-image':'url(/vendor/infrajs/imager/?w=1000&src=' + images[0] + ')'});
					image.eq(0).animate({opacity: 1.0}, 3000).addClass('show').toggleClass('scale');
					
					var i = 1;
					setInterval(function(){
						if (i >= images.length) {
							i=0;
						}
						if (i == 0) {
							image.last().animate({opacity: 0.0}, 1000).removeClass('show');
						} else {
							image.eq(i-1).animate({opacity: 0.0}, 1000).removeClass('show');
						}
						image.eq(i).css({opacity: 0.0, 'background-image':'url(/vendor/infrajs/imager/?w=1000&src=' + images[i++] +')'}).addClass('show').toggleClass('scale')
						.animate({opacity: 1.0}, 3000);
					}, 5000);
				});
			});
		});	
	}
}