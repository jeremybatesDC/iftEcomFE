(function iftMapFunction(){
    "use strict";

    var svg = d3.select("#iftMap");
    var path = d3.geoPath();

    var seletedStateDisplay = document.getElementById('seletedStateDisplay');
    var stateSelectMenu = document.getElementById('stateSelectMenu');
    var internationalSelectMenu = document.getElementById('internationalSelectMenu');

    var theHiddenTooltipContent = document.querySelectorAll('.iftMap__sectionData__footer');
    var theToolTips = document.querySelectorAll('.iconInfo');

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

    function iftMapTooltips(){
        console.log('tooltip');
        theHiddenTooltipContent[1].classList.remove('iftMap__sectionData__footer--HIDDEN-STATE');

    }








    //these are for backend developer

    function getStateData(thisStateID) {
        //go get some data from backend
    }
    function writeDataToPage(thisStateID){
        seletedStateDisplay.innerHTML = thisStateID
    }

    //end for backend developer












    //EVENTS

    //demoOnlyToolTip
    theToolTips[1].addEventListener('click', iftMapTooltips)
    stateSelectMenu.addEventListener('change', mapHandlerFunction);
    internationalSelectMenu.addEventListener('change', mapHandlerFunctionInternational);
})();