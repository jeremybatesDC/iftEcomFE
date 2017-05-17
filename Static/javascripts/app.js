webpackJsonp([0,1],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	// *********************
	//    Modules scripts
	// *********************
	'use strict';
	
	__webpack_require__(2);
	
	__webpack_require__(3);
	
	__webpack_require__(5);
	
	__webpack_require__(6);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';
	
	var bLazy = new Blazy({
		offset: 500,
		breakpoints: [{
			// Max-width
			width: 767,
			src: 'data-src-sm'
		}]
	});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

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
		var nodeListOfSubnavs = document.querySelectorAll('.' + navListLevel2ClassString);
		var navListLevel2ClassStringACTIVE = 'nav-list-level-2--ACTIVE';
	
		//if it has children, give it a listener. This allows top level items to behave like normal links if they have no children
		function iterateThroughNavItems() {
			for (var i = 0; i < navTopLevelItemLinks.length; i++) {
				var thisItem = navTopLevelItemLinks[i];
				if (thisItem.parentNode.querySelector('.' + navListLevel2ClassString)) {
					thisItem.addEventListener('click', decideCase, false);
				}
			}
	
			//need to add click handlers for nested arrows
		}
	
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
	
			//wrapping this timeline play in a function gives an added layer of control here
			function caseSibilingOpenOnCompleteFunction() {
				level2NavsTimeline.play();
			}
	
			//now, based on the scenario, play or pause
	
			//this needs access to the timeline
			switch (theScenario) {
				case 'iWasOpenWhenClicked':
					//console.log('case:iWasOpenWhenClicked');
					forceCloseStuff(event);
					showHideCloseTimeline.reverse();
					overlayTimeline.reverse();
	
					break;
	
				case 'sibilingOpenWhenClicked':
					//in this case, the overlay & close button stay put
					//console.log('case:sibilingOpenWhenClicked');
					forceCloseStuff(event, 'closeJustLevel2', caseSibilingOpenOnCompleteFunction);
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
	
		function forceCloseStuff(event, whatToClose, caseSibilingOpenOnCompleteFunction) {
	
			unMorphAllCarets();
			closeAllLevel2Navs();
	
			if (whatToClose === 'closeJustLevel2') {
				closeAllTopLevelNavs(caseSibilingOpenOnCompleteFunction);
			} else {
				overlayTimeline.reverse();
				closeAllTopLevelNavs(caseSibilingOpenOnCompleteFunction);
				showHideCloseTimeline.reverse();
			}
		}
	
		function unMorphAllCarets() {
			TweenMax.to(theNavSVGS, .01, {
				className: '-=caretMorphed'
			});
		}
	
		function closeAllLevel2Navs() {
			TweenMax.to(nodeListOfSubnavs, .1, {
				className: '-=nav-list-level-2--ACTIVE',
				ease: Power1.easeOut
			});
		}
	
		function closeAllTopLevelNavs(caseSibilingOpenOnCompleteFunction) {
			if (caseSibilingOpenOnCompleteFunction) {
				TweenMax.to(navTopLevelItems, .1, {
					className: '-=nav-list-level-1--ACTIVE',
					ease: Power1.easeOut,
					onComplete: caseSibilingOpenOnCompleteFunction
				});
			} else {
				TweenMax.to(navTopLevelItems, .1, {
					className: '-=nav-list-level-1--ACTIVE',
					ease: Power1.easeOut
				});
			}
		}
	
		//EVENTS GO HERE
		document.addEventListener('DOMContentLoaded', iterateThroughNavItems);
		navOverlayCloseTarget.addEventListener('click', forceCloseStuff, false);
		navLevel2CloseButton.addEventListener('click', forceCloseStuff, false);
	})();

/***/ }),
/* 4 */
/***/ (function(module, exports) {

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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _libUtilFunctionsRevisedJs = __webpack_require__(4);
	
	var _libUtilFunctionsRevisedJs2 = _interopRequireDefault(_libUtilFunctionsRevisedJs);
	
	//var timeline_navArrows = new TimelineMax({paused:true});
	
	var navTrigger = document.getElementById('navTrigger');
	var navMain = document.getElementById('navMain');
	function mobileNavHideReveal() {
		document.body.classList.toggle('has-nav--ACTIVE');
		_libUtilFunctionsRevisedJs2['default'].toggleTween(.1, navMain, 'main-nav-on-canvas');
	}
	
	navTrigger.addEventListener('click', mobileNavHideReveal, false);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';
	
	var currentPathName = window.location.pathname;
	var leftNavLinkElements = document.querySelectorAll('.sidebar__submenu-link');
	var hashArray = [];
	for (var i = 0; i < leftNavLinkElements.length; i++) {
		hashArray.push(leftNavLinkElements[i].pathname);
	};
	hashArray.find(function (paths) {
		if (paths == currentPathName) {
			document.querySelector('[href="' + currentPathName + '"]').classList += ' selected';
		};
	});

/***/ })
]);
//# sourceMappingURL=app.js.map