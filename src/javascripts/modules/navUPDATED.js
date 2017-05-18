(function navModule(){
	var theSubnavOfTheItemThatHasBeenClicked;
	var theSVGOfTheItemThatHasBeenClicked;
	var theTopLevelItemThatHasBeenClicked;
	var the2ndLevelItemThatHasBeenClicked;
	var the3rdLevelNavOfTheItemThatHasBeenClicked;
	var theSVGOfTheL2ItemThatHasBeenClicked;

	const navListLevel2ClassString = 'nav-list-level-2';
	const navListLevel3ClassString = 'nav-list-level-3';
	const navListLevel2ClassStringACTIVE = 'nav-list-level-2--ACTIVE';
	const navListLevel3ClassStringACTIVE = 'nav-list-level-3--ACTIVE';


	const navOverlayCloseTarget = document.getElementById('navOverlayCloseTarget');
	const navLevel2CloseButton = document.getElementById('navLevel2CloseButton');

	const trueArrayOfNavTopLevelItems = [...document.querySelectorAll('.nav-list-top-level > li')];


	const trueArrayOftheNavSVGS = [...document.querySelectorAll('.caretDown')];

	const trueArrayOfNavTopLevelItemLinks = [...document.querySelectorAll('.nav-list-top-level > li > a')];
	const trueArrayOfL2subnavs = [...document.querySelectorAll(`.${navListLevel2ClassString}`)];
	

	


	const nodeListOfSecondLevelItemLinks = document.querySelectorAll('.nav-list-level-2 > li > a');

	const trueArrayOfSecondLevelItemLinks = [...document.querySelectorAll('.nav-list-level-2 > li > a')];

	const trueArrayOfTertiaryNavs = [...document.querySelectorAll('.nav-list-level-3')];



	
	//if it has children, give it a listener. This allows top level items to behave like normal links if they have no children
	function iterateThroughNavItems(){
		
		trueArrayOfNavTopLevelItemLinks.map(function(theTopLevelLink){
			if(theTopLevelLink.parentNode.querySelector(`.${navListLevel2ClassString}`)){
				theTopLevelLink.addEventListener('click', decideCase, false);
			}
		})

		//adding event listeners is faster with map
		trueArrayOfSecondLevelItemLinks.map(function(theSecondLevelItemLink){
			if(theSecondLevelItemLink.parentNode.querySelector(`.${navListLevel3ClassString}`)){
				theSecondLevelItemLink.addEventListener('click', closeAllLevel3Navs, false);
				console.log('i am a secondary nav with tertiary children');
			}
			
		})


	}

	//make this a pure decider, not a doer, so move overlay manipulation?
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

		//this needs access to the timeline
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


	//this keeps adding multiple


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
		
		if(whatToClose === 'closeJustLevel2'){
			closeAllTopLevelNavs(caseSibilingOpenOnCompleteFunction);
		}

		else {
			overlayTimeline.reverse();
			closeAllTopLevelNavs(caseSibilingOpenOnCompleteFunction);
			showHideCloseTimeline.reverse();
		}

	}

	function unMorphAllCarets(){
		TweenMax.to(trueArrayOftheNavSVGS, .01, {
			className: '-=caretMorphed'
		});
	}

	function closeAllLevel2Navs(){
		TweenMax.to(trueArrayOfL2subnavs, .1, {
			className: '-=nav-list-level-2--ACTIVE',
			ease: Power1.easeOut
		});
	}

	function closeAllLevel3Navs(){
		TweenMax.to(trueArrayOfTertiaryNavs, .1, {
			className: '-=nav-list-level-2--ACTIVE',
			onComplete: testL3function
		});
	}

	function testL3function(){
		console.log('testL3function');
	}


	function closeAllTopLevelNavs(caseSibilingOpenOnCompleteFunction){
		if(caseSibilingOpenOnCompleteFunction){
			TweenMax.to(trueArrayOfNavTopLevelItems, .1, {
				className: '-=nav-list-level-1--ACTIVE',
				ease: Power1.easeOut,
				onComplete: caseSibilingOpenOnCompleteFunction
			});
		}
		else {
			TweenMax.to(trueArrayOfNavTopLevelItems, .1, {
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