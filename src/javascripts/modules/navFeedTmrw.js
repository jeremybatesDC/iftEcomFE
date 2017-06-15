(function navFeedTmrwModule(){

	const navFeedTmrw__menuToggle__button = document.getElementById('navFeedTmrwMenuToggleButton');
	const navFeedTmrwList = document.getElementById('navFeedTmrwList');


	if(navFeedTmrw__menuToggle__button !== null){
		navFeedTmrw__menuToggle__button.addEventListener('click', toggleNavMenu, false);
	}

	function toggleNavMenu(event){
		if(navFeedTmrwList !== null){
			navFeedTmrwList.classList.toggle('navFeedTmrw__list--ACTIVE');
		}
	}

})();