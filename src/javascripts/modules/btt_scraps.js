// IMPORTS
import Throttled from 'lib/throttled.js';
// FUNCTION
(function() {
	const backToTop = document.getElementById('BackToTop');

	window.requestAnimFrame = (function() {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			function(callback) {
				window.setTimeout(callback, 1000 / 60);
			};
	})();

	// add or remove BackToTop (bt) Element
	const btElement = function() {
		this.showBackToTop = function() {
				setTimeout(function() {
					backToTop.classList.add('back-to-top--scrolled');
					console.log('show back to top');
				}, 5)
		},
		this.hideBackToTop = function() {
			backToTop.classList.remove('back-to-top--scrolled');
			console.log('hide back to top');
		}
	}
	// MAIN FUNCTION
	// function scrollToY(scrollTargetY, speed) {...}
	// scrollTargetY: the target scrollY property of the window
	// speed: time in pixels per second
	function btAnimateToTop(scrollTargetY, speed) {
		var scrollY = window.scrollY || document.documentElement.scrollTop,
			scrollTargetY = scrollTargetY || 0,
			speed = speed || 2000,
			easing = function easeInOutQuint(pos) {
				if ((pos /= 0.5) < 1) {
					return 0.5 * Math.pow(pos, 5);
				}
				return 0.5 * (Math.pow((pos - 2), 5) + 2);
			},
			currentTime = 0;

		// min time .1, max time .8 seconds
		var time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

		// add animation loop
		function tick() {
			currentTime += 1 / 60;
			var p = currentTime / time;
			var t = easing(p);
			if (p < 1) {
				requestAnimFrame(tick);
				window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
			} else {
				window.scrollTo(0, scrollTargetY);
			}
		}
		// call it once to get started
		tick();

	}
	// INITIATE BT
	// bodyTop is goofy due to IE document.body.scrollTop bug
	function btInit() {
		var bt = new btElement;
		var bodyTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		if (bodyTop > 200) {
			bt.showBackToTop();
		}
		else {
			bt.hideBackToTop();
			return false;
		}
	}
	// Throttle btInit on scroll
	function throttleInit() {
		Throttled(btInit(),400)
	};

	function callBtAnimateToTop(){
		btAnimateToTop(0, 2500);
	}

	window.addEventListener('scroll', throttleInit);
	backToTop.addEventListener('click', callBtAnimateToTop);
})();