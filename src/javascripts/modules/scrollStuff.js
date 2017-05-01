//generalize to something like "scrollListeners?"

import Throttled from 'lib/throttled.js';
import utilFunctions from 'lib/utilFunctions-revised.js';
import animationFunctionsToExport from 'lib/animationLayer.js'

(function() {
	
	var scrollYPos;
	const backToTop = document.getElementById('backToTop');
	const mainNavCombinedWrapper = document.querySelector('.nav-combined--wrapper');
	const navUtility = document.querySelector('.nav-utility');
	const logoContainerMain = document.querySelector('.logo-container--main');
	const testimonialsSublayout  = document.querySelector('.sublayout.sublayout__autoColGrid.sublayout--has-bg-image');
	let tripWire_experience_triggered = false;
	
	///no reason to tripwire the people i think
	let tripWire_people_triggered = true;
	

	let tripWire_emailIcon_triggered = false;


	function scrollToTop(){
		TweenMax.to(window, 1, {
			scrollTo:0,
			ease: Power4.easeInOut
		});
	}

	//this the "wait" parameter isn't doing what I expect
	function throttleInit() {

		//maybe i should try not throttling
		let standardThrottle = 100;
		var arrayOfGlobalFunctionsToThrottle = [getSetScrollYPos, checkScrollTop];
		var arrayOfHomepageFunctionsToThrottle = [parallaxPixels, parallaxPeople, amIinViewport];
		//var arrayOfContentPageFunctionsToThrottle = [scrollShare];

		for(let i = 0; i < arrayOfGlobalFunctionsToThrottle.length; i++){
			Throttled(arrayOfGlobalFunctionsToThrottle[i](), standardThrottle);
		}

		//better to throttle it here, or do it in a way where I can remove the event listener?
		if(document.querySelector('.body-home')){
			for(let i = 0; i < arrayOfHomepageFunctionsToThrottle.length; i++){
				Throttled(arrayOfHomepageFunctionsToThrottle[i](), standardThrottle);
			}
			//amIinViewport(elementToMeasure, whichTripWire);
		}

		// if(document.querySelector('.card-component--testimonial')){
		// 	Throttled(arrayOfHomepageFunctionsToThrottle[i](), standardThrottle);
		// }

		if(document.querySelector('.social-link__group--share')){
			Throttled(scrollShare(), standardThrottle);
		}
	};

	function getSetScrollYPos(){
		scrollYPos = window.scrollY;
	}

	function parallaxPixels(){
		if(document.querySelector('.parallaxPixels')){
			const thePixels = document.querySelectorAll('.parallaxPixels');
		
			let i = 8;
			let i2 = 12;

			//there's only 2, so the loop was stupid
			TweenMax.to(thePixels[0], 3, {backgroundPositionY: -scrollYPos/i, ease: Power1.easeOut});
			TweenMax.to(thePixels[1], 5, {backgroundPositionY: -scrollYPos/i2, ease: Power1.easeOut});
		}
		

	}

	function parallaxPeople(){
		if(document.querySelector('.parallaxPeople')){
			const theFirstColumnOfPeople = document.querySelector('.parallaxPeople .column-auto:first-child');
			const theSecondColumnOfPeople = document.querySelector('.parallaxPeople .column-auto:nth-child(2)');
			TweenMax.to(theFirstColumnOfPeople, .6666, {y: -scrollYPos/3, ease:Linear.easeOut});
			TweenMax.to(theSecondColumnOfPeople, .3333, {y: -scrollYPos/6, ease:Linear.easeOut});
		}
		
	}

	//phase 2?
	// function panTestimonialsBackground(){
	// 	const testimonials = document.querySelector('.sublayout__testimonials');
	// 	TweenMax.set(testimonials, {backgroundPositionY: -scrollYPos/2, ease:Linear.easeNone});
	// }
	

	//need to measure from top (otherwise this is giving a misleading result if page)
	function amIinViewport(elementToMeasure, whichTripWire){
		if (!tripWire_experience_triggered && document.querySelector('.sublayout__testimonials')) {
			let elementToMeasure = testimonialsSublayout;
			let rect = elementToMeasure.getBoundingClientRect();
			//let html = document.documentElement;
			if(rect.top < 100 && rect.top > -300) {
				//calling animation here
				animationFunctionsToExport.animation_testimonials();
				tripWire_experience_triggered = true;
			}
		}

	}

	function scrollTestimonialsBackground(){
		TweenMax.to(testimonialsSublayout, .3, {background: 200, ease: Power1.easeOut});
	}
	


	//need to do another tripwire for the email icon


	function scrollShare(){
		const socialShareTop = document.querySelector('.social-link__group--share:first-of-type');
		TweenMax.to(socialShareTop, .5, {y: scrollYPos, ease: Power4.easeOut});

		let elementToMeasure = document.querySelector('.sublayout__contentBlock');
		let rect = elementToMeasure.getBoundingClientRect();

		let socialShareTopHeight = socialShareTop.clientHeight;

		//let cutOffPoint = rect.bottom - socialShareTopHeight;


		//I could capture the last scroll pos and then use it to affix the share
		if(rect.bottom < 300) {
			//console.log(socialShareTopHeight);
			TweenMax.to(socialShareTop, .15, {opacity: 0, ease: Power1.easeOut});
		}
		else {
			TweenMax.to(socialShareTop, .15, {opacity: 1, ease: Power1.easeOut});
		}

		
	}


	//so these happen at the same time, not on a timeline
	function timelineHeaderScrollPlay(){
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

	function timelineHeaderScrollReverse(){
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



	var backToTopTimeline = new TimelineMax({paused:true});
	backToTopTimeline.to(backToTop, .3333, {
		className: '+=opaque'
	});

	//don't use toggle, because we want to be explicit about it here
	
	function checkScrollTop(){
		//firefox needs scrollTop defined differently
		//for details, see http://stackoverflow.com/questions/28633221/document-body-scrolltop-firefox-returns-0-only-js
		var scrollPosFromTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
		backToTopFunction(scrollPosFromTop);
		headerScrollPlayReverse(scrollPosFromTop);
	}

	function backToTopFunction(scrollPosFromTop){
		if(scrollPosFromTop > 300){
			backToTopTimeline.play();
		}
		else {
			backToTopTimeline.reverse();

		}
	}

	function headerScrollPlayReverse(scrollPosFromTop){
		if(scrollPosFromTop > 100){
			timelineHeaderScrollPlay();

		}
		else if(scrollPosFromTop <= 100){
			timelineHeaderScrollReverse();
		}
	}
	
	backToTop.addEventListener('click', scrollToTop, false);
	window.addEventListener('scroll', throttleInit, false);
	//document.addEventListener('DOMContentLoaded', amIinViewport, false);


})();
