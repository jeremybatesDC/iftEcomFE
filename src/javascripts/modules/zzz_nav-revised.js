//if menu is open, and there's a hash change, close the menu
//that gives us back functionality

import utilFunctions from 'lib/utilFunctions-revised.js';

(function navModule(){
	const docBody = document.body;
	const navTrigger = document.getElementById('navTrigger');
	const navMain = document.getElementById('navMain');
	const navTopLevelItems = document.querySelectorAll('.nav-list-top-level > li');
	const navListLevel2ClassString = 'nav-list-level-2';
	const navListTopLevelClassACTIVE = 'nav-top-level-item--ACTIVE'
	const navListLevel2ClassACTIVE = 'nav-list-level-2--ACTIVE';
	const navOverlayCloseTargetString = 'navOverlayCloseTarget';

	const plusTween = '+=';
	const minusTween = '-=';

	function navRevealHide(){
		docBody.classList.toggle('has-nav--ACTIVE');
		utilFunctions.toggleTween(navMain, 'main-nav-on-canvas');
	}

	function controlHash(){
		if(location.hash === 'test'){
			alert('test');
		}
		location.hash = '';
	}

	function iterateThroughNavItems(){
		//if the LI has children, attach a listener to it
		for(let i = 0; i < navTopLevelItems.length; i++){
			let thisItem = navTopLevelItems[i];
			if(thisItem.querySelector(`.${navListLevel2ClassString}`)){
				thisItem.addEventListener('click', toggleMySubnav);
			}
			
		}
	}

	function toggleMySubnav(event){
		//must use currentTarget
		var theTopLevelItem = event.currentTarget;
		//find subnav of the LI clicked
		var theSubnav = theTopLevelItem.querySelector(`.${navListLevel2ClassString}`);

		var arrayOfSubnavs = document.querySelectorAll(`.${navListLevel2ClassString}`);
		//force remove active class from all subnavs
		
		//if the subnav isn't active


		utilFunctions.toggleTween(theSubnav, navListLevel2ClassACTIVE, addOverlayForOustideClick, removeOverlay);

		// if(!theSubnav.classList.contains(navListLevel2ClassACTIVE)){
			
		// 	utilFunctions.pureTweenArrayTo(navTopLevelItems, minusTween, navListTopLevelClassACTIVE);
		// 	utilFunctions.pureTweenThingTo(theSubnav, minusTween, navListLevel2ClassACTIVE);

		// 	removeOverlay(event);
		// }


	}


	//utilFunctions.pureTweenArrayTo(navTopLevelItems, navListTopLevelClassACTIVE);

	// function forceTweenFrom(){
	// 	for(let i=0; i < thingToLoop.length; i++) {
	// 		var itemIteration = thingToLoop[i];
	// 		utilFunctions.pureTweenThingTo(itemIteration, '-=', classToTweenFrom);
	// 	}		
	// }



	//this keeps adding multiple

	//want to do something less expensive DOMwise
	function addOverlayForOustideClick(){
		//force this to remove only, not toggle
		if(!document.getElementById(navOverlayCloseTargetString)){
			var theOverlayContainer = document.createElement('div');
			theOverlayContainer.setAttribute('id', navOverlayCloseTargetString);
			docBody.appendChild(theOverlayContainer);
			theOverlayContainer.addEventListener('click', forceCloseSubNav);
		}
	}

	function removeOverlay(event){
		if(document.getElementById(navOverlayCloseTargetString)){
			var theOverlay = document.getElementById(navOverlayCloseTargetString);
			theOverlay.removeEventListener('click', removeOverlay);
			var theParentNodeOfTheOverlay = theOverlay.parentNode;
			theParentNodeOfTheOverlay.removeChild(theOverlay);
		}
	}



	function forceCloseSubNav(event){
		var arrayOfSubnavs = document.querySelectorAll(`.${navListLevel2ClassACTIVE}`);
		utilFunctions.pureTweenArrayTo(arrayOfSubnavs, minusTween, navListLevel2ClassACTIVE);
		removeOverlay(event);
	}
	

	//markupForCloseTarget.insertBefore()



	//EVENTS GO HERE
	document.addEventListener('DOMContentLoaded', iterateThroughNavItems);
	navTrigger.addEventListener('click', navRevealHide);

	//window.addEventListener('hashchange', );
	//navTopLevelItems.addEventListener('click', testFunction);

	//limit hashchange to mobile?


	function testFunction1(){
		console.log('test function 1');
	}
	function testFunction2(){
		console.log('test function 2');
	}


})();