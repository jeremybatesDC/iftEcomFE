import utilFunctions from 'lib/utilFunctions-revised.js';

(function searchModule(){
	if(document.querySelectorAll('.searchRowWithItAll').length){
		const filterToggleWrapper = document.querySelector('.filterToggle__wrapper');
		const filterToggleButton = document.getElementById('filterToggleButton');
		const columnSearchFilters = document.querySelector('.column-searchFilters');
		const arrayOfSearchFacetsFieldsetHeaders = document.querySelectorAll('.searchFacets__fieldsetHeader');


		function iterateThrougharrayOfSearchFacetsFieldsetHeaders(){
			for(let i = 0; i < arrayOfSearchFacetsFieldsetHeaders.length; i++) {
				arrayOfSearchFacetsFieldsetHeaders[i].addEventListener('click', expandCollapseMobileFilterFiedlsets, false);
			}
		}

		function expandCollapseMobileFilterFiedlsets(event){
			var theHeaderClicked = event.currentTarget;
			var theFieldsetToExpandOrCollapse = theHeaderClicked.nextElementSibling;
			if (theFieldsetToExpandOrCollapse.classList.contains('animate__searchFiltersMobileFieldset--END-STATE')){
				TweenMax.to(theFieldsetToExpandOrCollapse, .2, {
					className:'-=animate__searchFiltersMobileFieldset--END-STATE',
					ease:Power1.easeInOut
				}
				)
				;
				theHeaderClicked.classList.remove('facetHeaderActive');	


			}
			else {
				TweenMax.to(theFieldsetToExpandOrCollapse, .2, {
					className:'+=animate__searchFiltersMobileFieldset--END-STATE',
					ease:Power1.easeInOut
				}
				)
				;
				theHeaderClicked.classList.add('facetHeaderActive');	
			}
			

		}

		function searchFilterTriggerHandler(){
			//console.log('clicked');
			// TweenMax.to(columnSearchFilters, .5, {
			// 	left: 0,
			// 	ease:Power4.easeOut
			// });

			if(columnSearchFilters.classList.contains('animate__searchFiltersMobile--END-STATE')){
				TweenMax.to(filterToggleWrapper, .2, {
					className: '-=animate__toggle__wrapper--END-STATE',
					ease:Power1.easeInOut
				}
				);
				TweenMax.to(filterToggleButton, .2, {
					className: '-=animate__toggle__button--END-STATE',
					ease:Power1.easeInOut
				}
				);

				

				TweenMax.to(columnSearchFilters, .2, {
					className: '-=animate__searchFiltersMobile--END-STATE',
					ease:Power1.easeInOut
				});
				
				
			}
			else {
				TweenMax.to(columnSearchFilters, .2, {
					className: '+=animate__searchFiltersMobile--END-STATE',
					ease:Power1.easeInOut
				});
				TweenMax.to(filterToggleWrapper, .2, {
					className: '+=animate__toggle__wrapper--END-STATE',
					ease:Power1.easeInOut
				}
				);
				TweenMax.to(filterToggleButton, .2, {
					className: '+=animate__toggle__button--END-STATE',
					ease:Power1.easeInOut
				}
				);
				
				
			}
			//utilFunctions.toggleTween(1, columnSearchFilters, 'animate__searchFiltersMobile--END-STATE');
			
		}
		document.addEventListener('DOMContentLoaded', iterateThrougharrayOfSearchFacetsFieldsetHeaders);
		if(filterToggleButton !== null){
			filterToggleButton.addEventListener('click', searchFilterTriggerHandler, false);
		}
		
	}

})();

//my util toggle helper function doesnt yet take easeing
//function toggleTween(tweenSpeed, thingToTween, classNameString, optionalFunction1, optionalFunction2){