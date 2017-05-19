(function navModule(){
	var theSubnavOfTheItemThatHasBeenClicked;
	var theSVGOfTheItemThatHasBeenClicked;
	var theTopLevelItemThatHasBeenClicked;
	var the2ndLevelItemThatHasBeenClicked;
	var the3rdLevelNavOfTheItemThatHasBeenClicked;
	var theSVGOfTheL2ItemThatHasBeenClicked;

	const navListLevel2ClassString = 'nav-list-level-2';
	const navListLevel3ClassString = 'nav-list-level-3';
	const navListLevel2ITEMClassStringACTIVE = 'nav-list-level-2-item-ACTIVE';
	const navListLevel3ClassStringACTIVE = 'nav-list-level-3--ACTIVE';

	const navOverlayCloseTarget = document.getElementById('navOverlayCloseTarget');
	const navLevel2CloseButton = document.getElementById('navLevel2CloseButton');
	const arrayOftheNavSVGS = [...document.querySelectorAll('.caretDown')];
	const arrayOftheL2NavSVGS = [...document.querySelectorAll('.chevronDown')];

	const arrayOfNavTopLevelItems = [...document.querySelectorAll('.nav-list-top-level > li')];
	const arrayOfL2items = [...document.querySelectorAll('.nav-list-level-2 > li')];

	const arrayOfNavTopLevelItemLinks = [...document.querySelectorAll('.nav-list-top-level > li > a')];
	const arrayOfSecondLevelItemLinks = [...document.querySelectorAll('.nav-list-level-2 > li > a')];
	const arrayOfL2subnavs = [...document.querySelectorAll(`.${navListLevel2ClassString}`)];
	const arrayOfTertiaryNavs = [...document.querySelectorAll('.nav-list-level-3')];


	//if it has children, give it a listener. This allows top level items to behave like normal links if they have no children
	function iterateThroughNavItems(){
		
		arrayOfNavTopLevelItemLinks.map(function(theTopLevelLink){
			if(theTopLevelLink.parentNode.querySelector(`.${navListLevel2ClassString}`)){
				theTopLevelLink.addEventListener('click', decideCase, false);
			}
		})

		arrayOfSecondLevelItemLinks.map(function(theSecondLevelItemLink){
			if(theSecondLevelItemLink.parentNode.querySelector(`.${navListLevel3ClassString}`)){
				theSecondLevelItemLink.addEventListener('click', toggleMyTertiaryNav, false);
				//console.log('i am a secondary nav with tertiary children');
			}	
		})
	}

	function decideCase(event){
		var theScenario;
		//I am open?
		if(event.currentTarget.parentNode.querySelector('.nav-list-level-2--ACTIVE')){
			theScenario = 'iWasOpenWhenClicked';
		}
		//Is anyone open?
		else if(document.querySelectorAll('.nav-list-level-2--ACTIVE').length){
			theScenario = 'sibilingOpenWhenClicked';
		}
		//man, i guess nobody is open.
		else {
			theScenario = 'nobodyOpenWhenClicked';
			//addOverlayForOustideClick();
		}
		
		toggleMySubnav(event, theScenario);
	}

	function toggleMySubnav(event, theScenario){
		event.preventDefault();
		theTopLevelItemThatHasBeenClicked = event.currentTarget.parentNode;
		theSubnavOfTheItemThatHasBeenClicked = event.currentTarget.parentNode.querySelector(`.${navListLevel2ClassString}`);
		theSVGOfTheItemThatHasBeenClicked = event.currentTarget.parentNode.querySelector('.caretDown');

		//greensock timeline
		var level2NavsTimeline = new TimelineMax({paused:true});
		var theLIinQuestion = theSubnavOfTheItemThatHasBeenClicked.parentNode;
		level2NavsTimeline.to(theLIinQuestion, .1, {
				className: '+=nav-list-level-1--ACTIVE',
				ease: Power1.easeInOut
			}
		).to(theSVGOfTheItemThatHasBeenClicked, .1, {
				className: '+=caretMorphed',
				ease: Power1.easeInOut
			}
		)
		.to(theSubnavOfTheItemThatHasBeenClicked, .1, {
				className: '+=nav-list-level-2--ACTIVE',
				ease: Power1.easeInOut
			}
		)
		;

		//wrapping this timeline play in a function gives an added layer of control here
		function caseSibilingOpenOnCompleteFunction(){
			level2NavsTimeline.play();
		}

		//now, based on the scenario, play or pause
		switch(theScenario) {
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

	
	var overlayTimeline = new TimelineMax({paused:true});
	overlayTimeline.to(navOverlayCloseTarget, .25, {
			className: '+=overlayACTIVE',
			ease: Power4.easeInOut
		}
	);

	var showHideCloseTimeline = new TimelineMax({paused:true});
	showHideCloseTimeline.to(navLevel2CloseButton, .3333, {
			className: '+=navLevel2CloseButton--ACTIVE',
			ease: Power4.easeInOut
		}
	);

	function forceCloseStuff(event, whatToClose, caseSibilingOpenOnCompleteFunction){

		unMorphAllCarets();
		closeAllLevel2Navs();
		forceCloseL3Navs();

		if(whatToClose === 'closeJustLevel2'){
			closeAllTopLevelNavs(caseSibilingOpenOnCompleteFunction);
		}

		else {
			overlayTimeline.reverse();
			closeAllTopLevelNavs(caseSibilingOpenOnCompleteFunction);
			showHideCloseTimeline.reverse();
		}
	}

	function unMorphAllL2Chevrons(){
		TweenMax.to(arrayOftheL2NavSVGS, .1, {
			className: '-=chevronMorphed',
			ease: Power1.easeInOut
		})
	}


	function unMorphAllCarets(){
		TweenMax.to(arrayOftheNavSVGS, .01, {
			className: '-=caretMorphed',
			ease: Power1.easeInOut
		});
	}

	function closeAllLevel2Navs(){
		TweenMax.to(arrayOfL2subnavs, .1, {
			className: '-=nav-list-level-2--ACTIVE',
			ease: Power1.easeOut
		});
	}


	//only 2 cases so we can skip the decider function
	function toggleMyTertiaryNav(event){
		event.preventDefault();
		the2ndLevelItemThatHasBeenClicked = event.currentTarget.parentNode;
		the3rdLevelNavOfTheItemThatHasBeenClicked = event.currentTarget.parentNode.querySelector(`.${navListLevel3ClassString}`);
		theSVGOfTheL2ItemThatHasBeenClicked = event.currentTarget.parentNode.querySelector('.chevronDown');

		//remove all and do oncomplete if must then reopen

		if(the3rdLevelNavOfTheItemThatHasBeenClicked.classList.contains(navListLevel3ClassStringACTIVE)){
			//console.log('i was open when clicked so just close it all, dawg')
			forceCloseL3Navs();
		}

		else {
			//console.log('i was NOT open when clicked');
			//on complete timing wasNot working for some reason, so doing manually sequenced tweens here
			TweenMax.to(arrayOftheL2NavSVGS, .4, {
				className: '-=chevronMorphed',
				ease: Power1.easeInOut
			});
			TweenMax.to(theSVGOfTheL2ItemThatHasBeenClicked, .4, {
				className: '+=chevronMorphed',
				ease: Power1.easeInOut
			});

			TweenMax.to(arrayOfTertiaryNavs, .4, {
				className: '-=nav-list-level-3--ACTIVE',
				ease: Power1.easeInOut
			});
			TweenMax.to(the3rdLevelNavOfTheItemThatHasBeenClicked, .4, {
				className: '+=nav-list-level-3--ACTIVE',
				ease: Power1.easeInOut
			});

			TweenMax.to(arrayOfL2items, .4, {
				className: '-=nav-list-level-2-item-ACTIVE',
				ease: Power1.easeInOut
			});
			TweenMax.to(the2ndLevelItemThatHasBeenClicked, .4, {
				className: '+=nav-list-level-2-item-ACTIVE',
				ease: Power1.easeInOut
			});
			
		}
	}
	
	function forceCloseL3Navs(){
		//consider making timeline
		TweenMax.to(arrayOftheL2NavSVGS, .01, {
			className: '-=chevronMorphed',
			ease: Power1.easeInOut
		});
		TweenMax.to(arrayOfTertiaryNavs, .1, {
			className: '-=nav-list-level-3--ACTIVE',
			ease: Power1.easeInOut
		});
		TweenMax.to(arrayOfL2items, .1, {
			className: '-=nav-list-level-2-item-ACTIVE',
			ease: Power1.easeInOut
		});
	}
	
	function closeAllTopLevelNavs(caseSibilingOpenOnCompleteFunction){
		if(caseSibilingOpenOnCompleteFunction){
			TweenMax.to(arrayOfNavTopLevelItems, .1, {
				className: '-=nav-list-level-1--ACTIVE',
				ease: Power1.easeOut,
				onComplete: caseSibilingOpenOnCompleteFunction
			});
		}
		else {
			TweenMax.to(arrayOfNavTopLevelItems, .1, {
				className: '-=nav-list-level-1--ACTIVE',
				ease: Power1.easeOut
			});
		}
	}

	//EVENTS GO HERE
	document.addEventListener('DOMContentLoaded', iterateThroughNavItems);
	navOverlayCloseTarget.addEventListener('click', forceCloseStuff, false);
	navLevel2CloseButton.addEventListener('click', forceCloseStuff, false );

})();