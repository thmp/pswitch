// Minify: http://javascriptcompressor.com/

(function($) {
    $.fn.pswitch = function(options) {
        
        var newpos, clicked, active, offset;

        function desaturate(r, g, b, k) { // k is how much color should be desaturated where k=1 is full desaturation
            var intensity = 0.3 * r + 0.59 * g + 0.11 * b;
            r = Math.floor(intensity * k + r * (1 - k));
            g = Math.floor(intensity * k + g * (1 - k));
            b = Math.floor(intensity * k + b * (1 - k));
            return [r, g, b];
        }
        
        function rgb_to_string(r, g, b) {
            return 'rgb(' + r + ', ' + g + ', ' + b + ')';
        }
        
        function desaturate_background(element, k) {
            rgb1 = desaturate(30, 87, 153, k);
            rgb2 = desaturate(125, 185, 232, k);
            rgb1 = rgb_to_string(rgb1[0], rgb1[1], rgb1[2]);
            rgb2 = rgb_to_string(rgb2[0], rgb2[1], rgb2[2]);
            element.css('background', create_gradient(rgb1, rgb2));
        }
        
        function create_gradient(rgb1, rgb2) {
            return 'linear-gradient(to bottom, '+rgb1+' 0%, '+rgb2+' 100%)';
        }
        
        function move(e) {
            pos = e.pageX-22/2.0; // change to middle of handle
            newpos = pos - offset;
            if (newpos <= 1) {
                newpos = 1;
            } 
            if (newpos >= 29) {
                newpos = 29;   
            }
            ratio = newpos/(29.-1.);
            desaturate_background(active.parent(), ratio);
            active.css('left', newpos+'px');
        }
        
        
        var settings = $.extend({
            
        }, options);  
        
        $(document).mousemove(function(e) {
            if(clicked) {
                move(e);   
            }
        });
        $(document).mouseup(function(e) {
            if (clicked) {
                checkbox = active.parent().parent().find('input[type=checkbox]');
                if (e.pageX-22/2.0 - offset < 29/2.0) {
                    check(checkbox);
                } else {
                    uncheck(checkbox);
                }   
            }
            clicked = false;
            $('body').css('user-select', '');
        });
        
        function check(checkbox) {
            checkbox.prop('checked', true);
            desaturate_background(checkbox.parent().find('.pswitch-background'), 0.0);
            checkbox.parent().find('.pswitch-handle').css('left', '1px');
        }
        
        function uncheck(checkbox) {
            checkbox.removeAttr('checked');
            desaturate_background(checkbox.parent().find('.pswitch-background'), 1.0);
            checkbox.parent().find('.pswitch-handle').css('left', '29px');
        }
        
        function update_status(checkbox) {
            if(checkbox.prop('checked')) {
                check(checkbox);   
            } else {
                uncheck(checkbox);
            }
        }
        
        return this.filter('input[type=checkbox]').each(function() {
              
            // find values
            datachecked = $(this).attr("data-checked");
            dataunchecked = $(this).attr("data-unchecked");
            
            // append style
            $(this)
                .wrap("<div class='pswitch-wrapper'></div>")
                .hide();
        
            $(this).before("<div class='pswitch-on'>"+datachecked+"</div>")
                .before("<div class='pswitch-background'><div class='pswitch-handle'></div></div>")
                .before("<div class='pswitch-off'>"+dataunchecked+"</div>");

            // handle click events on the labels
            $(this).parent().find('.pswitch-on').click(function(e) {
                check($(this).parent().find('input[type=checkbox]'));
            });
            $(this).parent().find('.pswitch-off').click(function(e) {
                uncheck($(this).parent().find('input[type=checkbox]'));
            });
            
            // assign mousedown callback
            $(this).parent().find('.pswitch-handle').mousedown(function(e) {
                active = $(this);
                clicked = true;
                offset = $(this).parent().offset().left;
                $('body').css('user-select', 'none');
                move(e);
            });
            
            // not working
            /*$(this).change(function () {
                console.log('changed');
                update_status($(this)); 
            });*/
            
            $(this).on('check', function(){check($(this))});
            $(this).on('uncheck', function(){uncheck($(this))});
            
            update_status($(this));
            
        }); 
        
    }
}(jQuery));