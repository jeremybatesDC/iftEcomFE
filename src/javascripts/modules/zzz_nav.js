//if menu is open, and there's a hash change, close the menu
//that gives us back functionality

import utilFunctions from 'lib/utilFunctions-revised.js';

(function navModule(){
	const docBody = document.body;
	//refactor to avoid overlapping queries
	const navTopLevelItems = document.querySelectorAll('.nav-list-top-level > li');
	const navTopLevelItemLinks = document.querySelectorAll('.nav-list-top-level > li > a');
	const navListLevel2ClassString = 'nav-list-level-2';
	const navListLevel2ClassACTIVE = 'nav-list-level-2--ACTIVE';
	const navOverlayCloseTargetString = 'navOverlayCloseTarget';
	const navOverlay = document.getElementById('navOverlayCloseTarget');
	const navLevel2CloseButton = document.querySelector('.nav-level-2-close-button__wrapper');

	function controlHash(){
		if(location.hash === 'test'){
			alert('test');
		}
		location.hash = '';
	}

	function iterateThroughNavItems(){
		//countSubnavItems();
		for(let i = 0; i < navTopLevelItemLinks.length; i++){
			let thisItem = navTopLevelItemLinks[i];
			//if it has children, give it a listener
			if(thisItem.parentNode.querySelector(`.${navListLevel2ClassString}`)){
				//add "false"?
				thisItem.addEventListener('click', toggleMySubnav);
			}
		}
	}

	function toggleMySubnav(event){
		event.preventDefault();
		var theTopLevelLinkClicked = event.currentTarget;
		var theSubnav = event.currentTarget.parentNode.querySelector(`.${navListLevel2ClassString}`);
		var arrayOfSubnavs = document.querySelectorAll(`.${navListLevel2ClassString}`);
		
		//if the nav isn't already active, close everything then open it
		if(!theSubnav.classList.contains(navListLevel2ClassACTIVE)){			
			for(let i=0; i < arrayOfSubnavs.length; i++){
				var subnavIteration = arrayOfSubnavs[i];
				TweenMax.to(subnavIteration, .2, {
					className: '-=nav-list-level-2--ACTIVE',
					ease: Power1.easeOut
				});
			}
		}
		

		utilFunctions.toggleTween(.3333, theSubnav, navListLevel2ClassACTIVE, addOverlayForOustideClick, removeOverlay);

		

	}


	//this keeps adding multiple


	var overlayTimeline = new TimelineMax({paused:true});
	overlayTimeline.to(navOverlay, .25, {
			className: '+=overlayACTIVE',
			ease: Power4.easeInOut
		}
	);

	var navLevel2CloseButtonTimeline = new TimelineMax({paused:true});
	navLevel2CloseButtonTimeline.to(navLevel2CloseButton, .25, {
			className: '+=nav-level-2-close-button__wrapper--VISIBLE',
			ease: Power4.easeInOut
		}
	);

	

	function activeNavItemFunction(theTopLevelLinkClicked) {
		var activeNavItemTimeLine = new TimelineMax({paused:true});
		activeNavItemTimeLine.to(theTopLevelLinkClicked, .25, {
				className: '+=topLevelNavItemACTIVE',
				ease: Power4.easeInOut
			}
		);
		if(!theTopLevelLinkClicked.classList.contains('topLevelNavItemACTIVE')){
			activeNavItemTimeLine.play();
			console.log('play');
		}
		else if(theTopLevelLinkClicked.classList.contains('topLevelNavItemACTIVE')) {
			activeNavItemTimeLine.reverse();
			console.log('reverse');
		}
	}


	//want to do something less expensive DOMwise
	function addOverlayForOustideClick(){
		overlayTimeline.play();
		navLevel2CloseButtonTimeline.play();
		
	}

	function removeOverlay(){
		overlayTimeline.reverse();
	}

	function forceCloseSubNav(event){
		removeOverlay();
		
		//reverse

		var arrayOfSubnavs = document.querySelectorAll(`.${navListLevel2ClassACTIVE}`);
		for(let i=0; i<arrayOfSubnavs.length; i++){
			var theSubNavToTween = arrayOfSubnavs[i];
			TweenMax.to(theSubNavToTween, .2, {
				className: `-=${navListLevel2ClassACTIVE}`,
				ease: Power1.easeIn
			});
		}

	}

	
	

	//markupForCloseTarget.insertBefore()



	//EVENTS GO HERE
	document.addEventListener('DOMContentLoaded', iterateThroughNavItems);
	navLevel2CloseButton.addEventListener('click', forceCloseSubNav, false )

})();