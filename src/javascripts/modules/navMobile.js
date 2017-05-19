(function navMobile(){
	const docBody = document.body;
	const navTrigger = document.getElementById('navTrigger');
	const navMain = document.getElementById('navMain');
	const navMainActiveString = 'main-nav-on-canvas--STATE';
	const navTriggerActiveString = 'navTrigger--ACTIVE';
	const activeMobileNavClassString = 'has-nav--ACTIVE';

	const mobileNavTimeline = new TimelineMax({paused:true});
	mobileNavTimeline.to(navTrigger, .1, {
			className: `+=${navTriggerActiveString}`,
			ease: Power1.easeInOut
		}
	)
	.to(docBody, .1, {
			className: `+=${activeMobileNavClassString}`,
			ease: Power1.easeInOut
		}
	).to(navMain, .1, {
			className: `+=${navMainActiveString}`,
			ease: Power1.easeInOut
		}
	)
	;

	function mobileNavHideReveal(event){

		if(navMain.classList.contains(navMainActiveString)){
			mobileNavTimeline.reverse();
		}
		else {
			mobileNavTimeline.play();
		}
	}

	navTrigger.addEventListener('click', mobileNavHideReveal, false);
})();