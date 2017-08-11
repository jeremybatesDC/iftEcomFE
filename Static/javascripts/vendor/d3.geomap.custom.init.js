//must stick to ES5
;(function iftMapFunction(){
    "use strict";

    //for in loop
    function UTILITY_clearThisObject(objectToEnumerate){
        for(var thisPropName in objectToEnumerate) {
            objectToEnumerate[thisPropName] = '';
        }
    }

    //moving singular values here allows key/value pairs of mapStatusContainer to all be of the same shape (max 8);
    var singularViewOnlyStatusContainer = {
        currentStateCode: ''
        ,currentStateName: ''
    }

    var userAlreadySavedSections = {
        userHomeSectionProductID: null
        ,additionalAlreadySavedSections: []
    }

    function MapStatusContainerDeepARRAY_CONSTRUCTOR(currentProductId, currentProductName, currentComponentProductId, currentComponentProductShortName, currentMemberPrice, currentPostalCodeRange, currentComponentParentProduct){
        this.currentProductId = currentProductId;
        this.currentProductName = currentProductName;
        this.currentComponentProductId = currentComponentProductId;
        this.currentComponentProductShortName = currentComponentProductShortName;
        this.currentMemberPrice = currentMemberPrice;
        this.currentPostalCodeRange = currentPostalCodeRange;
        this.currentComponentParentProduct = currentComponentParentProduct;
    }
    //MAX 8
    var mapStatusContainerDeepARRAY = [];
    function constructFreshMapStatusContainerModel(){
        for(var i = 0; i < 8; i++){
            var thisConstructedThing = new MapStatusContainerDeepARRAY_CONSTRUCTOR(null, null, null, null, null, null);
            mapStatusContainerDeepARRAY.push(thisConstructedThing);
        }
    }
    //doesNotNeedToBeGlobal,but itS more readable if the clear function is visually next to the model
    function safeManualResetOfmapStatusContainerDeepARRAY(){
        mapStatusContainerDeepARRAY = [];
        constructFreshMapStatusContainerModel();
    }

    //hidden or not handled by iterator elsewhere -- but could create a model for it
    // function PanelDisplayStatusARRAY_CONSTRUCTOR(hiddenOrNot, disabledOrNot, isComponentOrNot){}

    function OutputStatusContainerDeepARRAY_CONSTRUCTOR(ProductId, ProductName, ComponentProductId, ComponentProductShortName, MemberPrice){
        this.ProductId = ProductId;
        this.ProductName = ProductName;
        this.ComponentProductId = ComponentProductId;
        this.ComponentProductShortName = ComponentProductShortName;
        this.MemberPrice = MemberPrice;
    }
    //max 8
    var deepOutputObjectForStaging = [];
    function constructFreshStagingContainerModel(){
        for(var i = 0; i < 8; i++){
            var thisConstructedThing = new OutputStatusContainerDeepARRAY_CONSTRUCTOR(null, null, null, null, null);
            deepOutputObjectForStaging.push(thisConstructedThing);
        }
    }
    //doesNotNeedToBeGlobal,but itS more readable if the clear function is visually next to the model
    function safeManualResetOfOutputStatusContainerDeepARRAY(){
        deepOutputObjectForStaging = [];
        constructFreshStagingContainerModel();
    }

    //the staging container is a bit different because itS order matters and must be preserved
    function setUserPreselections(){
         //sets property userAlreadySavedSections.userHomeSectionProductID
         //reference to span to check for home section
        var hiddenInputToCheckForHomeSections = document.getElementById('IFTHomeSectionProductId');
        var nodeListOfOptionalSectionsInputs = document.querySelectorAll('input[id^="ctl00_MainContent_ctl00_MembershipJoinSection_SectionRepeater"]');

        if(hiddenInputToCheckForHomeSections !== null && hiddenInputToCheckForHomeSections.value !== null){
                userAlreadySavedSections.userHomeSectionProductID = parseInt(hiddenInputToCheckForHomeSections.value);     
        }
        
        if(nodeListOfOptionalSectionsInputs !== null){
            for(var i = 0; i < nodeListOfOptionalSectionsInputs.length; i++){
                userAlreadySavedSections.additionalAlreadySavedSections.push(parseInt(nodeListOfOptionalSectionsInputs[i].value));
            }
        }
    }

    //these keys can be used later to filter mapStatusContainer at queryTime
    var fieldsRequiredByPanelView = {
        currentProductName: ''
        ,currentMemberPrice: ''
        ,currentComponentProductShortName: ''
        ,currentPostalCodeRange: ''
    }

    // var fieldsRequiredByBackend = {
    //     currentProductId: ''
    //     ,currentProductName: ''
    //     ,currentComponentProductId: ''
    //     ,currentComponentProductShortName: ''
    //     ,currentMemberPrice: ''
    // }

    function iftMapFunctionInit(){

        //construct models
        constructFreshMapStatusContainerModel();
        constructFreshStagingContainerModel();

        setUserPreselections();

        //donT put text value here because it might be null and i donT want any logic in this variable declaration area.

        //get reference to outermost wrapper to show/hide with modal
        var iftMapWrapperOuter = document.getElementById('iftMapWrapperOuter');
        var iftMapButtonOpen = document.getElementById('iftMapButtonOpen');
        var iftMapButtonClose = document.getElementById('iftMapButtonCloseWrapper');
        var iftMapButtonCancel = document.getElementById('iftMapButtonCancel');
        var seletedStateDisplay = document.getElementById('seletedStateDisplay');
        var stateSelectMenu = document.getElementById('stateSelectMenu');
        var internationalSelectMenu = document.getElementById('internationalSelectMenu');
        var arrayOfSpansToPopulateEmpty = Array.prototype.slice.call(document.querySelectorAll('.iftMap__sectionData__wrapper span'));
        var hiddenInputForBackend = document.getElementById('IFTSavedSectionHiddenfield');
        
        var activeStateString = 'iftMapWrapperOuter--ACTIVE-STATE';
        var disabledStateString = 'iftMap__sectionData__wrapper--DISABLED-STATE';
        var hiddenStateString = 'iftMap__sectionData__wrapper--HIDDEN-STATE';

        //already have a reference, but itS more general for etch-a-sketch reasons

        var nodeListOfPanelsToPopulate = document.querySelectorAll('.iftMap__sectionData__wrapper');
        var arrayOfPanelsToPopulate = Array.prototype.slice.call(nodeListOfPanelsToPopulate);
        var arrayOfArrayOfFieldsToPopulate = [];
        var nodeListOfCheckboxes = document.querySelectorAll('.iftMap__sectionData__wrapper [type="checkbox"]');
        var arrayOfCheckboxes = Array.prototype.slice.call(nodeListOfCheckboxes);

        //IMPORTANT. CREATING SET OF EMPTY SPANS FOR EACH PANEL
        arrayOfPanelsToPopulate.map(function(thisPanel){
            var arrayOfSpans = Array.prototype.slice.call(thisPanel.querySelectorAll('span'));
            arrayOfArrayOfFieldsToPopulate.push(arrayOfSpans);
        });

        //DRAW THE MAP
        var svg = d3.select('#iftMap');
        var path = d3.geoPath();
        //d3.json('javascripts/data/topoJSONusCustom.json', function(error, data) {
        d3.json('../Scripts/data/topoJSONusCustom.json', function(error, data) {
          if (error) throw error;
          svg.append('g')
            .attr('class', 'states iftMap__svg__g')
            .selectAll('path')
            .data(topojson.feature(data, data.objects.states).features)
            .enter()
            .append('path')
            .attr('id', function(thisState){
                return thisState.id
            })
            .attr('class', 'usState iftMap__svg__path')
            .attr('d', path)
            .on('click', function(thisState){
                mapHandlerFunction('click', thisState, 'isFromMap');
            });
            svg.append('path')
              .attr('class', 'state-borders iftMap__svg__path--stateBorders')
              .attr('d', path(topojson.mesh(data, data.objects.states, function(a, b) { return a !== b; })));
        });
        //END DRAW MAP

        function mapHandlerFunction(event, statefromD3, isFromMap){            
            //if a state on the map has been clicked
            if(isFromMap) {                
                singularViewOnlyStatusContainer.currentStateCode = statefromD3.id;
                singularViewOnlyStatusContainer.currentStateName = statefromD3.properties.stateName;
                removeAddActiveState('thenAdd');
                stateSelectMenu.value = singularViewOnlyStatusContainer.currentStateCode;
            }
            //if a dropdown item has been selected (select menu visible only on mobile)
            else if(event.currentTarget.id === 'stateSelectMenu') {
                singularViewOnlyStatusContainer.currentStateCode = stateSelectMenu.options[stateSelectMenu.selectedIndex].value;
                singularViewOnlyStatusContainer.currentStateName = stateSelectMenu.options[stateSelectMenu.selectedIndex].text;
                removeAddActiveState('thenAdd');
            }
            //if an international item has been selected
            else if(event.currentTarget.id === 'internationalSelectMenu'){
                singularViewOnlyStatusContainer.currentStateCode = internationalSelectMenu.options[internationalSelectMenu.selectedIndex].value;
                singularViewOnlyStatusContainer.currentStateName = internationalSelectMenu.options[internationalSelectMenu.selectedIndex].text;

                //clear dropdown list since not usState
                stateSelectMenu.value = '';
                removeAddActiveState();
                clearCheckBoxes();
            }

            //OK, now display!
            writeDataToThePage();
        }//end mapHandlerFunction

        //this is a css thing
        function unRevealPanels(){
            //preserve nodelist & stick to For loops here (foreach not fully supported)
            for(var i = 0; i < nodeListOfPanelsToPopulate.length; i++){
                nodeListOfPanelsToPopulate[i].classList.add(hiddenStateString);
            }
        }

        //this also ties into functionality
        function disablePanels(){
            for(var i = 0; i < nodeListOfPanelsToPopulate.length; i++){
                nodeListOfCheckboxes[i].disabled = true;
                nodeListOfPanelsToPopulate[i].classList.add(disabledStateString);
            }
        }

        function removeAddActiveState(thenAdd){
            //query statecode            
            var selectedItem = document.querySelector('.usState--SELECTED');
            //if there is an active item, remove itS active class.
            if (selectedItem !== null){
                //selectedItem.classList.remove('usState--SELECTED');
                selectedItem.setAttribute('class', 'usState iftMap__svg__path')
            }
            if(thenAdd){
                //IE11 isn't handling classlist correctly here
                //document.getElementById(singularViewOnlyStatusContainer.currentStateCode).classList.add('usState--SELECTED');
                document.getElementById(singularViewOnlyStatusContainer.currentStateCode).setAttribute('class', 'usState iftMap__svg__path usState--SELECTED');
            }
        }

        function clearTonsOfStuffBeforeWritingDataToPage(){
            //start by clearing models
            safeManualResetOfmapStatusContainerDeepARRAY();
            safeManualResetOfOutputStatusContainerDeepARRAY();

            //clear the input value we are populating for the backend on section click
            clearHiddenInputForBackend();
            
            //next, clear content, flags and data attributes 
            //(could consult model)
            clearNoResultsMessageContainer();
            clearCheckBoxes();
            clearDataFlags();
            removeAllToolTips();
            clearPanelsOfContentAndDataAttributes();

            //reset statuses of the panels themselves;
            unRevealPanels();
            disablePanels();
        }


        function writeDataToThePage(){
            
            clearTonsOfStuffBeforeWritingDataToPage();
            //called without arguments becuase that function queries the model
            displayAreaName();

            //FILTER SectionItems array to make new subarray of matching state sections (max 8)
            var matchingSectionItems = rawSectionData.SectionItems.filter(function(sectionItem){
                return sectionItem.StateCode === singularViewOnlyStatusContainer.currentStateCode 
            });

            //NO RESULTS
            if(matchingSectionItems.length < 1){
                displayNoResultsMessage();
            }

            //now, map function to that new subarray
            var iteratorNum = 0;
            var indexOfPanelContainingHomeUserSection;
            var indexesOfPanelsContainingAlreadySavedSections = [];


            //if doing a map method with a counter, might be more idiomatic to use for loop
            matchingSectionItems.map(function(matchingSectionItem){
            //not all of these things should be in the map
                //console.log(matchingSectionItem);
                var indexOfSectionItem = rawSectionData.SectionItems.indexOf(matchingSectionItem);
                //SET PROPERTIES IN MODEL
                (function setAllTheProperties(){
                    //this is hardcoded, kinda. The order matters, so this should be a list operation. Or at least a forEach for ForIn loop. Better to do a list operation over properties
                    mapStatusContainerDeepARRAY[iteratorNum].currentProductId = rawSectionData.SectionItems[indexOfSectionItem].ProductId;
                    mapStatusContainerDeepARRAY[iteratorNum].currentProductName = rawSectionData.SectionItems[indexOfSectionItem].ProductName;
                    mapStatusContainerDeepARRAY[iteratorNum].currentComponentProductId = rawSectionData.SectionItems[indexOfSectionItem].ComponentProductId;
                    mapStatusContainerDeepARRAY[iteratorNum].currentComponentProductShortName = rawSectionData.SectionItems[indexOfSectionItem].ComponentProductShortName;
                    mapStatusContainerDeepARRAY[iteratorNum].currentMemberPrice = rawSectionData.SectionItems[indexOfSectionItem].MemberPrice;
                    mapStatusContainerDeepARRAY[iteratorNum].currentPostalCodeRange = rawSectionData.SectionItems[indexOfSectionItem].PostalCodeRange;
                    mapStatusContainerDeepARRAY[iteratorNum].currentComponentParentProduct = rawSectionData.SectionItems[indexOfSectionItem].ComponentParentProduct;

                    iteratorNum++;
                })();
            });//end of matchingSectionItems.map


            (function populatePanels(){
                for(var z = 0; z < nodeListOfPanelsToPopulate.length; z++){
                    var arrayOfSpansInThisPanel = arrayOfArrayOfFieldsToPopulate[z];
                    //4 spans per panel, so the function in the loop below will run 16 times
                    for(var zz = 0; zz < arrayOfSpansInThisPanel.length; zz++){
                        var valueForThisField = mapStatusContainerDeepARRAY[z][Object.keys(fieldsRequiredByPanelView)[zz]];
                        arrayOfSpansInThisPanel[zz].innerHTML = valueForThisField;
                    }

                    //using currentComponentParentProduct as flag. May need to change test
                    var valueForParentPanel = mapStatusContainerDeepARRAY[z].currentComponentParentProduct;
                    if(valueForParentPanel === 'IFT'){
                        nodeListOfPanelsToPopulate[z].setAttribute('data-thispanel', 'thisPanelHasComponentSection');
                    }
                }
            })();
            
            //this runs once per state selection
            (function actionsBasedOnSectionsUserAlreadyHas(){
                for(var i = 0; i < matchingSectionItems.length; i++){
                    if(matchingSectionItems[i].ProductId === userAlreadySavedSections.userHomeSectionProductID){  //always just one
                        indexOfPanelContainingHomeUserSection = i;
                    }

                    //if the product ID of the matching section item is one of the already selected sections
                    if(userAlreadySavedSections.additionalAlreadySavedSections.indexOf(matchingSectionItems[i].ProductId) > -1){
                        var numToPush = i;
                        indexesOfPanelsContainingAlreadySavedSections.push(numToPush);                                                      
                    }
                }
            })();//end actionsBasedOnUserHomeSectionOuterMostFunction


            //QUERY THE DOM FOR THESE UNLESS PREPARED TO DO A PANEL STATE CONTAINER [hasTip, disabled, hidden]

            //this runs once per state selection
            (function panelStatusFunctionAfterStateChoice(){
                for(var i = 0; i < nodeListOfPanelsToPopulate.length; i++){
    
                    var thisPanelToBeInspected = nodeListOfPanelsToPopulate[i];
 
                    (function decideWhetherSectionIsComponent(){

                        (function decideTooltips(){
                            if(thisPanelToBeInspected.getAttribute('data-thispanel') === 'thisPanelHasComponentSection'){
                                var referenceElem = thisPanelToBeInspected.querySelectorAll('label')[0];
                                createToolTipOnDemand(referenceElem);
                            }
                        })();
                        //here can go other decisions based on whether section is component product
                    })();//end decideWhetherSectionIsComponent

                    (function unDisablePanelsAfterStateChoice(){

                        //make sure record associated with the panel [using the index of the loop] does not contain user home section or already added sections before unDisabling a panel
                        if(i !== indexOfPanelContainingHomeUserSection && indexesOfPanelsContainingAlreadySavedSections.indexOf(i) < 0)
                        {
                            thisPanelToBeInspected.classList.remove(disabledStateString);
                            thisPanelToBeInspected.querySelector('input').disabled = false;
                        }
                        else {
                            //if panel DOES CONTAIN home state, so disable the input of course
                            thisPanelToBeInspected.querySelector('input').disabled = true;
                            
                        }
                    })();

                    (function unHidePanelsWithDataAfterStateChoice(){
                        //check the first span in the panel  to see if there is any data
                        var firstSpanInPanel = thisPanelToBeInspected.querySelectorAll('span')[0];
                        var valOfQuickRef = firstSpanInPanel.innerHTML;        
                        
                        //if there is any actual value here, unhide the panel
                        if(valOfQuickRef !== null && valOfQuickRef !== 'null' && valOfQuickRef !== ''){
                            thisPanelToBeInspected.classList.remove(hiddenStateString);
                        }
                    })();

                }//end for loop
            })();//end of panelStatusFunctionPerStateChoice
        }//end of write data to page function


        function createToolTipOnDemand(theReferenceFormLabelElement){
            var tooltipElement = document.createElement('i');
            tooltipElement.setAttribute('class', 'niftyTooltip');
            tooltipElement.setAttribute('data-toolTipText', 'Additional sections listed below are complimentary with this selection.');
            tooltipElement.innerHTML = '<svg class="iconInfo" viewBox="0 0 32 32"><use xlink:href="#iconInfo"/></svg>';
            var theFirstChild = theReferenceFormLabelElement.firstChild;
            theReferenceFormLabelElement.insertBefore(tooltipElement, theFirstChild);
        }


        function removeAllToolTips(){
            var nodelistOfTooltips = document.querySelectorAll('.niftyTooltip');
            if(nodelistOfTooltips !== null){
                for(var i = 0; i < nodelistOfTooltips.length; i++){
                    nodelistOfTooltips[i].remove();
                }
            }  
        }

        function displayNoResultsMessage(){
            var theMessageToDisplay = 'There are no sections available. Please choose another state';
            var messageContainer = document.createElement('div');
            messageContainer.id = 'noResultsMessageContainer';
            messageContainer.innerHTML = '<span>' + theMessageToDisplay + '</span>';
            var theReferenceElementInDoc = document.querySelectorAll('.dataDisplay__row > .col-sm-3')[0];
            var theFirstChild = theReferenceElementInDoc.firstChild;
            theReferenceElementInDoc.insertBefore(messageContainer, theFirstChild);
        }

        function displayAreaName(){
            seletedStateDisplay.innerHTML = singularViewOnlyStatusContainer.currentStateName;
        }

        function clearPanelsOfContentAndDataAttributes(){
            //force clears without consulting model
            arrayOfSpansToPopulateEmpty.map(function(thisSpan){
                thisSpan.innerHTML = '';
                thisSpan.setAttribute('data-thisspan', '');
            });
        }

       function clearNoResultsMessageContainer(){
            //query this here, not at the top
            var noResultsMessageContainer = document.getElementById('noResultsMessageContainer');
            if(noResultsMessageContainer !== null){
                noResultsMessageContainer.remove();
            }
        }
        function clearCheckBoxes(){
            for(var i = 0; i < nodeListOfCheckboxes.length; i++){
                nodeListOfCheckboxes[i].checked = false;
            }
        }
        function clearDataFlags(){
            for(var i = 0; i < nodeListOfCheckboxes.length; i++){
                nodeListOfPanelsToPopulate[i].setAttribute('data-thispanel', '');
            }
        }

        function clearHiddenInputForBackend(){
            hiddenInputForBackend.value = '';
        }


        function showHideWholeMap(event){
            if(event.currentTarget === iftMapButtonOpen) {
                iftMapWrapperOuter.classList.add(activeStateString);
            }
            if(event.currentTarget === iftMapButtonClose || event.currentTarget === iftMapButtonCancel) {
                iftMapWrapperOuter.classList.remove(activeStateString);
            }
        }


        function checkBoxHandler(event){

            var referenceToParentPanelOfCheckedInput = event.currentTarget.parentElement.parentElement;
            //first clear the model & inputForBackend
            safeManualResetOfOutputStatusContainerDeepARRAY();            
            clearHiddenInputForBackend();
            //then adjust with panel status & stage stuff
            adjustPanelStatusesBasedOnCurrentSelections(event, referenceToParentPanelOfCheckedInput);
            stageSectionsBasedOnCurrentSelections(referenceToParentPanelOfCheckedInput);
        }

        function adjustPanelStatusesBasedOnCurrentSelections(event, referenceToParentPanelOfCheckedInput){
            //map over panels to disable panels containing component products of the chosen section
            
            var indexOfParentPanel = arrayOfPanelsToPopulate.indexOf(referenceToParentPanelOfCheckedInput);
            
            //use FILTER to create an array of all panels that are NOT the one being interacted with
            var arrayOfPanelsToAdjustMINUStheOnejustChosen = arrayOfPanelsToPopulate.filter(function(thisPanel){

                //narrow that array so that it only includes components of currently interacted with thing
                if(arrayOfPanelsToPopulate.indexOf(thisPanel) !== indexOfParentPanel){
                    return thisPanel;
                }
            });
            
            //am i a component? 
            if(referenceToParentPanelOfCheckedInput.getAttribute('data-thispanel') === 'thisPanelHasComponentSection') {

                //If so, map over the other panels to find fellow(s)
                arrayOfPanelsToAdjustMINUStheOnejustChosen.map(function(thisPanelThatIsnTtheChosenOne){
                    if(thisPanelThatIsnTtheChosenOne.getAttribute('data-thispanel') === 'thisPanelHasComponentSection'){
                        if(event.currentTarget.checked === true){
                            reDisableOrEnableComponentProductOfCheckedItem(thisPanelThatIsnTtheChosenOne, 'reDisable');
                                //STAGE thisPanelThatIsnTtheChosenOne
                                thisPanelThatIsnTtheChosenOne.setAttribute('data-componentOfSelected', 'componentOfSelected');
                        }
                        else {
                            reDisableOrEnableComponentProductOfCheckedItem(thisPanelThatIsnTtheChosenOne, 'enable');
                                //UNSTAGE thisPanelThatIsnTtheChosenOne
                                thisPanelThatIsnTtheChosenOne.setAttribute('data-componentOfSelected', '');
                        }
                    }
                });
            }

            function reDisableOrEnableComponentProductOfCheckedItem(thisPanelThatIsnTtheChosenOne, reDisableOrEnable){
                if(reDisableOrEnable === 'reDisable'){
                    thisPanelThatIsnTtheChosenOne.classList.add(disabledStateString);
                    thisPanelThatIsnTtheChosenOne.querySelector('input').disabled = true;

                }
                else if (reDisableOrEnable === 'enable'){
                    thisPanelThatIsnTtheChosenOne.classList.remove(disabledStateString);
                    thisPanelThatIsnTtheChosenOne.querySelector('input').disabled = false;

                }
            }
        }

//need to ensure this runs AFTER previous function is complete (so consider calling from end of previous function)

        function stageSectionsBasedOnCurrentSelections(referenceToParentPanelOfCheckedInput){
            
             var indexesOfSelectedSections = [];
             var indexesOfPanelsContainingComponentSection = [];

             for (var abc = 0; abc < nodeListOfCheckboxes.length; abc++){
                //test must include things checked AND things marked as components
                if(nodeListOfCheckboxes[abc].checked === true || nodeListOfPanelsToPopulate[abc].getAttribute('data-componentOfSelected') === 'componentOfSelected'){
                    indexesOfSelectedSections.push(abc);
                }
             }
             console.log('the following panels are selected ' + indexesOfSelectedSections);

            //the checkbox handler clears the model and checkboxes, but maybe that should go here
            (function grabValuesFromMapStatusContainerDeepARRAY(){

                //this model can be 8
                for(var i = 0; i < mapStatusContainerDeepARRAY.length; i++){
                    
                    //stage checked AND components of checked
                    if(indexesOfSelectedSections.indexOf(i) > -1){
                        deepOutputObjectForStaging[i].ProductId = mapStatusContainerDeepARRAY[i].currentProductId;
                        deepOutputObjectForStaging[i].ProductName = mapStatusContainerDeepARRAY[i].currentProductName;
                        deepOutputObjectForStaging[i].ComponentProductId = mapStatusContainerDeepARRAY[i].currentComponentProductId;
                        deepOutputObjectForStaging[i].ComponentProductShortName = mapStatusContainerDeepARRAY[i].currentComponentProductShortName;
                        deepOutputObjectForStaging[i].MemberPrice = mapStatusContainerDeepARRAY[i].currentMemberPrice;
                    }
                }
                console.log(deepOutputObjectForStaging);
            })();

            (function putOutputArrayInHiddenInput(){
                hiddenInputForBackend.value = JSON.stringify(deepOutputObjectForStaging);
            })(); 

        }

        
        //EVENTS
        (function addEventListeners(){
            stateSelectMenu.addEventListener('change', mapHandlerFunction, false);
            internationalSelectMenu.addEventListener('change', mapHandlerFunction, false);
            iftMapButtonOpen.addEventListener('click', showHideWholeMap, false);
            iftMapButtonClose.addEventListener('click', showHideWholeMap, false);
            iftMapButtonCancel.addEventListener('click', showHideWholeMap, false);

            arrayOfCheckboxes.map(function(thisCheckbox){
                thisCheckbox.addEventListener('change', checkBoxHandler, false);
            })

        })();
    }    

    document.addEventListener('DOMContentLoaded', iftMapFunctionInit);
})();