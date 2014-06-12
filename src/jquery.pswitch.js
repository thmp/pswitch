// Minify: http://javascriptcompressor.com/

(function($) {
	$.fn.pswitch = function(options) {
		
		var newpos, clicked, active, offset, transition;

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
			//rgb1 = desaturate(30, 87, 153, k);
			//rgb2 = desaturate(125, 185, 232, k);
			rgb1 = desaturate(settings.r, settings.g, settings.b, k);
			rgb2 = desaturate(settings.r2, settings.g2, settings.b2, k);
			rgb1 = rgb_to_string(rgb1[0], rgb1[1], rgb1[2]);
			rgb2 = rgb_to_string(rgb2[0], rgb2[1], rgb2[2]);
			if(settings.flat) {
				element.css('background', rgb1);
			} else {
				element.css('background', create_gradient(rgb1, rgb2));
			}
			element.css('background-color', rgb1);
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
			r: 30,
			g: 87,
			b: 153,
			flat: false
		}, options);
		settings.r2 = settings.r > 155 ? 255 : settings.r + 100;
		settings.g2 = settings.g > 155 ? 255 : settings.g + 100;
		settings.b2 = settings.b > 155 ? 255 : settings.b + 100;
		
		$(document).mousemove(function(e) {
			if(clicked) {
				move(e);   
			}
		});
		$(document).mouseup(function(e) {
			if (clicked) {
				active.css('transition', transition);
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
			checkbox.prop('checked', true).trigger('change');
			desaturate_background(checkbox.parent().find('.pswitch-background'), 0.0);
			checkbox.parent().find('.pswitch-handle').css('left', '1px');
		}
		
		function uncheck(checkbox) {
            checkbox.prop('checked', false).trigger('change');
			desaturate_background(checkbox.parent().find('.pswitch-background'), 1.0);
			checkbox.parent().find('.pswitch-handle').css('left', '29px');
		}

		function disable(checkbox) {
			checkbox.attr("disabled", "disabled");
			checkbox.parent().addClass("pswitch-disabled");
		}

		function enable(checkbox) {
			checkbox.removeAttr("disabled");
			checkbox.parent().removeClass("pswitch-disabled");
		}

		function toggle(checkbox) {
			if(checkbox.prop('checked')) {
				uncheck(checkbox);
			} else {
				check(checkbox);
			}
		}
		
		function update_status(checkbox) {
			if(checkbox.prop('checked')) {
				check(checkbox);   
			} else {
				uncheck(checkbox);
			}

			if(checkbox.is(":disabled")) {
				disable(checkbox);
			} else {
				enable(checkbox);
			}
		}
		
		return this.filter('input[type=checkbox]').each(function() {
			
			// do not continue if this is already a pswitch
			if ($(this).parent().hasClass("pswitch-wrapper")) {
				return;
			}

			// find values
			datachecked = $(this).attr("data-checked");
			dataunchecked = $(this).attr("data-unchecked");
			
			// append style
			if (settings.flat) {
				$(this).wrap("<div class='pswitch-wrapper pswitch-flat'></div>")
			} else {
				$(this).wrap("<div class='pswitch-wrapper'></div>")
			}
			$(this).hide();
		
			if (datachecked != null) {
				$(this).before("<div class='pswitch-on'>"+datachecked+"</div>");
			}
			$(this).before("<div class='pswitch-background'><div class='pswitch-handle'></div></div>");
			if (dataunchecked != null) {
				$(this).before("<div class='pswitch-off'>"+dataunchecked+"</div>");
			}

			// handle click events on the labels
			$(this).parent().find('.pswitch-on').click(function(e) {
				if (! $(this).parent().find('input[type=checkbox]').is(":disabled")) {
					check($(this).parent().find('input[type=checkbox]'));
				}
			});
			$(this).parent().find('.pswitch-off').click(function(e) {
				if (! $(this).parent().find('input[type=checkbox]').is(":disabled")) {
					uncheck($(this).parent().find('input[type=checkbox]'));
				}
			});
			
			// assign mousedown callback
			$(this).parent().find('.pswitch-handle').mousedown(function(e) {
				// only handle event if checkbox is enabled
				if (! $(this).parent().parent().find('input[type=checkbox]').is(":disabled")) {
					transition = $(this).css('transition');
					$(this).css('transition', 'none');
					active = $(this);
					clicked = true;
					offset = $(this).parent().offset().left;
					$('body').css('user-select', 'none');
					move(e);
				} 
			});

			$(this).parent().find('.pswitch-background').click(function(e) {
				if (! $(this).parent().find('input[type=checkbox]').is(":disabled")) {
					if(e.target == $(this)[0]) {
						toggle($(this).parent().find('input[type=checkbox]'));
					}
				}   
			});
			
			$(this).on('check', function(){check($(this))});
			$(this).on('uncheck', function(){uncheck($(this))});
			$(this).on('toggle', function(){toggle($(this))});
			$(this).on('enable', function(){enable($(this))});
			$(this).on('disable', function(){disable($(this))});
			
			update_status($(this));
			
		}); 
		
	}
}(jQuery));