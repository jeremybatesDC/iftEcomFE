//various functions can import animations from this central location
import utilFunctions from 'lib/utilFunctions-revised.js';
import Throttled from 'lib/throttled.js';

//check if homepage

(function animationModule(){
	const logoToAnimate = document.querySelector('.logo-container');
	const logoTopSvgGleaf = document.querySelector('.logo__top__svg__g__leaf');
	const logoTopSvgGwords = document.querySelector('.logo__top__svg__g__words');
	const logoTopSvgGyear = document.querySelector('.logo__top__svg__g__year');

	//generalize
	function animation_homePageHero(){
		//let's grab some elements that are on homepage

			// i should ask the backend for some IDs
			
			//need to make array of and loop through counters
			const countersToAnimate = document.querySelectorAll('.counter-component');
			const pageHeaderContent = document.querySelector('.page-header__content');
			const navCombinedWrapper = document.querySelector('.nav-combined--wrapper');
			const homePageHeroButtons = document.querySelectorAll('.homePageHeroButton');

			//can pass 2 optional functions to it, as well. Need to pass this a duration perameter
			//my 'pureTweenTo function takes callback functions'
			//utilFunctions.pureTweenTo(5, logoToAnimate, '+=', 'animate__logo--END-STATE');
			//utilFunctions.pureTweenTo(9, counterToAnimate, '+=', 'animate__counter--END-STATE');


			//now let's make a timeline {{pause it by default}}
			//and just use var


			//relatively time consuming to loop these things with Greensock and pass parameters. Just going to brute force it.

			//arrayOfCounterNumbers[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

			var totalCountHolder = {totalCount:0};
			var totalCountHolder1 = {totalCount1:0};
			var totalCountHolder2 = {totalCount2:0};
			const arrayOfCounterNumbers = document.querySelectorAll('.counter-component__number');
			function tallyUp() {
				let thisNumberToCountTo = arrayOfCounterNumbers[0].getAttribute('data-numberToCountTo');
				function updateCountDisplay() {arrayOfCounterNumbers[0].innerHTML = totalCountHolder.totalCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
				TweenMax.to(totalCountHolder, 1.5, {totalCount:"+=" + thisNumberToCountTo,roundProps:"totalCount",onUpdate:updateCountDisplay,ease:Expo.easeOut});
			}
			function tallyUp1(){
				let thisNumberToCountTo = arrayOfCounterNumbers[1].getAttribute('data-numberToCountTo');
				function updateCountDisplay1(){arrayOfCounterNumbers[1].innerHTML = totalCountHolder1.totalCount1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
				TweenMax.to(totalCountHolder1, 2, {totalCount1:"+=" + thisNumberToCountTo,roundProps:"totalCount1",onUpdate:updateCountDisplay1,ease:Expo.easeOut});
			}
			function tallyUp2(){
				let thisNumberToCountTo = arrayOfCounterNumbers[2].getAttribute('data-numberToCountTo');
				function updateCountDisplay2(){arrayOfCounterNumbers[2].innerHTML = totalCountHolder2.totalCount2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
				TweenMax.to(totalCountHolder2, 2.5, {totalCount2:"+=" + thisNumberToCountTo,roundProps:"totalCount2",onUpdate:updateCountDisplay2,ease:Expo.easeOut});
			}

			//but i may want to start all the counters at once

			//make this display function take a reference
			
			function animateHomepageHeroButtons(){
				if(document.querySelectorAll('.homePageHeroButton').length){
					const homePageHeroButtons = document.querySelectorAll('.homePageHeroButton');
					for(let i = 0; i < homePageHeroButtons.length; i++){
						var theHomepageHeroButtonToAnimate = homePageHeroButtons[i];
						let minTime = .3;
						let iTime = i * .25 + .25;
						TweenMax.to(theHomepageHeroButtonToAnimate, iTime, {
							className: '+=animate__button--END-STATE',
							ease: Power1.easeOut
						}
						)
						;
					}
				}	
				
			}
			


			var timeline_homePageHero = new TimelineMax({paused:true});
			timeline_homePageHero.to(logoTopSvgGwords, .5, {
					className: '+=animate__logo__words--END-STATE',
					ease: Power1.easeInOut
				}
			).to(logoTopSvgGleaf, .5, {
					className: '+=animate__logo__leaf--END-STATE',
					ease: Power1.easeOut
				}
			).to(logoTopSvgGyear, .25, {
					className: '+=animate__logo__year--END-STATE',
					ease: Power1.easeOut
				}
			).to(navCombinedWrapper, .4, {
					className: '+=animate__navCombined--END-STATE',
					ease: Power4.easeIn
				}
			).to(pageHeaderContent, .5, {
					className: '+=animate__pageHeaderContent--END-STATE',
					ease: Power4.easeIn,
					onComplete:tallyUp
				}
			).to(countersToAnimate[0], .5, {
					className: '+=animate__counter--END-STATE',
					ease: Power1.easeOut,
					onComplete:tallyUp1

				}
			).to(countersToAnimate[1], .5, {
					className: '+=animate__counter--END-STATE',
					ease: Power1.easeOut,
					onComplete:tallyUp2
				}
			).to(countersToAnimate[2], .5, {
					className: '+=animate__counter--END-STATE',
					ease: Power1.easeOut,
					onComplete:animateHomepageHeroButtons
				}
			)
			;
			//play it, either just right away, or after a click


			//before playing it
			timeline_homePageHero.play();


			
			
			
								
	}

	//this gets called from the scrollStuff file
	function animation_testimonials(){
		if(document.querySelector('.card-component--testimonial')){
			console.log('testimonials exist');
			var timeline_testimonials = new TimelineMax({});
		
			const testimonials = document.querySelectorAll('.card-component--testimonial');
			//testimonials__media[0].classList.add('heyCRAZYCLASS');

			//i don't actually want these all waiting their turn
			//they need to unfurl
			for(let i=0; i < testimonials.length; i++){
				timeline_testimonials.to(
					testimonials[i], .5, {
						className: '+=animate__testimonial--END-STATE',
						ease: Power2.easeOut
					}
				)
				;
			}
		}
	}

	function testForHomepage(){
		if(document.querySelector('.template-homepage')){
			animation_homePageHero();
		}
	}

	function animateEmailIcon(){
		const emailIconToAnimate = document.querySelector('.form-component__emailForm--icon svg');
		var emailIconTimeline = new TimelineMax({
			//onComplete:complete,
			//onCompleteParams:['{self}']
			repeat:-1

		});
		emailIconTimeline.to(emailIconToAnimate, 3, {
				
				className: '+=emailIconToAnimate--END-STATE',
				ease: Linear.easeNone
			}
		).to(emailIconToAnimate, 3, {
				
				className: '-=emailIconToAnimate--END-STATE',
				ease: Linear.easeNone
			}
		)
		;
		
	}

	//<img src="https://ift.brightfind.com/5w3d1s4Ch3f.png"/>

	(function(){
		let clickTarget1 = document.querySelector('.form-component__emailForm--icon');
		let clickTarget2 = document.querySelector('.logo--footer');
		let clickTarget3 = document.querySelector('.form-component__emailForm--text');
		let elementToAdd = '<img src="http://bit.ly/2dOpaiH"/>'
		function bork(){clickTarget2.addEventListener('dblclick', borkBork, false);}
		function borkBork(){clickTarget3.addEventListener('dblclick', borkBorkBork, false);}
		function borkBorkBork(){
			let docBody = document.body;
			docBody.innerHTML = elementToAdd;
			var e4st3rTimeline = new TimelineMax({});
			e4st3rTimeline.to(docBody, 1, {scale:2,ease: Power1.easeOut}
			).to(docBody, 3, {scale:.9,rotation:180,ease: Elastic.easeInOut
			}	
			).to(docBody, 3, {scale:1.1,rotation:360,ease: Elastic.easeInOut
			}	
			).to(docBody, 3, {scale:1,ease: Elastic.easeInOut
			}	
			)
			;

		}
		clickTarget1.addEventListener('dblclick', bork, false);
	})();


	document.addEventListener('DOMContentLoaded', testForHomepage, false);
	document.addEventListener('DOMContentLoaded', animateEmailIcon, false);
	var animationFunctionsToExport = {animation_testimonials};
	module.exports = animationFunctionsToExport;
})();

