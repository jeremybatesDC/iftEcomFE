var toolTipIcons = document.querySelectorAll('.iconInfo');
var theHiddenTooltipContent = document.querySelectorAll('.iftMap__sectionData__footer');
var toolTipsCloseButtons = document.querySelectorAll('.iftMap__tooltip__closeButton__wrapper');


//add listeners

for(var i = 0; i < toolTipsCloseButtons.length; i++){
    toolTipsCloseButtons[i].addEventListener('click', closeAllTooltips , false)
}
for (var j = 0; i < toolTipIcons.length; i++) {
	toolTipIcons[j].addEventListener('click', closeAllTooltips(thenOpenMe), false)
}




function iftMapTooltips(){
        

        console.log('tooltip');
        //show/hide

        closeAllTooltips(thenOpenOne);

        theHiddenTooltipContent[1].classList.remove('iftMap__sectionData__footer--HIDDEN-STATE');
        theHiddenTooltipContent[1].classList.add('iftMap__sectionData__footer--VISIBLE-STATE');

    }


    //if tooltips arenT on the page yet because of ajax, they wonT be able to get a listener, no?

    function closeAllTooltips(thenOpenMe){
    	if(thenOpenMe){
    		console.log('open me');
    	}
        // var visibleTooltip = document.querySelector('.iftMap__sectionData__footer--VISIBLE-STATE');
        // if (visibleTooltip !== null) {
        //     visibleTooltip.classList.remove('iftMap__sectionData__footer--VISIBLE-STATE');
        //     visibleTooltip.classList.add('iftMap__sectionData__footer--HIDDEN-STATE');
        //     if(thenOpenOne){
        //         theHiddenTooltipContent[1].classList.remove('iftMap__sectionData__footer--HIDDEN-STATE');
        //         theHiddenTooltipContent[1].classList.add('iftMap__sectionData__footer--VISIBLE-STATE');
        //     }
        // }

    }
