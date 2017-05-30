(function iftMapFunction(){
    "use strict";
    //get reference to outermost wrapper to show/hide with modal
    var iftMapWrapperOuter = document.getElementById('iftMapWrapperOuter');
    var iftMapButtonOpen = document.getElementById('iftMapButtonOpen');
    var iftMapButtonClose = document.getElementById('iftMapButtonCloseWrapper');
    var iftMapButtonCancel = document.getElementById('iftMapButtonCancel');
    var iftMapButtonSave = document.getElementById('iftMapButtonSave');

    var seletedStateDisplay = document.getElementById('seletedStateDisplay');
    var stateSelectMenu = document.getElementById('stateSelectMenu');
    var internationalSelectMenu = document.getElementById('internationalSelectMenu');


    //DRAW THE MAP
    var svg = d3.select('#iftMap');
    var path = d3.geoPath();
    d3.json('javascripts/data/topoJSONusCustom.json', function(error, data) {
      if (error) throw error;

      svg.append('g')
        .attr('class', 'states iftMap__svg__g')
        .selectAll('path')
        .data(topojson.feature(data, data.objects.states).features)
        .enter()
        .append('path')
        .attr('id', function(thisState){
            //console.log(thisState.id);
            return thisState.id
        })
        .attr('data-stateName', function(thisState){
            //this is giving me the whole array...accessing other properties isNotWorkingAsExpected
            //console.log(thisState)
            return 'placeholderStateName'
        })
        .attr('class', 'usState iftMap__svg__path')
        .attr('d', path)
        .on('click', function(thisState){
            //this adds events the d3 way -- the program already has reference to each path, so we use it to add handler(s)
            mapHandlerFunction(event, thisState.id);
        });

        svg.append('path')
          .attr('class', 'state-borders iftMap__svg__path--stateBorders')
          .attr('d', path(topojson.mesh(data, data.objects.states, function(a, b) { return a !== b; })));
    });



    function mapHandlerFunction(event, thisStateID){

        if(event.currentTarget.tagName === 'path') {
            removeAddActiveState('thenAdd', thisStateID);
            console.log(thisStateID);
            stateSelectMenu.value = thisStateID;
            writeDataToPage(thisStateID);
        }
        if(event.currentTarget.id === 'stateSelectMenu') {
            var stateAbbrSelected = stateSelectMenu.options[stateSelectMenu.selectedIndex].value;
            removeAddActiveState('thenAdd', stateAbbrSelected);
            console.log(stateAbbrSelected);
            writeDataToPage(stateAbbrSelected);
        }
        if(event.currentTarget.id === 'internationalSelectMenu'){
            stateSelectMenu.value = '';
            var internationalAbbrSelected = internationalSelectMenu.options[internationalSelectMenu.selectedIndex].value;
            removeAddActiveState();
            writeDataToPage(internationalAbbrSelected);
        }
    }



    function removeAddActiveState(thenAdd, thisStateID){
        var selectedItem = document.querySelector('.usState--SELECTED');
        //if there is an active item, remove itS active class
        if (selectedItem !== null){
            selectedItem.classList.remove('usState--SELECTED');
        }
        if(thenAdd && thisStateID){
            document.getElementById(thisStateID).classList.add('usState--SELECTED');
        }
    }


    function makeColumnDisabled(theColumnToDisable){
        //1) add class of DISABLED-STATE to the iftMap__sectionData__wrapper
        //2) add disabled=disabled attribute to the input
        //3) add checked=checked attrubute to input
    }
    



    //these are for backend developer

    function getStateData(thisStateID) {
        //go get some data from backend
    }

    //writeTheDataForThisState, id is just an example
    function writeDataToPage(thisStateID){
        //this is just the example i used for the demo
        seletedStateDisplay.innerHTML = thisStateID
    }

    function submitPageData(sampleArgument){
        //submit page data
    }




    //this must be called each time new data is put on the page to get a fresh nodelist
    function collectTooltipsAndAttachListeners(){
        var toolTipIcons = document.querySelectorAll('.iconInfo');
        var toolTipsCloseButtons = document.querySelectorAll('.iftMap__tooltip__closeButton__wrapper');
        //add listeners
        for (var i = 0; i < toolTipIcons.length; i++) {
            toolTipIcons[i].addEventListener('click', openThisTooltip, false)
        }
        for(var j = 0; j < toolTipsCloseButtons.length; j++){
            toolTipsCloseButtons[j].addEventListener('click', closeActiveTooltip, false)
        }
    }
    collectTooltipsAndAttachListeners();


    function closeActiveTooltip(event){
        var nodeListOfHiddenTooltipContent = document.querySelectorAll('.iftMap__sectionData__footer');
        var visibleTooltip = document.querySelector('.iftMap__sectionData__footer--VISIBLE-STATE');
        if (visibleTooltip !== null) {
            visibleTooltip.classList.remove('iftMap__sectionData__footer--VISIBLE-STATE');
            visibleTooltip.classList.add('iftMap__sectionData__footer--HIDDEN-STATE');
        }
    }

    function openThisTooltip(event){
        var theContentToReveal = event.currentTarget.parentNode.querySelector('.iftMap__sectionData__footer');
        closeActiveTooltip(event);
        theContentToReveal.classList.remove('iftMap__sectionData__footer--HIDDEN-STATE');
        theContentToReveal.classList.add('iftMap__sectionData__footer--VISIBLE-STATE');

    }

    function showHideWholeMap(event){
        var activeStateSting = 'iftMapWrapperOuter--ACTIVE-STATE';
        if(event.currentTarget === iftMapButtonOpen) {
            iftMapWrapperOuter.classList.add(activeStateSting);
        }
        if(event.currentTarget === iftMapButtonClose) {
            //this closes any open tooltip
            closeActiveTooltip();
            iftMapWrapperOuter.classList.remove(activeStateSting);
        }
        if(event.currentTarget === iftMapButtonCancel){
            //this might be a link, so be sure to prevent default
            event.preventDefault();

            closeActiveTooltip();
            iftMapWrapperOuter.classList.remove(activeStateSting);
        }
    }


    //EVENTS
    stateSelectMenu.addEventListener('change', mapHandlerFunction, false);
    internationalSelectMenu.addEventListener('change', mapHandlerFunction, false);
    iftMapButtonOpen.addEventListener('click', showHideWholeMap, false);
    iftMapButtonClose.addEventListener('click', showHideWholeMap, false);
    iftMapButtonCancel.addEventListener('click', showHideWholeMap, false);
    iftMapButtonSave.addEventListener('click', savePageData, false)
})();