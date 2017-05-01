(function accordionModule() {

    function initAccordions() {if (document.querySelectorAll('.sublayout__accordion').length) {accordionFunctionMain();}}

    function accordionFunctionMain() {
        const openAllTarget = document.getElementById('accordionOpenAllSpan');
        const closeAllTarget = document.getElementById('accordionCloseAllSpan');
        const openAllTargetTabs = document.getElementById('accordionTabsOpenAllSpan');
        const closeAllTargetTabs = document.getElementById('accordionTabsCloseAllSpan');
        const nodeListOfAccordionItems = document.querySelectorAll('.accordion__item');
        const nodeListOfAccordionTitles = document.querySelectorAll('.accordion__itemTitleWrap');
        const nodeListOfAccordionContent = document.querySelectorAll('.accordion__itemContent');
        const scheduleFilter = document.getElementById('scheduleFilter');
        const accordionTitleActiveClassString = 'accordion__title--ACTIVE';

        //there is another reference to this collection in bfTabs
        const nodeListOfTabItems = document.querySelectorAll('.tab__item');

        //add listeners to nodeListOfAccordionTitles
        for (let i = 0; i < nodeListOfAccordionTitles.length; i++) {nodeListOfAccordionTitles[i].addEventListener('click', openOrCloseThisAccordion, false);}

        function openOrCloseAllAccordionsInTabs(event){
            let nodeListOfSelectedAccordionTitles = document.querySelectorAll('.tab__item.selected .accordion__itemTitleWrap');
            let nodeListOfSelectedAccordionContent = document.querySelectorAll('.tab__item.selected .accordion__itemContent');
            if(event.currentTarget === closeAllTargetTabs){
                let nodeListOfSelectedAccordionItems = document.querySelectorAll('.tab__item.selected .accordion__item');
                for (let i = 0; i < nodeListOfSelectedAccordionItems.length; i++) {
                    let thisAccordionContent = nodeListOfSelectedAccordionContent[i];
                    nodeListOfSelectedAccordionTitles[i].classList.remove(accordionTitleActiveClassString);
                    TweenMax.to(thisAccordionContent, .25, {
                        className: '-=itemContentIsOpen',
                        ease: Power1.easeOut
                    });
                }
            }
            else if ((event.currentTarget === openAllTargetTabs)){
                for (let i = 0; i < nodeListOfSelectedAccordionContent.length; i++) {
                    let thisAccordionContent = nodeListOfSelectedAccordionContent[i];
                    nodeListOfSelectedAccordionTitles[i].classList.add(accordionTitleActiveClassString);
                    TweenMax.to(thisAccordionContent, .25, {
                        className: '+=itemContentIsOpen',
                        ease: Back.easeOut
                    });
                }
            }
        }

        function openOrCloseAllAccordions(event){
            if(event.currentTarget === openAllTarget){
                for (let i = 0; i < nodeListOfAccordionContent.length; i++) {
                    let thisAccordionContent = nodeListOfAccordionContent[i];
                    nodeListOfAccordionTitles[i].classList.add(accordionTitleActiveClassString);
                    TweenMax.to(thisAccordionContent, .25, {
                        className: '+=itemContentIsOpen',
                        ease: Back.easeOut
                    });
                }
            }
            else if(event.currentTarget === closeAllTarget){
                for (let i = 0; i < nodeListOfAccordionContent.length; i++) {
                let thisAccordionContent = nodeListOfAccordionContent[i];
                    nodeListOfAccordionTitles[i].classList.remove(accordionTitleActiveClassString);
                    TweenMax.to(thisAccordionContent, .25, {
                        className: '-=itemContentIsOpen',
                        ease: Power1.easeOut
                    });
                }
            }
        }

        function openOrCloseThisAccordion(event) {
            var theTitleClicked = event.currentTarget;
            var theContentOfTheItemClicked = theTitleClicked.parentNode.querySelector('.accordion__itemContent');
            if (theContentOfTheItemClicked.classList.contains('itemContentIsOpen')) {
                theTitleClicked.classList.remove(accordionTitleActiveClassString);
                TweenMax.to(theContentOfTheItemClicked, .25, {
                    className: '-=itemContentIsOpen',
                    ease: Power1.easeOut
                });
            }
            else {
                theTitleClicked.classList.add(accordionTitleActiveClassString);
                TweenMax.to(theContentOfTheItemClicked, .25, {
                    className: '+=itemContentIsOpen',
                    ease: Back.easeOut
                });
            }
        }

        function filterAwayAll(){
            for (let i = 0; i < nodeListOfAccordionItems.length; i++){
                nodeListOfAccordionItems[i].classList.add('filteredOut');
            }
        }

        function filterInType(typeToFilterIn) {
            var whatToFilterIn;

            if(typeToFilterIn === 'all'){
                whatToFilterIn = nodeListOfAccordionItems;
            }
            else {
                //the asterisk in the selector allows for multiple types
                var nodeListOfItemsByType = document.querySelectorAll('.accordion__item[data-filter*="' + typeToFilterIn + '"] ');
                whatToFilterIn = nodeListOfItemsByType;
            }

            TweenMax.to(whatToFilterIn, .6666, {
                className: "-=filteredOut",
                ease: Power1.easeInOut,
                onComplete: function(){
                    countWhatYouGot();
                }
            }
            );
            //this timing was tricky -- if ya got nothin' saySo
            function countWhatYouGot(){
                if(nodeListOfTabItems !== null){
                    for(let i = 0; i < nodeListOfTabItems.length; i++){
                        let thisTabItem = nodeListOfTabItems[i];
                        let theListItemsInthisTabItem =  thisTabItem.querySelectorAll('.accordion__item:not(.filteredOut)');

                        if(theListItemsInthisTabItem.length < 1){
                            noResultsFunction(thisTabItem);
                        }
                        //console.log(theListItemsInthisTabItem.length);
                    }
                }
            }
        }

        function noResultsFunction(thisTabItem){
             thisTabItem.classList.add('iAmEmptyOfVisibleItems');
             //console.log('iAmEmptyOfVisibleItems');
             appendOrRemoveNoresultsDiv('append', thisTabItem);
        }

        function appendOrRemoveNoresultsDiv(appendOrRemove, thisTabItem){
            if(appendOrRemove === 'append'){
                var newNoResultsNode = document.createElement('div');
                newNoResultsNode.classList.add('noResultsDiv');
                var errorMessage = '<em><strong>No events on this day match the selected type. Please filter by another event type.</strong></em>';
                newNoResultsNode.innerHTML = errorMessage;
                thisTabItem.appendChild(newNoResultsNode);
            }
            else if(appendOrRemove === 'remove'){
                var nodeListOfNoResultsDivs = document.querySelectorAll('.noResultsDiv');
                if (nodeListOfNoResultsDivs !== null){
                    for(let i = 0; i < nodeListOfNoResultsDivs.length; i++){
                        nodeListOfNoResultsDivs[i].remove();
                    }  
                }
            }
        }

        function scheduleFilterHandler() {
            var typeToFilterIn = scheduleFilter.options[scheduleFilter.selectedIndex].value;
            //always start by clearing all
            //and also remove all noResults messages;
            appendOrRemoveNoresultsDiv('remove');
            filterAwayAll();
            filterInType(typeToFilterIn);
        }

        //listeners should only be attached if element exists -- should loop through
        if (openAllTarget !== null) {openAllTarget.addEventListener('click', openOrCloseAllAccordions, false);}
        if (closeAllTarget !== null) {closeAllTarget.addEventListener('click', openOrCloseAllAccordions, false);}
        if (openAllTargetTabs !== null) {openAllTargetTabs.addEventListener('click', openOrCloseAllAccordionsInTabs, false);}
        if (closeAllTargetTabs !== null) {closeAllTargetTabs.addEventListener('click', openOrCloseAllAccordionsInTabs, false);}
        if(scheduleFilter !==null){scheduleFilter.addEventListener('change', scheduleFilterHandler, false);}
    } //end accordion function main

    document.addEventListener('DOMContentLoaded', initAccordions, false);

})();