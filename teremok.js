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
							$(this).append('<div class="image"></div>');
						}
					});
					var height = div.css('height');
					
					div.find('.image').css({opacity: 0.0, 'height':height, 'background-image':'url(/vendor/infrajs/imager/?src=/' + images[0] + ')'});
					div.find('.image:first').animate({opacity: 1.0}, 3000).addClass('show').toggleClass('scale');
					
					var i = 1;
					setInterval(function(){
						var current = (div.find('.image.show')?  div.find('.image.show') : div.find('.image:first'));
						var next = ((current.next().length) ? ((current.next().hasClass('show')) ? div.find('.image:first') :current.next()) : div.find('.image:first'));	
						if (i >= images.length) {
							i=0;
						}
						next.css({opacity: 0.0, 'background-image':'url(/vendor/infrajs/imager/?src=/' + images[i++] +')'})
						.addClass('show').toggleClass('scale')
						.animate({opacity: 1.0}, 3000);
						current.animate({opacity: 0.0}, 1000)
						.removeClass('show');
					}, 5000);
				});
			});
		});	
	}
}