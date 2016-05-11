window.Teremok = {
	init:function() {
		$(function(){

			var div = $('.teremok');
			
			var images = ['images/image1.jpg', 'images/image2.jpg', 'images/image3.jpg'];

			div.each(function(){
				for (var i = 0, l = images.length; i < l; i++) {
					$(this).append('<div class="image"></div>');
				}
			});

			div.find('.image').css({opacity: 0.0, 'background-image':'url("image1.jpg")'});
			div.find('.image:first').css({opacity: 1.0}).addClass('show').addClass('scale');
			div.find('.image:first').addClass('scale');
			
			var i = 1;
			setInterval(function(){
				var current = (div.find('.image.show')?  div.find('.image.show') : div.find('.image:first'));
				var next = ((current.next().length) ? ((current.next().hasClass('show')) ? div.find('.image:first') :current.next()) : div.find('.image:first'));	
				if (i >= images.length) {
					i=0;
				}
				next.css({opacity: 0.0, 'background-image':'url(' + images[i++] +')'})
				.addClass('show').toggleClass('scale')
				.animate({opacity: 1.0}, 3000);
				current.animate({opacity: 0.0}, 1000)
				.removeClass('show');
			}, 5000);
		});
	}
}