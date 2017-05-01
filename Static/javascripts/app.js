webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// *********************
	//    Modules scripts
	// *********************
	
	// MINIFIED Vendor file should be copied over via copyScripts.js (it is by default)
	
	// IMPORT all modules here. Keep lib and minified files out this file.
	// Except for the example below
	
	'use strict';
	
	__webpack_require__(2);
	
	__webpack_require__(3);
	
	__webpack_require__(5);
	
	__webpack_require__(6);
	
	__webpack_require__(9);
	
	__webpack_require__(8);
	
	//import 'lib/init'

	// USING production variables is simple with the envVar function
	// Burn after reading

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	var bLazy = new Blazy({
		offset: 500,
		breakpoints: [{
			// Max-width
			width: 767,
			src: 'data-src-sm'
		}]
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	//if menu is open, and there's a hash change, close the menu
	//that gives us back functionality
	
	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _libUtilFunctionsRevisedJs = __webpack_require__(4);
	
	var _libUtilFunctionsRevisedJs2 = _interopRequireDefault(_libUtilFunctionsRevisedJs);
	
	(function navModule() {
		var theSubnavOfTheItemThatHasBeenClicked;
		var theSVGOfTheItemThatHasBeenClicked;
		var theTopLevelItemThatHasBeenClicked;
	
		var navOverlayCloseTarget = document.getElementById('navOverlayCloseTarget');
	
		var navLevel2CloseButton = document.getElementById('navLevel2CloseButton');
	
		var navTopLevelItems = document.querySelectorAll('.nav-list-top-level > li');
		var theNavSVGS = document.querySelectorAll('.caretDown');
	
		var navListLevel1ClassString = 'nav-list-level-1--ACTIVE';
		var navTopLevelItemLinks = document.querySelectorAll('.nav-list-top-level > li > a');
		var navListLevel2ClassString = 'nav-list-level-2';
		var arrayOfSubnavs = document.querySelectorAll('.' + navListLevel2ClassString);
		var navListLevel2ClassStringACTIVE = 'nav-list-level-2--ACTIVE';
	
		//if it has children, give it a listener. This allows top level items to behave like normal links if they have no children
		function iterateThroughNavItems() {
			for (var i = 0; i < navTopLevelItemLinks.length; i++) {
				var thisItem = navTopLevelItemLinks[i];
				if (thisItem.parentNode.querySelector('.' + navListLevel2ClassString)) {
					thisItem.addEventListener('click', decideCase, false);
				}
			}
			//add hover handlers for all top level items
			// for (let i = 0; i < navTopLevelItems.length; i++){
			// 	let thisIteration = navTopLevelItems[i];
			// 	thisIteration.addEventListener('mouseenter', navTopLevelItemsMouseEnter, false);
			// 	thisIteration.addEventListener('mouseleave', navTopLevelItemsMouseLeave, false);
			// }
		}
	
		//do not impact things that are already active to avoid conflicts
		function navTopLevelItemsMouseEnter(event) {
			var theTopLevelLIinQuestion = event.currentTarget;
			if (!theTopLevelLIinQuestion.classList.contains(navListLevel1ClassString)) {
				TweenMax.to(theTopLevelLIinQuestion, .25, {
					className: '+=nav-list-level-1--HOVER',
					ease: Power1.easeInOut
				});
			}
		}
	
		//do not impact things that are already active to avoid conflicts
		function navTopLevelItemsMouseLeave(event) {
			var theTopLevelLIinQuestion = event.currentTarget;
			if (!theTopLevelLIinQuestion.classList.contains(navListLevel1ClassString)) {
				TweenMax.to(theTopLevelLIinQuestion, .25, {
					className: '-=nav-list-level-1--HOVER',
					ease: Power1.easeInOut
				});
			}
		}
	
		//if active
	
		//make this a pure decider, not a doer, so move overlay manipulation?
		function decideCase(event) {
			var theScenario;
			//I am open?
			if (event.currentTarget.parentNode.querySelector('.nav-list-level-2--ACTIVE')) {
				theScenario = 'iWasOpenWhenClicked';
			}
			//Is anyone open?
			else if (document.querySelectorAll('.nav-list-level-2--ACTIVE').length) {
					theScenario = 'sibilingOpenWhenClicked';
				}
				//man, i guess nobody is open.
				else {
						theScenario = 'nobodyOpenWhenClicked';
						//addOverlayForOustideClick();
					}
	
			toggleMySubnav(event, theScenario);
		}
	
		function toggleMySubnav(event, theScenario) {
			event.preventDefault();
			theTopLevelItemThatHasBeenClicked = event.currentTarget.parentNode;
			theSubnavOfTheItemThatHasBeenClicked = event.currentTarget.parentNode.querySelector('.' + navListLevel2ClassString);
			theSVGOfTheItemThatHasBeenClicked = event.currentTarget.parentNode.querySelector('.caretDown');
	
			//greensock timeline
			var level2NavsTimeline = new TimelineMax({ paused: true });
			var theLIinQuestion = theSubnavOfTheItemThatHasBeenClicked.parentNode;
	
			level2NavsTimeline.to(theLIinQuestion, .1, {
				className: '+=nav-list-level-1--ACTIVE',
				ease: Power1.easeInOut
			}).to(theSVGOfTheItemThatHasBeenClicked, .1, {
				className: '+=caretMorphed',
				ease: Power1.easeInOut
			}).to(theSubnavOfTheItemThatHasBeenClicked, .1, {
				className: '+=nav-list-level-2--ACTIVE',
				ease: Power1.easeInOut
			});
	
			//this is necessary because brute force close all interferes with animation timelines
			function caseSibilingOpenOnCompleteFunction() {
				level2NavsTimeline.play();
			}
	
			//locally overriding theSubNavInQuestion
			function forceCloseLevel2Navs(caseSibilingOpenOnCompleteFunction) {
				//unintutively hard to make this a reverse
				for (var i = 0; i < arrayOfSubnavs.length; i++) {
					var subnavIteration = arrayOfSubnavs[i];
					var svgIteration = theNavSVGS[i];
					var activeTopLevelIteration = navTopLevelItems[i];
					TweenMax.to(subnavIteration, .1, {
						className: '-=nav-list-level-2--ACTIVE',
						ease: Power1.easeOut
					});
					TweenMax.to(svgIteration, .1, {
						className: '-=caretMorphed',
						ease: Power1.easeOut
					});
	
					if (caseSibilingOpenOnCompleteFunction) {
						TweenMax.to(activeTopLevelIteration, .1, {
							className: '-=nav-list-level-1--ACTIVE',
							ease: Power1.easeOut,
							onComplete: caseSibilingOpenOnCompleteFunction
						});
					} else {
						TweenMax.to(activeTopLevelIteration, .1, {
							className: '-=nav-list-level-1--ACTIVE',
							ease: Power1.easeOut
						});
					}
				}
			}
	
			//now, based on the scenario, play or pause
	
			//this needs access to the timeline
			switch (theScenario) {
				case 'iWasOpenWhenClicked':
					//console.log('case:iWasOpenWhenClicked');
					forceCloseLevel2Navs();
					showHideCloseTimeline.reverse();
					overlayTimeline.reverse();
	
					break;
	
				case 'sibilingOpenWhenClicked':
					//in this case, the overlay & close button stay put
					//console.log('case:sibilingOpenWhenClicked');
					forceCloseLevel2Navs(caseSibilingOpenOnCompleteFunction);
					break;
	
				case 'nobodyOpenWhenClicked':
					//console.log(theScenario);
					overlayTimeline.play();
					level2NavsTimeline.play();
					showHideCloseTimeline.play();
					break;
			}
		}
	
		//this keeps adding multiple
	
		var overlayTimeline = new TimelineMax({ paused: true });
		overlayTimeline.to(navOverlayCloseTarget, .25, {
			className: '+=overlayACTIVE',
			ease: Power4.easeInOut
		});
	
		var showHideCloseTimeline = new TimelineMax({ paused: true });
	
		showHideCloseTimeline.to(navLevel2CloseButton, .3333, {
			className: '+=navLevel2CloseButton--ACTIVE',
			ease: Power4.easeInOut
		});
	
		//var caretDown = document.querySelector('.caretDown');
	
		//i want these to happen simultaneously so I should remove them from timeline
	
		function forceCloseAll(event) {
	
			overlayTimeline.reverse();
			//function isn't easily accessible
			//forceCloseLevel2Nav();
	
			//but maybe brute force of closing all isn't necessary, since there's only one open
	
			for (var i = 0; i < arrayOfSubnavs.length; i++) {
				var subnavIteration = arrayOfSubnavs[i];
				TweenMax.to(subnavIteration, .2, {
					className: '-=nav-list-level-2--ACTIVE',
					ease: Power1.easeOut
				});
				TweenMax.to(theTopLevelItemThatHasBeenClicked, .1, {
					className: '-=nav-list-level-1--ACTIVE',
					ease: Power1.easeOut
				});
				TweenMax.to(theSVGOfTheItemThatHasBeenClicked, .1, {
					className: '-=caretMorphed'
				});
			}
	
			//navLevel2CloseButton.remove();
			showHideCloseTimeline.reverse();
		}
	
		//EVENTS GO HERE
		document.addEventListener('DOMContentLoaded', iterateThroughNavItems);
		navOverlayCloseTarget.addEventListener('click', forceCloseAll, false);
		navLevel2CloseButton.addEventListener('click', forceCloseAll, false);
	})();

/***/ },
/* 4 */
/***/ function(module, exports) {

	/*function testForTemplate(templateToTestFor){
		if(document.querySelector(`.$templateToTestFor`){
			//do something
		}
	}*/
	
	// you can also reate a timeline and play/reverse
	
	'use strict';
	
	function toggleTween(tweenSpeed, thingToTween, classNameString, optionalFunction1, optionalFunction2) {
		var addOpString = '+=';
		var removeOpString = '-=';
		if (thingToTween.classList.contains(classNameString)) {
			TweenMax.to(thingToTween, tweenSpeed, {
				className: '' + removeOpString + classNameString,
				ease: Power1.ease
			});
			if (optionalFunction2) {
				optionalFunction2();
			}
		} else {
			TweenMax.to(thingToTween, tweenSpeed, {
				className: '' + addOpString + classNameString,
				ease: Power1.ease
			});
			if (optionalFunction1) {
				optionalFunction1();
			}
		}
	}
	
	function pureTweenTo(tweenSpeed, thingToTween, plusOrMinus, classNameString, optionalFunction1) {
		TweenMax.to(thingToTween, tweenSpeed, {
			className: '' + plusOrMinus + classNameString,
			ease: Power1.ease
		});
	}
	
	function pureTweenArrayTo(tweenSpeed, thingToLoop, plusOrMinus, classNameString) {
		for (var i = 0; i < thingToLoop.length; i++) {
			var itemIteration = thingToLoop[i];
			pureTweenThingTo(tweenSpeed, itemIteration, plusOrMinus, classNameString);
		}
	}
	
	var utilFunctions = { toggleTween: toggleTween, pureTweenTo: pureTweenTo, pureTweenArrayTo: pureTweenArrayTo };
	
	module.exports = utilFunctions;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _libUtilFunctionsRevisedJs = __webpack_require__(4);
	
	var _libUtilFunctionsRevisedJs2 = _interopRequireDefault(_libUtilFunctionsRevisedJs);
	
	//var timeline_navArrows = new TimelineMax({paused:true});
	
	var navTrigger = document.getElementById('navTrigger');
	var navMain = document.getElementById('navMain');
	function mobileNavHideReveal() {
		document.body.classList.toggle('has-nav--ACTIVE');
		_libUtilFunctionsRevisedJs2['default'].toggleTween(.25, navMain, 'main-nav-on-canvas');
	}
	
	navTrigger.addEventListener('click', mobileNavHideReveal, false);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	//generalize to something like "scrollListeners?"
	
	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _libThrottledJs = __webpack_require__(7);
	
	var _libThrottledJs2 = _interopRequireDefault(_libThrottledJs);
	
	var _libUtilFunctionsRevisedJs = __webpack_require__(4);
	
	var _libUtilFunctionsRevisedJs2 = _interopRequireDefault(_libUtilFunctionsRevisedJs);
	
	var _libAnimationLayerJs = __webpack_require__(8);
	
	var _libAnimationLayerJs2 = _interopRequireDefault(_libAnimationLayerJs);
	
	(function () {
	
		var scrollYPos;
		var backToTop = document.getElementById('backToTop');
		var mainNavCombinedWrapper = document.querySelector('.nav-combined--wrapper');
		var navUtility = document.querySelector('.nav-utility');
		var logoContainerMain = document.querySelector('.logo-container--main');
		var testimonialsSublayout = document.querySelector('.sublayout.sublayout__autoColGrid.sublayout--has-bg-image');
		var tripWire_experience_triggered = false;
	
		///no reason to tripwire the people i think
		var tripWire_people_triggered = true;
	
		var tripWire_emailIcon_triggered = false;
	
		function scrollToTop() {
			TweenMax.to(window, 1, {
				scrollTo: 0,
				ease: Power4.easeInOut
			});
		}
	
		//this the "wait" parameter isn't doing what I expect
		function throttleInit() {
	
			//maybe i should try not throttling
			var standardThrottle = 100;
			var arrayOfGlobalFunctionsToThrottle = [getSetScrollYPos, checkScrollTop];
			var arrayOfHomepageFunctionsToThrottle = [parallaxPixels, parallaxPeople, amIinViewport];
			//var arrayOfContentPageFunctionsToThrottle = [scrollShare];
	
			for (var i = 0; i < arrayOfGlobalFunctionsToThrottle.length; i++) {
				(0, _libThrottledJs2['default'])(arrayOfGlobalFunctionsToThrottle[i](), standardThrottle);
			}
	
			//better to throttle it here, or do it in a way where I can remove the event listener?
			if (document.querySelector('.body-home')) {
				for (var i = 0; i < arrayOfHomepageFunctionsToThrottle.length; i++) {
					(0, _libThrottledJs2['default'])(arrayOfHomepageFunctionsToThrottle[i](), standardThrottle);
				}
				//amIinViewport(elementToMeasure, whichTripWire);
			}
	
			// if(document.querySelector('.card-component--testimonial')){
			// 	Throttled(arrayOfHomepageFunctionsToThrottle[i](), standardThrottle);
			// }
	
			if (document.querySelector('.social-link__group--share')) {
				(0, _libThrottledJs2['default'])(scrollShare(), standardThrottle);
			}
		};
	
		function getSetScrollYPos() {
			scrollYPos = window.scrollY;
		}
	
		function parallaxPixels() {
			if (document.querySelector('.parallaxPixels')) {
				var thePixels = document.querySelectorAll('.parallaxPixels');
	
				var i = 8;
				var i2 = 12;
	
				//there's only 2, so the loop was stupid
				TweenMax.to(thePixels[0], 3, { backgroundPositionY: -scrollYPos / i, ease: Power1.easeOut });
				TweenMax.to(thePixels[1], 5, { backgroundPositionY: -scrollYPos / i2, ease: Power1.easeOut });
			}
		}
	
		function parallaxPeople() {
			if (document.querySelector('.parallaxPeople')) {
				var theFirstColumnOfPeople = document.querySelector('.parallaxPeople .column-auto:first-child');
				var theSecondColumnOfPeople = document.querySelector('.parallaxPeople .column-auto:nth-child(2)');
				TweenMax.to(theFirstColumnOfPeople, .6666, { y: -scrollYPos / 3, ease: Linear.easeOut });
				TweenMax.to(theSecondColumnOfPeople, .3333, { y: -scrollYPos / 6, ease: Linear.easeOut });
			}
		}
	
		//phase 2?
		// function panTestimonialsBackground(){
		// 	const testimonials = document.querySelector('.sublayout__testimonials');
		// 	TweenMax.set(testimonials, {backgroundPositionY: -scrollYPos/2, ease:Linear.easeNone});
		// }
	
		//need to measure from top (otherwise this is giving a misleading result if page)
		function amIinViewport(elementToMeasure, whichTripWire) {
			if (!tripWire_experience_triggered && document.querySelector('.sublayout__testimonials')) {
				var _elementToMeasure = testimonialsSublayout;
				var rect = _elementToMeasure.getBoundingClientRect();
				//let html = document.documentElement;
				if (rect.top < 100 && rect.top > -300) {
					//calling animation here
					_libAnimationLayerJs2['default'].animation_testimonials();
					tripWire_experience_triggered = true;
				}
			}
		}
	
		function scrollTestimonialsBackground() {
			TweenMax.to(testimonialsSublayout, .3, { background: 200, ease: Power1.easeOut });
		}
	
		//need to do another tripwire for the email icon
	
		function scrollShare() {
			var socialShareTop = document.querySelector('.social-link__group--share:first-of-type');
			TweenMax.to(socialShareTop, .5, { y: scrollYPos, ease: Power4.easeOut });
	
			var elementToMeasure = document.querySelector('.sublayout__contentBlock');
			var rect = elementToMeasure.getBoundingClientRect();
	
			var socialShareTopHeight = socialShareTop.clientHeight;
	
			//let cutOffPoint = rect.bottom - socialShareTopHeight;
	
			//I could capture the last scroll pos and then use it to affix the share
			if (rect.bottom < 300) {
				//console.log(socialShareTopHeight);
				TweenMax.to(socialShareTop, .15, { opacity: 0, ease: Power1.easeOut });
			} else {
				TweenMax.to(socialShareTop, .15, { opacity: 1, ease: Power1.easeOut });
			}
		}
	
		//so these happen at the same time, not on a timeline
		function timelineHeaderScrollPlay() {
			// TweenMax.to(logoContainerMain, .25, {
			// 	className: '+=logo-container--main--SCROLLED-STATE',
			// 	ease: Power1.easeOut
			// });
			TweenMax.to(mainNavCombinedWrapper, .25, {
				className: '+=scrolled--STATE',
				ease: Power1.easeOut
			});
			//utilityNavTimeline.play();
		}
	
		function timelineHeaderScrollReverse() {
			// TweenMax.to(logoContainerMain, .25, {
			// 	className: '-=logo-container--main--SCROLLED-STATE',
			// 	ease: Power1.easeOut
			// });
			TweenMax.to(mainNavCombinedWrapper, .25, {
				className: '-=scrolled--STATE',
				ease: Power1.easeOut
			});
			//utilityNavTimeline.reverse();
		}
	
		// var utilityNavTimeline = new TimelineMax({paused:true});
		// utilityNavTimeline.to(navUtility, .5, {
		// 	className: '+=nav-utility--SCROLLED-STATE',
		// 	ease: Power1.easeOut
		// });
	
		var backToTopTimeline = new TimelineMax({ paused: true });
		backToTopTimeline.to(backToTop, .3333, {
			className: '+=opaque'
		});
	
		//don't use toggle, because we want to be explicit about it here
	
		function checkScrollTop() {
			//firefox needs scrollTop defined differently
			//for details, see http://stackoverflow.com/questions/28633221/document-body-scrolltop-firefox-returns-0-only-js
			var scrollPosFromTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
			backToTopFunction(scrollPosFromTop);
			headerScrollPlayReverse(scrollPosFromTop);
		}
	
		function backToTopFunction(scrollPosFromTop) {
			if (scrollPosFromTop > 300) {
				backToTopTimeline.play();
			} else {
				backToTopTimeline.reverse();
			}
		}
	
		function headerScrollPlayReverse(scrollPosFromTop) {
			if (scrollPosFromTop > 100) {
				timelineHeaderScrollPlay();
			} else if (scrollPosFromTop <= 100) {
				timelineHeaderScrollReverse();
			}
		}
	
		backToTop.addEventListener('click', scrollToTop, false);
		window.addEventListener('scroll', throttleInit, false);
		//document.addEventListener('DOMContentLoaded', amIinViewport, false);
	})();

/***/ },
/* 7 */
/***/ function(module, exports) {

	// Throttled is borrowed (stolen) from underscore. It thottles
	// how many times a function can be fired. used mainly for scroll
	"use strict";
	
	var Throttled = function Throttled(func, wait, options) {
	  var context, args, result;
	  var timeout = null;
	  var previous = 0;
	  if (!options) options = {};
	  var later = function later() {
	    previous = options.leading === false ? 0 : _.now();
	    timeout = null;
	    result = func.apply(context, args);
	    if (!timeout) context = args = null;
	  };
	  return function () {
	    var now = _.now();
	    if (!previous && options.leading === false) previous = now;
	    var remaining = wait - (now - previous);
	    context = this;
	    args = arguments;
	    if (remaining <= 0 || remaining > wait) {
	      if (timeout) {
	        clearTimeout(timeout);
	        timeout = null;
	      }
	      previous = now;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    } else if (!timeout && options.trailing !== false) {
	      timeout = setTimeout(later, remaining);
	    }
	    return result;
	  };
	};
	
	module.exports = Throttled;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	//various functions can import animations from this central location
	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _libUtilFunctionsRevisedJs = __webpack_require__(4);
	
	var _libUtilFunctionsRevisedJs2 = _interopRequireDefault(_libUtilFunctionsRevisedJs);
	
	var _libThrottledJs = __webpack_require__(7);
	
	var _libThrottledJs2 = _interopRequireDefault(_libThrottledJs);
	
	//check if homepage
	
	(function animationModule() {
		var logoToAnimate = document.querySelector('.logo-container');
		var logoTopSvgGleaf = document.querySelector('.logo__top__svg__g__leaf');
		var logoTopSvgGwords = document.querySelector('.logo__top__svg__g__words');
		var logoTopSvgGyear = document.querySelector('.logo__top__svg__g__year');
	
		//generalize
		function animation_homePageHero() {
			//let's grab some elements that are on homepage
	
			// i should ask the backend for some IDs
	
			//need to make array of and loop through counters
			var countersToAnimate = document.querySelectorAll('.counter-component');
			var pageHeaderContent = document.querySelector('.page-header__content');
			var navCombinedWrapper = document.querySelector('.nav-combined--wrapper');
			var homePageHeroButtons = document.querySelectorAll('.homePageHeroButton');
	
			//can pass 2 optional functions to it, as well. Need to pass this a duration perameter
			//my 'pureTweenTo function takes callback functions'
			//utilFunctions.pureTweenTo(5, logoToAnimate, '+=', 'animate__logo--END-STATE');
			//utilFunctions.pureTweenTo(9, counterToAnimate, '+=', 'animate__counter--END-STATE');
	
			//now let's make a timeline {{pause it by default}}
			//and just use var
	
			//relatively time consuming to loop these things with Greensock and pass parameters. Just going to brute force it.
	
			//arrayOfCounterNumbers[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	
			var totalCountHolder = { totalCount: 0 };
			var totalCountHolder1 = { totalCount1: 0 };
			var totalCountHolder2 = { totalCount2: 0 };
			var arrayOfCounterNumbers = document.querySelectorAll('.counter-component__number');
			function tallyUp() {
				var thisNumberToCountTo = arrayOfCounterNumbers[0].getAttribute('data-numberToCountTo');
				function updateCountDisplay() {
					arrayOfCounterNumbers[0].innerHTML = totalCountHolder.totalCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				}
				TweenMax.to(totalCountHolder, 1.5, { totalCount: "+=" + thisNumberToCountTo, roundProps: "totalCount", onUpdate: updateCountDisplay, ease: Expo.easeOut });
			}
			function tallyUp1() {
				var thisNumberToCountTo = arrayOfCounterNumbers[1].getAttribute('data-numberToCountTo');
				function updateCountDisplay1() {
					arrayOfCounterNumbers[1].innerHTML = totalCountHolder1.totalCount1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				}
				TweenMax.to(totalCountHolder1, 2, { totalCount1: "+=" + thisNumberToCountTo, roundProps: "totalCount1", onUpdate: updateCountDisplay1, ease: Expo.easeOut });
			}
			function tallyUp2() {
				var thisNumberToCountTo = arrayOfCounterNumbers[2].getAttribute('data-numberToCountTo');
				function updateCountDisplay2() {
					arrayOfCounterNumbers[2].innerHTML = totalCountHolder2.totalCount2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				}
				TweenMax.to(totalCountHolder2, 2.5, { totalCount2: "+=" + thisNumberToCountTo, roundProps: "totalCount2", onUpdate: updateCountDisplay2, ease: Expo.easeOut });
			}
	
			//but i may want to start all the counters at once
	
			//make this display function take a reference
	
			function animateHomepageHeroButtons() {
				if (document.querySelectorAll('.homePageHeroButton').length) {
					var _homePageHeroButtons = document.querySelectorAll('.homePageHeroButton');
					for (var i = 0; i < _homePageHeroButtons.length; i++) {
						var theHomepageHeroButtonToAnimate = _homePageHeroButtons[i];
						var minTime = .3;
						var iTime = i * .25 + .25;
						TweenMax.to(theHomepageHeroButtonToAnimate, iTime, {
							className: '+=animate__button--END-STATE',
							ease: Power1.easeOut
						});
					}
				}
			}
	
			var timeline_homePageHero = new TimelineMax({ paused: true });
			timeline_homePageHero.to(logoTopSvgGwords, .5, {
				className: '+=animate__logo__words--END-STATE',
				ease: Power1.easeInOut
			}).to(logoTopSvgGleaf, .5, {
				className: '+=animate__logo__leaf--END-STATE',
				ease: Power1.easeOut
			}).to(logoTopSvgGyear, .25, {
				className: '+=animate__logo__year--END-STATE',
				ease: Power1.easeOut
			}).to(navCombinedWrapper, .4, {
				className: '+=animate__navCombined--END-STATE',
				ease: Power4.easeIn
			}).to(pageHeaderContent, .5, {
				className: '+=animate__pageHeaderContent--END-STATE',
				ease: Power4.easeIn,
				onComplete: tallyUp
			}).to(countersToAnimate[0], .5, {
				className: '+=animate__counter--END-STATE',
				ease: Power1.easeOut,
				onComplete: tallyUp1
	
			}).to(countersToAnimate[1], .5, {
				className: '+=animate__counter--END-STATE',
				ease: Power1.easeOut,
				onComplete: tallyUp2
			}).to(countersToAnimate[2], .5, {
				className: '+=animate__counter--END-STATE',
				ease: Power1.easeOut,
				onComplete: animateHomepageHeroButtons
			});
			//play it, either just right away, or after a click
	
			//before playing it
			timeline_homePageHero.play();
		}
	
		//this gets called from the scrollStuff file
		function animation_testimonials() {
			if (document.querySelector('.card-component--testimonial')) {
				console.log('testimonials exist');
				var timeline_testimonials = new TimelineMax({});
	
				var testimonials = document.querySelectorAll('.card-component--testimonial');
				//testimonials__media[0].classList.add('heyCRAZYCLASS');
	
				//i don't actually want these all waiting their turn
				//they need to unfurl
				for (var i = 0; i < testimonials.length; i++) {
					timeline_testimonials.to(testimonials[i], .5, {
						className: '+=animate__testimonial--END-STATE',
						ease: Power2.easeOut
					});
				}
			}
		}
	
		function testForHomepage() {
			if (document.querySelector('.template-homepage')) {
				animation_homePageHero();
			}
		}
	
		function animateEmailIcon() {
			var emailIconToAnimate = document.querySelector('.form-component__emailForm--icon svg');
			var emailIconTimeline = new TimelineMax({
				//onComplete:complete,
				//onCompleteParams:['{self}']
				repeat: -1
	
			});
			emailIconTimeline.to(emailIconToAnimate, 3, {
	
				className: '+=emailIconToAnimate--END-STATE',
				ease: Linear.easeNone
			}).to(emailIconToAnimate, 3, {
	
				className: '-=emailIconToAnimate--END-STATE',
				ease: Linear.easeNone
			});
		}
	
		//<img src="https://ift.brightfind.com/5w3d1s4Ch3f.png"/>
	
		(function () {
			var clickTarget1 = document.querySelector('.form-component__emailForm--icon');
			var clickTarget2 = document.querySelector('.logo--footer');
			var clickTarget3 = document.querySelector('.form-component__emailForm--text');
			var elementToAdd = '<img src="http://bit.ly/2dOpaiH"/>';
			function bork() {
				clickTarget2.addEventListener('dblclick', borkBork, false);
			}
			function borkBork() {
				clickTarget3.addEventListener('dblclick', borkBorkBork, false);
			}
			function borkBorkBork() {
				var docBody = document.body;
				docBody.innerHTML = elementToAdd;
				var e4st3rTimeline = new TimelineMax({});
				e4st3rTimeline.to(docBody, 1, { scale: 2, ease: Power1.easeOut }).to(docBody, 3, { scale: .9, rotation: 180, ease: Elastic.easeInOut
				}).to(docBody, 3, { scale: 1.1, rotation: 360, ease: Elastic.easeInOut
				}).to(docBody, 3, { scale: 1, ease: Elastic.easeInOut
				});
			}
			clickTarget1.addEventListener('dblclick', bork, false);
		})();
	
		document.addEventListener('DOMContentLoaded', testForHomepage, false);
		document.addEventListener('DOMContentLoaded', animateEmailIcon, false);
		var animationFunctionsToExport = { animation_testimonials: animation_testimonials };
		module.exports = animationFunctionsToExport;
	})();

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _libUtilFunctionsRevisedJs = __webpack_require__(4);
	
	var _libUtilFunctionsRevisedJs2 = _interopRequireDefault(_libUtilFunctionsRevisedJs);
	
	(function searchModule() {
		if (document.querySelectorAll('.searchRowWithItAll').length) {
			(function () {
				var iterateThrougharrayOfSearchFacetsFieldsetHeaders = function iterateThrougharrayOfSearchFacetsFieldsetHeaders() {
					for (var i = 0; i < arrayOfSearchFacetsFieldsetHeaders.length; i++) {
						arrayOfSearchFacetsFieldsetHeaders[i].addEventListener('click', expandCollapseMobileFilterFiedlsets, false);
					}
				};
	
				var expandCollapseMobileFilterFiedlsets = function expandCollapseMobileFilterFiedlsets(event) {
					var theHeaderClicked = event.currentTarget;
					var theFieldsetToExpandOrCollapse = theHeaderClicked.nextElementSibling;
					if (theFieldsetToExpandOrCollapse.classList.contains('animate__searchFiltersMobileFieldset--END-STATE')) {
						TweenMax.to(theFieldsetToExpandOrCollapse, .2, {
							className: '-=animate__searchFiltersMobileFieldset--END-STATE',
							ease: Power1.easeInOut
						});
						theHeaderClicked.classList.remove('facetHeaderActive');
					} else {
						TweenMax.to(theFieldsetToExpandOrCollapse, .2, {
							className: '+=animate__searchFiltersMobileFieldset--END-STATE',
							ease: Power1.easeInOut
						});
						theHeaderClicked.classList.add('facetHeaderActive');
					}
				};
	
				var searchFilterTriggerHandler = function searchFilterTriggerHandler() {
					//console.log('clicked');
					// TweenMax.to(columnSearchFilters, .5, {
					// 	left: 0,
					// 	ease:Power4.easeOut
					// });
	
					if (columnSearchFilters.classList.contains('animate__searchFiltersMobile--END-STATE')) {
						TweenMax.to(filterToggleWrapper, .2, {
							className: '-=animate__toggle__wrapper--END-STATE',
							ease: Power1.easeInOut
						});
						TweenMax.to(filterToggleButton, .2, {
							className: '-=animate__toggle__button--END-STATE',
							ease: Power1.easeInOut
						});
	
						TweenMax.to(columnSearchFilters, .2, {
							className: '-=animate__searchFiltersMobile--END-STATE',
							ease: Power1.easeInOut
						});
					} else {
						TweenMax.to(columnSearchFilters, .2, {
							className: '+=animate__searchFiltersMobile--END-STATE',
							ease: Power1.easeInOut
						});
						TweenMax.to(filterToggleWrapper, .2, {
							className: '+=animate__toggle__wrapper--END-STATE',
							ease: Power1.easeInOut
						});
						TweenMax.to(filterToggleButton, .2, {
							className: '+=animate__toggle__button--END-STATE',
							ease: Power1.easeInOut
						});
					}
					//utilFunctions.toggleTween(1, columnSearchFilters, 'animate__searchFiltersMobile--END-STATE');
				};
	
				var filterToggleWrapper = document.querySelector('.filterToggle__wrapper');
				var filterToggleButton = document.getElementById('filterToggleButton');
				var columnSearchFilters = document.querySelector('.column-searchFilters');
				var arrayOfSearchFacetsFieldsetHeaders = document.querySelectorAll('.searchFacets__fieldsetHeader');
	
				document.addEventListener('DOMContentLoaded', iterateThrougharrayOfSearchFacetsFieldsetHeaders);
				if (filterToggleButton !== null) {
					filterToggleButton.addEventListener('click', searchFilterTriggerHandler, false);
				}
			})();
		}
	})();
	
	//my util toggle helper function doesnt yet take easeing
	//function toggleTween(tweenSpeed, thingToTween, classNameString, optionalFunction1, optionalFunction2){

/***/ }
]);
//# sourceMappingURL=app.js.map