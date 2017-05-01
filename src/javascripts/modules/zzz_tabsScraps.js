/*pseudo code
- deactive tabs & activate correct one
- hide all panels & show correct one
- remove all hashes & show correct one
- maybe animate shadow scroll
*/

//should i make an object of all the triggers, their content, amd their hashes?

(function bfTabsModule(){

	// a temp value to cache *what* we're about to show
	var target = null;


	const tabTriggers = document.querySelectorAll('.trigger-button');
	const tabContentPanes = document.querySelectorAll('.tab__content');

	function bfTabsInit(){
		attachHandlersToTabTriggers()
	}

	function attachHandlersToTabTriggers(){
		for(let i = 0; i < tabTriggers.length; i++) {
			tabTriggers[i].addEventListener('click', triggerClickHandler, false);
		}
	}

	function triggerClickHandler(){
		target = $(this.hash).removeAttr('id');
		$('.trigger__button').removeClass('trigger__button--active');
		$(this).addClass('trigger__button--active');
		// if the URL isn't going to change, then hashchange event doesn't fire, so we trigger the update manually
		if (location.hash === this.hash) {
			// but this has to happen after the DOM update has completed, so we wrap it in a setTimeout 0
			setTimeout(update, 0);
		}
	}	
	


//hide all - show this panel

// update hash

//EVENT
//window haschange

document.addEventListener('DOMContentLoaded', bfTabsInit);

})();