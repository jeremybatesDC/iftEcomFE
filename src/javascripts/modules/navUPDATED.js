//if menu is open, and there's a hash change, close the menu
//that gives us back functionality

import utilFunctions from 'lib/utilFunctions-revised.js';

(function navModule(){
	var theSubnavOfTheItemThatHasBeenClicked;
	var theSVGOfTheItemThatHasBeenClicked;
	var theTopLevelItemThatHasBeenClicked;

	const navOverlayCloseTarget = document.getElementById('navOverlayCloseTarget');

	var navLevel2CloseButton = document.getElementById('navLevel2CloseButton');

	const navTopLevelItems = document.querySelectorAll('.nav-list-top-level > li');
	const theNavSVGS = document.querySelectorAll('.caretDown');

	const navListLevel1ClassString = 'nav-list-level-1--ACTIVE';
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
		//add hover handlers for all top level items
		// for (let i = 0; i < navTopLevelItems.length; i++){
		// 	let thisIteration = navTopLevelItems[i];
		// 	thisIteration.addEventListener('mouseenter', navTopLevelItemsMouseEnter, false);
		// 	thisIteration.addEventListener('mouseleave', navTopLevelItemsMouseLeave, false);
		// }

	}


	//do not impact things that are already active to avoid conflicts
	function navTopLevelItemsMouseEnter(event){
		let theTopLevelLIinQuestion = event.currentTarget;
		if (!theTopLevelLIinQuestion.classList.contains(navListLevel1ClassString)) {
			TweenMax.to(theTopLevelLIinQuestion, .25, {
				className: '+=nav-list-level-1--HOVER',
				ease: Power1.easeInOut
			}
			);
		}
	}

	//do not impact things that are already active to avoid conflicts
	function navTopLevelItemsMouseLeave(event){
		let theTopLevelLIinQuestion = event.currentTarget;
		if (!theTopLevelLIinQuestion.classList.contains(navListLevel1ClassString)) {
			TweenMax.to(theTopLevelLIinQuestion, .25, {
				className: '-=nav-list-level-1--HOVER',
				ease: Power1.easeInOut
			}
			);
		}
	}

	//if active


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


		//this is necessary because brute force close all interferes with animation timelines
		function caseSibilingOpenOnCompleteFunction(){
			level2NavsTimeline.play();
		}


		//locally overriding theSubNavInQuestion
		function forceCloseLevel2Navs(caseSibilingOpenOnCompleteFunction){
			//unintutively hard to make this a reverse
			for(let i=0; i < arrayOfSubnavs.length; i++){
				let subnavIteration = arrayOfSubnavs[i];
				let svgIteration =  theNavSVGS[i];
				let activeTopLevelIteration = navTopLevelItems[i];
				TweenMax.to(subnavIteration, .1, {
					className: '-=nav-list-level-2--ACTIVE',
					ease: Power1.easeOut
				});
				TweenMax.to(svgIteration, .1, {
					className: '-=caretMorphed',
					ease: Power1.easeOut
				});

				if(caseSibilingOpenOnCompleteFunction){
					TweenMax.to(activeTopLevelIteration, .1, {
						className: '-=nav-list-level-1--ACTIVE',
						ease: Power1.easeOut,
						onComplete: caseSibilingOpenOnCompleteFunction
					});
				}
				else {
					TweenMax.to(activeTopLevelIteration, .1, {
						className: '-=nav-list-level-1--ACTIVE',
						ease: Power1.easeOut
					});
				}


			}
		}





		//now, based on the scenario, play or pause


		//this needs access to the timeline
		switch(theScenario) {
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



	//var caretDown = document.querySelector('.caretDown');

	//i want these to happen simultaneously so I should remove them from timeline
	

	function forceCloseAll(event){
		
		overlayTimeline.reverse();
		//function isn't easily accessible
		//forceCloseLevel2Nav();

		//but maybe brute force of closing all isn't necessary, since there's only one open

		for(let i=0; i < arrayOfSubnavs.length; i++){
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
	navLevel2CloseButton.addEventListener('click', forceCloseAll, false );

})();
