(function bfTabsModule(){
	if (document.querySelectorAll('.bf_tabs').length) {
		const bfTabsList = document.querySelector('.bf_tabs__list');
		const tabClickTargets = document.querySelectorAll('.tab__clickTarget');
		const tabItems = document.querySelectorAll('.tab__item');

		var arrayOfDays = [];

		function initTabs(event){
			addEventListeners();
			createArrayOfDays();

			//this handler needs to run on load
			hashChangeHandler(event);
		}

		function createArrayOfDays(){
			for(let i = 0; i < tabClickTargets.length; i++){
				arrayOfDays.push(tabClickTargets[i].getAttribute('data-tabset'));
			}
		}
		

		function addEventListeners(){
			for(let i=0; i < tabClickTargets.length; i++){
				tabClickTargets[i].addEventListener('click', tabClickTargetHandler, false);
			}
		}


		function pushThisHash(stringToPushToHash){
			window.location.hash = stringToPushToHash;
		}


		//when URL is changed
		function takeHashFromURL(event){
			var thisHash = window.location.hash.toString();
			var thisHashNoHashSign = thisHash.replace('#', '');

			//if there's a match, show 
			if(arrayOfDays.indexOf(thisHashNoHashSign) > -1){
				showThisTab(event, thisHashNoHashSign);
			}

			//or, if there's no hash at all...
			else {
				var day1 = arrayOfDays[0];
				showThisTab(event, day1);
			}
		}

		function hideAllTabs(){
			//forEach loops would look cleaner
			for(let i=0; i < tabClickTargets.length; i++){
				tabClickTargets[i].classList.remove('selected');
			}
			for(let i=0; i < tabItems.length; i++){
				tabItems[i].classList.remove('selected');
			}
		}

		function showThisTab(event, dayInQuestion){
			for(let i=0; i < tabItems.length; i++){
				var thisTabItemDay = tabItems[i].getAttribute('data-tabset');
				if(thisTabItemDay === dayInQuestion) {
					tabClickTargets[i].classList.add('selected');
					tabItems[i].classList.add('selected');
				}
			}
			if(event.type === 'load'){
				scrollTabsHorz(dayInQuestion);
			}
			
		}

		//on mobile, if the day is 4, 5 or 6, the list needs to scroll on load
		function scrollTabsHorz(dayInQuestion){
			let theIndexOftheDayInQuestion = arrayOfDays.indexOf(dayInQuestion);
			if(theIndexOftheDayInQuestion >= 3){
				//console.log('Scroll to the Right!');
				
				//TweenMax.to(bfTabsList, 2, {scrollTo:{y:1000}});
				bfTabsList.scrollLeft = 1000;
			}
		}

		function tabClickTargetHandler(event){
			let dayInQuestion = event.currentTarget.getAttribute('data-tabset');
			hideAllTabs();
			showThisTab(event, dayInQuestion);
			pushThisHash(dayInQuestion);

		}

		function hashChangeHandler(event){
			//console.log(event.type);
			hideAllTabs();
			takeHashFromURL(event);
		}



		// Event Listeners
		window.addEventListener('load', initTabs);
		window.addEventListener('hashchange', hashChangeHandler);

	}
})();