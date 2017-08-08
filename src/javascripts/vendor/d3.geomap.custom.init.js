//must stick to ES5
;(function iftMapFunction(){
    "use strict";

    //for in loop
    function UTILITY_clearThisObject(objectToEnumerate){
        for(var thisPropName in objectToEnumerate) {
            objectToEnumerate[thisPropName] = '';
        }
    }

    //moving singular values here allows key/value pairs of mapStatusContainer to all be of the same shape (with up to 4);
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
    //MAX 4
    var mapStatusContainerDeepARRAY = [];
    function constructFreshMapStatusContainerModel(){
        for(var i = 0; i < 4; i++){
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
    // function PanelDisplayStatusARRAY_CONSTRUCTOR(hiddenOrNot, disabledOrNot, hasTipsOrNot){}



    function OutputStatusContainerDeepARRAY_CONSTRUCTOR(ProductId, ProductName, ComponentProductId, ComponentProductShortName, MemberPrice){
        this.ProductId = ProductId;
        this.ProductName = ProductName;
        this.ComponentProductId = ComponentProductId;
        this.ComponentProductShortName = ComponentProductShortName;
        this.MemberPrice = MemberPrice;
    }
    //max 4
    var deepOutputObjectForStaging = [];
    function constructFreshStagingContainerModel(){
        for(var i = 0; i < 4; i++){
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
            //console.log(userAlreadySavedSections.additionalAlreadySavedSections);
        }


    }

    //these can be used later to filter mapStatusContainer at queryTime
    //just using for keys, which is awkward but easier in the short term than filtering against a differently shaped thing
    var fieldsRequiredByPanelView = {
        currentProductName: ''
        ,currentMemberPrice: ''
        ,currentComponentProductShortName: ''
        ,currentPostalCodeRange: ''
    }

    var fieldsRequiredByBackend = {
        currentProductId: ''
        ,currentProductName: ''
        ,currentComponentProductId: ''
        ,currentComponentProductShortName: ''
        ,currentMemberPrice: ''
    }



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
        //var hiddenInputForBackend = document.getElementById('ctl00_MainContent_ctl00_MembershipJoinSection_IFTSavedSectionHiddenfield');
        var hiddenInputForBackend = document.getElementById('IFTSavedSectionHiddenfield');
        
        
        var nodeListOfHiddenInputsForBackend = document.querySelectorAll('[id^="ctl00_MainContent_ctl00_MembershipJoinSection_IFTSavedSectionHiddenfield"]');
        var activeStateSting = 'iftMapWrapperOuter--ACTIVE-STATE';

        //already have a reference, but itS more general for etch-a-sketch reasons

        var nodeListOfPanelsToPopulate = document.querySelectorAll('.iftMap__sectionData__wrapper')

        var nodeListOfCheckboxes = document.querySelectorAll('.iftMap__sectionData__wrapper [type="checkbox"]');
        var arrayOfCheckboxes = Array.prototype.slice.call(nodeListOfCheckboxes);

        var arrayOfPanelsToPopulate = Array.prototype.slice.call(nodeListOfPanelsToPopulate);
        var arrayOfArrayOfFieldsToPopulate = [];


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
            //to preserve nodelist, must stick to for loops (foreach is buggy)
            for(var i = 0; i < nodeListOfPanelsToPopulate.length; i++){
                nodeListOfPanelsToPopulate[i].classList.add('iftMap__sectionData__wrapper--HIDDEN-STATE');
            }
        }

        //this also ties into functionality
        function disablePanels(){
            for(var i = 0; i < nodeListOfPanelsToPopulate.length; i++){
                nodeListOfCheckboxes[i].disabled = true;
                nodeListOfPanelsToPopulate[i].classList.add('iftMap__sectionData__wrapper--DISABLED-STATE');
            }
        }


        function removeAddActiveState(thenAdd){
            //query statecode            
            var selectedItem = document.querySelector('.usState--SELECTED');
            //if there is an active item, remove itS active class. Why not just strip all? Oh, because it was causing a timing issue
            if (selectedItem !== null){
                selectedItem.classList.remove('usState--SELECTED');
            }
            if(thenAdd){
                document.getElementById(singularViewOnlyStatusContainer.currentStateCode).classList.add('usState--SELECTED');
            }
        }

        function clearTonsOfStuffBeforeWritingDataToPage(){
            //start by clearing models
            safeManualResetOfmapStatusContainerDeepARRAY();
            safeManualResetOfOutputStatusContainerDeepARRAY();

            //clear the input value we are populating for the backend on section click

            //THIS MUST CLEAR ALL 4
            clearHiddenInputForBackend('all');
            
            //next, clear content, flags and data attributes 
            //(consult model -- could consult model)
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

            //FILTER SectionItems array to make new subarray of matching state sections (max 4)
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
            var indexesOfPanelsContainingComponentSection = [];

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
                        nodeListOfPanelsToPopulate[z].setAttribute('data-thispanel', valueForParentPanel);
                        indexesOfPanelsContainingComponentSection.push(z);
                    }
                }
                console.log('these panels have component sections ' + indexesOfPanelsContainingComponentSection);

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
            (function panelStatusMasterFunction(){
                for(var i = 0; i < nodeListOfPanelsToPopulate.length; i++){
    
                    var thisPanelToBeInspected = nodeListOfPanelsToPopulate[i];
 
                    (function decideWhetherSectionIsComponent(){

                        (function decideTooltips(){
                            if(thisPanelToBeInspected.getAttribute('data-thispanel') === 'IFT'){
                                var referenceElem = thisPanelToBeInspected.querySelectorAll('label')[0];
                                createToolTipOnDemand(referenceElem);
                            }
                        })();

                        //here can go other decisions based on whether section is component product
                    })();//end decideWhetherSectionIsComponent

                    (function unDisablePanels(){

                        //make sure record associated with the panel [using the index of the loop] does not contain user home section or already added sections before unDisabling a panel

                        if(i !== indexOfPanelContainingHomeUserSection && indexesOfPanelsContainingAlreadySavedSections.indexOf(i) < 0)
                        {
                            thisPanelToBeInspected.classList.remove('iftMap__sectionData__wrapper--DISABLED-STATE');
                            thisPanelToBeInspected.querySelector('input').disabled = false;
                        }
                        else {
                            //if panel DOES CONTAIN home state, so disable the input of course
                            thisPanelToBeInspected.querySelector('input').disabled = true;
                            //but DONt manually CHECK this box, because that could add it again to the cart
                        }

                    })();

                    (function unHidePanelsWithData(){
                        //check the first span in the panel  to see if there is any data
                        var firstSpanInPanel = thisPanelToBeInspected.querySelectorAll('span')[0];
                        var valOfQuickRef = firstSpanInPanel.innerHTML;        
                        
                        //if there is any actual value here, unhide the panel
                        if(valOfQuickRef !== null && valOfQuickRef !== 'null' && valOfQuickRef !== ''){
                            thisPanelToBeInspected.classList.remove('iftMap__sectionData__wrapper--HIDDEN-STATE');
                        }
                    })();

                }//end for loop
            })();//end of panelStatusMasterFunction
        
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

        function clearHiddenInputForBackend(allOrJustThis, optionalIndexKey){

            
            if(allOrJustThis === 'all'){
                //console.log('clearing all hidden outputs for backend');
                // for(var i = 0; i < nodeListOfHiddenInputsForBackend.length; i++){
                //     nodeListOfHiddenInputsForBackend[i].value = '';
                // }
                hiddenInputForBackend.value = '';
            }

            //so, if justThis, and can only have 1 input, then
            else if(allOrJustThis === 'justThis'){

                hiddenInputForBackend.value = '';
                //then immediately re-populate hidden input with all other panels to be populated?
                //or surgically clear that part of the JSON? That's not JSON--itS just a string
            }
        }


        function showHideWholeMap(event){
            if(event.currentTarget === iftMapButtonOpen) {
                iftMapWrapperOuter.classList.add(activeStateSting);
            }
            if(event.currentTarget === iftMapButtonClose || event.currentTarget === iftMapButtonCancel) {
                closeActiveTooltip();
                iftMapWrapperOuter.classList.remove(activeStateSting);
            }
        }


        function reDisableOrEnableComponentProductOfCheckedItem(nodeListOfPanelsToRelate, reDisableOrEnable){
            if(reDisableOrEnable === 'reDisable'){
                nodeListOfPanelsToRelate[1].classList.add('iftMap__sectionData__wrapper--DISABLED-STATE');
            }
            else if (reDisableOrEnable === 'enable'){
                nodeListOfPanelsToRelate[1].classList.remove('iftMap__sectionData__wrapper--DISABLED-STATE');
            }
        }


        function checkBoxHandler(event){

            var indexOfCheckboxSelected = arrayOfCheckboxes.indexOf(event.currentTarget);

            //not really looking for the next one. Looking for all component sections that areNOT the current one
            var indexONextCheckbox = indexOfCheckboxSelected + 1;

            console.log(indexOfCheckboxSelected);

            var referenceToParentPanelOfCheckedInput = event.currentTarget.parentElement.parentElement;
            //first look into whether checkbox belongs to a panel with a component product
            var valueOfComponentProduct = referenceToParentPanelOfCheckedInput.getAttribute('data-thispanel')
            if(valueOfComponentProduct === 'IFT'){
                console.log('the section displayed in the panel containining this checkbox is a component product');
                
                //so here, check and disable peer component product
                //if checked, reDisable, if unchecked enable.
                if(event.currentTarget.checked === true) {

                    //make a refined nodelist of all component sections OTHER than current

                    reDisableOrEnableComponentProductOfCheckedItem(nodeListOfPanelsToPopulate, 'reDisable');
                }
                else {
                    reDisableOrEnableComponentProductOfCheckedItem(nodeListOfPanelsToPopulate, 'enable');
                }
            }

            stagePanelOfThisCheckbox(event, referenceToParentPanelOfCheckedInput);
        }

        function stagePanelOfThisCheckbox(event, referenceToParentPanelOfCheckedInput){
            if(event.currentTarget.checked){                
                stageOrUnstageThisPanel(event, referenceToParentPanelOfCheckedInput, 'stage');
            }
            else {
                stageOrUnstageThisPanel(event, referenceToParentPanelOfCheckedInput, 'uNstage');
            }
        }

        function stageOrUnstageThisPanel(event, referenceToParentPanelOfCheckedInput, stageOrUnstage){

            //after updating the staging model, this function must then update the actual hidden inputs that this map is populating
            var indexOfThisPanel = arrayOfPanelsToPopulate.indexOf(referenceToParentPanelOfCheckedInput);
            var thisOutputObject = deepOutputObjectForStaging[indexOfThisPanel];
            
            if(stageOrUnstage==='stage'){
                //grab values from model by that common index and put them here
                // BETTER TO MAKE VIEW OF FIELDS THAT ONLY THE BACKEND NEEDS. THEN CAN MAP OVER THAT ARRAY TO SET VALUES MORE EFFICIENTLY 
                (function grabValuesFromModel(){

                    thisOutputObject.ProductId = mapStatusContainerDeepARRAY[indexOfThisPanel].currentProductId;
                    thisOutputObject.ProductName = mapStatusContainerDeepARRAY[indexOfThisPanel].currentProductName;
                    thisOutputObject.ComponentProductId = mapStatusContainerDeepARRAY[indexOfThisPanel].currentComponentProductId;
                    thisOutputObject.ComponentProductShortName = mapStatusContainerDeepARRAY[indexOfThisPanel].currentComponentProductShortName;
                    thisOutputObject.MemberPrice = mapStatusContainerDeepARRAY[indexOfThisPanel].currentMemberPrice;

                    //console.log('time To stage ' + referenceToParentPanelOfCheckedInput.id);
                    //console.log(thisOutputObject);


                    //HARDCODED TO FIRST ONE
                    putOutputArrayInHiddenInput(0);
                })();
            }

            else if(stageOrUnstage==='uNstage'){
                //this is a nodelist
                //console.log('time To unStage this panel: ' + referenceToParentPanelOfCheckedInput.id);
                UTILITY_clearThisObject(thisOutputObject);
                //console.log(thisOutputObject);
                //this is separate clearing the backend model. This field gets populated by the back endmodel
                //only clear this one
                clearHiddenInputForBackend('justThis', indexOfThisPanel);
            }
        }

         
         function putOutputArrayInHiddenInput(indexOfHiddenInputToPopulate){

            var formattedOutput = JSON.stringify(deepOutputObjectForStaging);
            //this function will be called multiple times, with the particular panelS index mattering.

            if(hiddenInputForBackend !== null){
                //var theHiddenInputToPopulate = nodeListOfHiddenInputsForBackend[indexOfHiddenInputToPopulate];
                hiddenInputForBackend.value = formattedOutput;
                //console.log(hiddenInputForBackend.value);
            } 
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