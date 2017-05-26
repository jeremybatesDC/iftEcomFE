var theHiddenTooltipContent = document.querySelectorAll('.iftMap__sectionData__footer');
var theToolTips = document.querySelectorAll('.iconInfo');

function iftMapTooltips(){
        //add tooltip close listeners
        var theToolTipsContentCloseButtons = document.querySelectorAll('.iftMap__tooltip__closeButton__wrapper');
        for(var i = 0; i < theToolTipsContentCloseButtons.length; i++){
            theToolTipsContentCloseButtons[i].addEventListener('click', closeAllTooltips , false)
        }

        console.log('tooltip');
        //show/hide

        closeAllTooltips(thenOpenOne);

        theHiddenTooltipContent[1].classList.remove('iftMap__sectionData__footer--HIDDEN-STATE');
        theHiddenTooltipContent[1].classList.add('iftMap__sectionData__footer--VISIBLE-STATE');

    }


    //if tooltips arenT on the page yet because of ajax, they wonT be able to get a listener, no?

    function closeAllTooltips(thenOpenOne){
        var visibleTooltip = document.querySelector('.iftMap__sectionData__footer--VISIBLE-STATE');
        if (visibleTooltip !== null) {
            visibleTooltip.classList.remove('iftMap__sectionData__footer--VISIBLE-STATE');
            visibleTooltip.classList.add('iftMap__sectionData__footer--HIDDEN-STATE');
            if(thenOpenOne){
                theHiddenTooltipContent[1].classList.remove('iftMap__sectionData__footer--HIDDEN-STATE');
                theHiddenTooltipContent[1].classList.add('iftMap__sectionData__footer--VISIBLE-STATE');
            }
        }

    }
 //demoOnlyToolTip
    theToolTips[1].addEventListener('click', iftMapTooltips)