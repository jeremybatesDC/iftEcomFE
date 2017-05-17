import utilFunctions from 'lib/utilFunctions-revised.js';


//var timeline_navArrows = new TimelineMax({paused:true});

const navTrigger = document.getElementById('navTrigger');
const navMain = document.getElementById('navMain');
function mobileNavHideReveal(){
	document.body.classList.toggle('has-nav--ACTIVE');
	utilFunctions.toggleTween(.1, navMain, 'main-nav-on-canvas');
}


navTrigger.addEventListener('click', mobileNavHideReveal, false);