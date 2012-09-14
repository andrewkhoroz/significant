/*
Plugin developed by Andrew Khoroz
@akhoroz
andrew.khoroz@gmail.com
*/

(function($) {

    var defaults = {
        offset:{
            top:0
        }
    };

    $.fn.fixedscroll = function(opts) {

        var options = $.extend(defaults, opts);

        var el = $(this);
        var wrapOuter=el.parents('.wrapper-outer:first');
        var wrapInner=el.parents('.wrapper-inner:first');
        var const_=315;
        var topOffset=85;
        $(window).bind('load scroll', function(e) {
            var bottomLimit=$('#footer').offset().top-el.height()-100;
            var scrollTop=$(window).scrollTop();
            if (scrollTop<=const_-topOffset){
                el.css({
                    top: const_
                });
                wrapOuter.css({
                    position: 'absolute'
                });
            }else if(scrollTop+topOffset >const_&& scrollTop<bottomLimit){
                el.css({
                    top: topOffset
                });
                wrapOuter.css({
                    position: 'fixed'
                });
                
            }else if(scrollTop>=bottomLimit){
                el.css({
                    top: bottomLimit-scrollTop+topOffset
                });
            }
        });
    };

})(jQuery);