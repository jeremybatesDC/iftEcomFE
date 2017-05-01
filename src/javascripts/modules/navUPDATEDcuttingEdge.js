//if menu is open, and there's a hash change, close the menu
//that gives us back functionality

import utilFunctions from 'lib/utilFunctions-revised.js';

(function navModule(){
	const navOverlayCloseTarget = document.getElementById('navOverlayCloseTarget');
	const navTopLevelItems = document.querySelectorAll('.nav-list-top-level > li');
	const navTopLevelItemLinks = document.querySelectorAll('.nav-list-top-level > li > a');
	const navListLevel2ClassString = 'nav-list-level-2';
	const arrayOfSubnavs = document.querySelectorAll(`.${navListLevel2ClassString}`);
	const navListLevel2ClassStringACTIVE = 'nav-list-level-2--ACTIVE';
	
	//if it has children, give it a listener. This allows top level items to behave like normal links if they have no children
	function iterateThroughNavItems(){
		for(let i = 0; i < navTopLevelItemLinks.length; i++){
			let thisItem = navTopLevelItemLinks[i];
			if(thisItem.parentNode.querySelector(`.${navListLevel2ClassString}`)){
				thisItem.addEventListener('click', decideCase, false);
			}
		}
	}

	//make this a pure decider, not a doer, so move overlay manipulation?
	function decideCase(event){
		var theScenario;
		//I am open?
		if(event.currentTarget.parentNode.querySelector('.nav-list-level-2--ACTIVE')){
			theScenario = 'iWasOpenWhenClicked';
			removeOverlay();
		}
		//Is anyone open?
		else if(document.querySelectorAll('.nav-list-level-2--ACTIVE').length){
			theScenario = 'sibilingOpenWhenClicked';
		}
		//man, i guess nobody is open.
		else {
			theScenario = 'nobodyOpenWhenClicked';
			addOverlayForOustideClick();
		}
		
		toggleMySubnav(event, theScenario);
		//navLevel2Toggle(event, theScenario);
	}


	function toggleMySubnav(event, theScenario){
		event.preventDefault();
		var theSubnavInQuestion;
	
		//greensock timeline
		var level2NavsTimeline = new TimelineMax({paused:true});
		level2NavsTimeline.to(theSubnavInQuestion, .25, {
				className: '+=nav-list-level-2--ACTIVE',
				ease: Power4.easeInOut
			}
		);

		//locally overriding theSubNavInQuestion
		function forceCloseLevel2Navs(){
			//but there's only ever one that's open
				//theSubnavInQuestion = document.querySelector('.nav-list-level-2--ACTIVE');
				//level2NavsTimeline.reverse();

				for(let i=0; i < arrayOfSubnavs.length; i++){
				var subnavIteration = arrayOfSubnavs[i];
				TweenMax.to(subnavIteration, .2, {
					className: '-=nav-list-level-2--ACTIVE',
					ease: Power1.easeOut
				});
			}
		}

		//now, based on the scenario, play or pause


		//this needs access to the timeline
		switch(theScenario) {
			case 'iWasOpenWhenClicked':
				console.log('case:iWasOpenWhenClicked');
				forceCloseLevel2Navs();
				overlayTimeline.reverse();
				break;

			//these next 2 cases can have the same action
			case 'sibilingOpenWhenClicked':
				console.log(theScenario);
				forceCloseLevel2Navs();
				level2NavsTimeline.play();
				break;

			case 'nobodyOpenWhenClicked':
				console.log(theScenario);
				overlayTimeline.play();
				level2NavsTimeline.play();
				break;
		}


		//forceCloseLevel2Navs();
		//level2NavsTimeline.play();
		utilFunctions.toggleTween(.3333, theSubnavInQuestion, navListLevel2ClassStringACTIVE);

	}


	//this keeps adding multiple


	var overlayTimeline = new TimelineMax({paused:true});
	overlayTimeline.to(navOverlayCloseTarget, .25, {
			className: '+=overlayACTIVE',
			ease: Power4.easeInOut
		}
	);












	//want to do something less expensive DOMwise
	function addOverlayForOustideClick(){
		overlayTimeline.play();
	}

	function removeOverlay(){
		overlayTimeline.reverse();
	}


	function forceCloseAll(event){
		overlayTimeline.reverse();
		forceCloseLevel2Nav();
	}

	


	//EVENTS GO HERE
	document.addEventListener('DOMContentLoaded', iterateThroughNavItems);
	navOverlayCloseTarget.addEventListener('click', forceCloseAll, false);

})();
