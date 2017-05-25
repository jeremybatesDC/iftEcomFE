(function iftMapFunction(){
    "use strict";

    var svg = d3.select("#iftMap");
    var path = d3.geoPath();

    var seletedStateDisplay = document.getElementById('seletedStateDisplay');
    var stateSelectMenu = document.getElementById('stateSelectMenu');

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
            return thisState.id
        })
        .attr('data-stateName', function(z){
            //return data.objects.states[z].stateName
            return 'placeholderStateName'
        })
        .attr("class", "usState iftMap__svg__path")
        .attr("d", path)
        .on("click", function(thisState){

            mapHandlerFunction(event, thisState.id);


        });

        svg.append("path")
          .attr("class", "state-borders iftMap__svg__path--stateBorders")
          .attr("d", path(topojson.mesh(data, data.objects.states, function(a, b) { return a !== b; })));
    });


    function removeAddActiveState(thenAdd, thisStateID){
        var selectedItem = document.querySelector('.usState--SELECTED');
        //if there is an active item, remove itS active class
        if (selectedItem !== null){
            selectedItem.classList.remove('usState--SELECTED');
            //optional
        }
        if(thenAdd && thisStateID){
            document.getElementById(thisStateID).classList.add('usState--SELECTED');
        }
        //else if ()
        
        

    }

    function mapHandlerFunction(event, thisStateID){
            
        //display data here
        //also make sure there's hover
        //also make sure there are tooltips

        if(event.type === "click") {
            removeAddActiveState('thenAdd', thisStateID);
            console.log(thisStateID);
            stateSelectMenu.value = thisStateID;
        }
        
        if(event.type === "change") {
            var stateAbbrSelected = stateSelectMenu.options[stateSelectMenu.selectedIndex].value;

            removeAddActiveState('thenAdd', stateAbbrSelected);
            console.log(stateAbbrSelected);
        }
    }

    stateSelectMenu.addEventListener('change', mapHandlerFunction);

})();