$(function (){
    var topoffset = 50;
    $("body").scrollspy({
        target: '.navbar-fixed-top',
        offset: topoffset
    });
    
    
    $('.navbar').click(function() {
        if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top-topoffset+2
                }, 500);
            return false;
            }
        }
    });
  
  
    var $animation_element = $('.anime-view');
    var $window = $(window);
    
    
    function check_in_view(){
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);
        
        $.each($animation_element, function (){
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);
            
            if(( element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position - 300)){
                $element.addClass('animated');
            }
        });
    }
    
    $window.on('scroll resize', check_in_view);
    $window.trigger('scroll');
    
    
    var $header = $('.navbar-fixed-top');
    var prev = 0;
    
    $window.on('scroll', function (){
        var scrolltop = $window.scrollTop();
        if(scrolltop > 300){ 
            $header.toggleClass('menu-hide', scrolltop > prev);
            prev = scrolltop;
        }else{
            $header.removeClass('menu-hide');
        }
    });
  
});