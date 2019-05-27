$(function() {
    $('.slider-block').slick({
        arrows: false,
        autoplay: true,
        autoplaySpeed: 6000,
        speed: 1100,
        dots: true
    });

    $('.mobile-menu-btn').click(function(){
    	$(this).toggleClass('is-active');
    	$('.header-nav').toggleClass('header-nav_active').stop().slideToggle();
    })

    $(document).keyup(function(e) {
		if (e.keyCode == 27) {
			$('.header-nav_active').removeClass('header-nav_active').slideUp();
			$('.mobile-menu-btn').removeClass('is-active');
		}
	}).click(function() {
		$('.header-nav_active').removeClass('header-nav_active').slideUp();
		$('.mobile-menu-btn').removeClass('is-active');
	});
	$('.header').click(function(e) {
		e.stopPropagation();
	});

	$(window).resize(function(){
		if($(window).width() > 768) {
			$('.header-nav').removeAttr('style');
		}
	})

});