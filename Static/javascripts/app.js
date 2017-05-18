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
	'use strict';
	
	__webpack_require__(2);
	
	__webpack_require__(3);
	
	__webpack_require__(4);
	
	__webpack_require__(6);

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
/***/ function(module, exports) {

	'use strict';
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }
	
	(function navModule() {
		var theSubnavOfTheItemThatHasBeenClicked;
		var theSVGOfTheItemThatHasBeenClicked;
		var theTopLevelItemThatHasBeenClicked;
		var the2ndLevelItemThatHasBeenClicked;
		var the3rdLevelNavOfTheItemThatHasBeenClicked;
		var theSVGOfTheL2ItemThatHasBeenClicked;
	
		var navListLevel2ClassString = 'nav-list-level-2';
		var navListLevel3ClassString = 'nav-list-level-3';
		var navListLevel2ClassStringACTIVE = 'nav-list-level-2--ACTIVE';
		var navListLevel3ClassStringACTIVE = 'nav-list-level-3--ACTIVE';
	
		var navOverlayCloseTarget = document.getElementById('navOverlayCloseTarget');
		var navLevel2CloseButton = document.getElementById('navLevel2CloseButton');
		var arrayOftheNavSVGS = [].concat(_toConsumableArray(document.querySelectorAll('.caretDown')));
		var arrayOfNavTopLevelItems = [].concat(_toConsumableArray(document.querySelectorAll('.nav-list-top-level > li')));
		var arrayOfNavTopLevelItemLinks = [].concat(_toConsumableArray(document.querySelectorAll('.nav-list-top-level > li > a')));
		var arrayOfSecondLevelItemLinks = [].concat(_toConsumableArray(document.querySelectorAll('.nav-list-level-2 > li > a')));
		var arrayOfL2subnavs = [].concat(_toConsumableArray(document.querySelectorAll('.' + navListLevel2ClassString)));
		var arrayOfTertiaryNavs = [].concat(_toConsumableArray(document.querySelectorAll('.nav-list-level-3')));
	
		//if it has children, give it a listener. This allows top level items to behave like normal links if they have no children
		function iterateThroughNavItems() {
	
			arrayOfNavTopLevelItemLinks.map(function (theTopLevelLink) {
				if (theTopLevelLink.parentNode.querySelector('.' + navListLevel2ClassString)) {
					theTopLevelLink.addEventListener('click', decideCase, false);
				}
			});
	
			arrayOfSecondLevelItemLinks.map(function (theSecondLevelItemLink) {
				if (theSecondLevelItemLink.parentNode.querySelector('.' + navListLevel3ClassString)) {
					theSecondLevelItemLink.addEventListener('click', toggleMyTertiaryNav, false);
					console.log('i am a secondary nav with tertiary children');
				}
			});
		}
	
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
			forceCloseL3Navs();
	
			if (whatToClose === 'closeJustLevel2') {
				closeAllTopLevelNavs(caseSibilingOpenOnCompleteFunction);
			} else {
				overlayTimeline.reverse();
				closeAllTopLevelNavs(caseSibilingOpenOnCompleteFunction);
				showHideCloseTimeline.reverse();
			}
		}
	
		function unMorphAllCarets() {
			TweenMax.to(arrayOftheNavSVGS, .01, {
				className: '-=caretMorphed'
			});
		}
	
		function closeAllLevel2Navs() {
			TweenMax.to(arrayOfL2subnavs, .1, {
				className: '-=nav-list-level-2--ACTIVE',
				ease: Power1.easeOut
			});
		}
	
		//only 2 cases so we can skip the decider function
		function toggleMyTertiaryNav(event) {
			event.preventDefault();
			the2ndLevelItemThatHasBeenClicked = event.currentTarget.parentNode;
			the3rdLevelNavOfTheItemThatHasBeenClicked = event.currentTarget.parentNode.querySelector('.' + navListLevel3ClassString);
			theSVGOfTheL2ItemThatHasBeenClicked = event.currentTarget.parentNode.querySelector('.caretDown');
	
			//remove all and do oncomplete if must then reopen
	
			if (the3rdLevelNavOfTheItemThatHasBeenClicked.classList.contains(navListLevel3ClassStringACTIVE)) {
				//console.log('i was open when clicked so just close it all, dawg')
				forceCloseL3Navs();
			} else {
				//console.log('i was NOT open when clicked');
				//on complete timing wasNot working for some reason, so doing manual tweens here
				TweenMax.to(arrayOfTertiaryNavs, .25, {
					className: '-=nav-list-level-3--ACTIVE',
					ease: Power1.easeInOut
				});
				TweenMax.to(the3rdLevelNavOfTheItemThatHasBeenClicked, .25, {
					className: '+=nav-list-level-3--ACTIVE',
					ease: Power1.easeInOut
				});
	
				//must do other stuff like carets and active state for the LI
			}
		}
	
		function forceCloseL3Navs() {
			TweenMax.to(arrayOfTertiaryNavs, .1, {
				className: '-=nav-list-level-3--ACTIVE',
				ease: Power1.easeInOut
			});
		}
	
		function closeAllTopLevelNavs(caseSibilingOpenOnCompleteFunction) {
			if (caseSibilingOpenOnCompleteFunction) {
				TweenMax.to(arrayOfNavTopLevelItems, .1, {
					className: '-=nav-list-level-1--ACTIVE',
					ease: Power1.easeOut,
					onComplete: caseSibilingOpenOnCompleteFunction
				});
			} else {
				TweenMax.to(arrayOfNavTopLevelItems, .1, {
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _libUtilFunctionsRevisedJs = __webpack_require__(5);
	
	var _libUtilFunctionsRevisedJs2 = _interopRequireDefault(_libUtilFunctionsRevisedJs);
	
	//var timeline_navArrows = new TimelineMax({paused:true});
	
	var navTrigger = document.getElementById('navTrigger');
	var navMain = document.getElementById('navMain');
	function mobileNavHideReveal() {
		document.body.classList.toggle('has-nav--ACTIVE');
		_libUtilFunctionsRevisedJs2['default'].toggleTween(.1, navMain, 'main-nav-on-canvas');
	}
	
	navTrigger.addEventListener('click', mobileNavHideReveal, false);

/***/ },
/* 5 */
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
/* 6 */
/***/ function(module, exports) {

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

/***/ }
]);
//# sourceMappingURL=app.js.map