(function iftMapFunction(){
    "use strict";
    //get reference to outermost wrapper to show/hide with modal
    var iftMapWrapperOuter = document.getElementById('iftMapWrapperOuter');
    var iftMapButtonOpen = document.getElementById('iftMapButtonOpen');
    var iftMapButtonClose = document.getElementById('iftMapButtonCloseWrapper');
    var iftMapButtonCancel = document.getElementById('iftMapButtonCancel');

    var svg = d3.select("#iftMap");
    var path = d3.geoPath();

    var seletedStateDisplay = document.getElementById('seletedStateDisplay');
    var stateSelectMenu = document.getElementById('stateSelectMenu');
    var internationalSelectMenu = document.getElementById('internationalSelectMenu');
    
    //DRAW THE MAP
    d3.json("javascripts/data/topoJSONusCustom.json", function(error, data) {
      if (error) throw error;

      svg.append("g")
        .attr("class", "states iftMap__svg__g")
        .selectAll("path")
        .data(topojson.feature(data, data.objects.states).features)
        .enter()
        .append("path")
        .attr('id', function(thisState){
            //accessing other properties isNotWorkingAsExpected
            console.log(thisState.id)
            return thisState.id

        })
        .attr('data-stateName', function(thisState){
            return 'placeholderStateName'
            console.log(thisState)
            //return data.objects.states.geometries[z].stateName
            //only works on arrays
        })
        .attr("class", "usState iftMap__svg__path")
        .attr("d", path)
        .on("click", function(thisState){

            //this adds events the d3 way -- the program already has reference to each path, so we use it to add handler(s)
            mapHandlerFunction(event, thisState.id);
        });

        svg.append("path")
          .attr("class", "state-borders iftMap__svg__path--stateBorders")
          .attr("d", path(topojson.mesh(data, data.objects.states, function(a, b) { return a !== b; })));
    });

    function mapHandlerFunction(event, thisStateID){
            
        //display data here
        //also make sure there's hover titles [damn]

        if(event.type === "click") {
            removeAddActiveState('thenAdd', thisStateID);
            console.log(thisStateID);
            stateSelectMenu.value = thisStateID;
            writeDataToPage(thisStateID);
        }
        
        if(event.type === "change") {
            var stateAbbrSelected = stateSelectMenu.options[stateSelectMenu.selectedIndex].value;
            removeAddActiveState('thenAdd', stateAbbrSelected);
            console.log(stateAbbrSelected);
            writeDataToPage(stateAbbrSelected);
        }

    }

    function mapHandlerFunctionInternational(event, thisInternationalID){
        stateSelectMenu.value = '';
        var internationalAbbrSelected = internationalSelectMenu.options[internationalSelectMenu.selectedIndex].value;
        removeAddActiveState();
        writeDataToPage(internationalAbbrSelected);
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

    





//just toggle class, yah?




    //these are for backend developer

    function getStateData(thisStateID) {
        //go get some data from backend
    }
    function writeDataToPage(thisStateID){
        seletedStateDisplay.innerHTML = thisStateID
    }

    //end for backend developer


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

        //could split this by target since cannot pass arguments
        //if(event.currentTarget.classList.contains('iconInfo')){}
        

    }


    function openThisTooltip(event){
        var theContentToReveal = event.currentTarget.parentNode.querySelector('.iftMap__sectionData__footer');
        
        closeActiveTooltip(event);
        
        theContentToReveal.classList.remove('iftMap__sectionData__footer--HIDDEN-STATE');
        theContentToReveal.classList.add('iftMap__sectionData__footer--VISIBLE-STATE');

    }

    function showHideWholeMap(event){
        if(event.currentTarget === iftMapButtonOpen) {
            iftMapWrapperOuter.classList.add('iftMapWrapperOuter--ACTIVE-STATE');
        }
        if(event.currentTarget === iftMapButtonClose) {
            //this should also close any open tooltip
            closeActiveTooltip();
            iftMapWrapperOuter.classList.remove('iftMapWrapperOuter--ACTIVE-STATE');
        }
        if(event.currentTarget === iftMapButtonCancel){
            //this might be a link
            event.preventDefault();
            closeActiveTooltip();
            iftMapWrapperOuter.classList.remove('iftMapWrapperOuter--ACTIVE-STATE');
        }
    }


    //EVENTS

   
    stateSelectMenu.addEventListener('change', mapHandlerFunction);
    internationalSelectMenu.addEventListener('change', mapHandlerFunctionInternational);
    iftMapButtonOpen.addEventListener('click', showHideWholeMap, false);
    iftMapButtonClose.addEventListener('click', showHideWholeMap, false);
    iftMapButtonCancel.addEventListener('click', showHideWholeMap, false);

})();