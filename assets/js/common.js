// @codekit-prepend 'libs/jquery.mobile.min.js', 'libs/matchMedia.js', 'libs/enquire.js'

$(document).ready(function () {
	'use strict';

	var $body = $('body');

/*
 *	Open external links in a new tab/window
 */
	$body.on(EVENT_METHOD, 'a.external, a[rel=external]', function () {
		var self = $(this);

		window.open(self.attr('href'));
		return false;
	});
/* @group end */


/*
 *	Responsive - These functions will be called when the breakpoint exists
 */
	// if media queries are supported
	if (matchMedia('only screen').matches) {
		var responsive = {
			desktop: function (event) {
				$('body').data('mq', event.type);
			},
			lteTablet: function (event) {
				$('body').data('mq', event.type);
			},
			tablet: function (event) {
				$('body').data('mq', event.type);
			},
			mobile: function (event) {
				$('body').data('mq', event.type);

				// scalability while maintaining usability (http://webdesignerwall.com/tutorials/iphone-safari-viewport-scaling-bug
				(function (doc) {
					var addEvent = 'addEventListener',
						type = 'gesturestart',
						qsa = 'querySelectorAll',
						scales = [1, 1],
						meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

					function fix() {
						meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
						doc.removeEventListener(type, fix, true);
					}

					if ((meta = meta[meta.length - 1]) && addEvent in doc) {
						fix();
						scales = [0.25, 1.6];
						doc[addEvent](type, fix, true);
					}
				}(document));
			}
		};

		$body
			.on('desktop', responsive.desktop)
			.on('lte-tablet', responsive.lteTablet)
			.on('tablet', responsive.tablet)
			.on('mobile', responsive.mobile);

		enquire
			// More than 1025px
			.register('(min-width: 1025px)', {
				match: function () { $body.trigger('desktop'); }
			}, true)
			// Anything less than or equal to a tablet (1024px or lower)
			.register('(max-width: 1024px)', {
				match: function () { $body.trigger('lte-tablet'); }
			})
			// 701 to 1024px
			.register('(min-width: 761px) and (max-width: 1024px)', {
				match: function () { $body.trigger('tablet'); }
			})
			// 0 - 600px OR 0 - 799px in landscape orientation
			.register('(max-width: 760px), (max-width: 799px) and (orientation: landscape)', {
				match: function () { $body.trigger('mobile'); }
			})
			.listen();
	}
	// fallbacks when media queries are not supported
	else {
		
	}
/* @group end */

});