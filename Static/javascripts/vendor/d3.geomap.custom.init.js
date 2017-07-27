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


        //reference to span to check for home section
        var hiddenInputToCheckForHomeSections = document.getElementById('IFTHomeSectionProductId');
        var additionalSectionsInput = document.getElementById('ctl00_MainContent_ctl00_MembershipJoinSection_SectionRepeater_ctl00_HiddenFieldProductId')
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


        //IMPORTANT. CREATING SET OF SPANS FOR EACH PANEL
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
                mapHandlerFunction(event, thisState);
            });

            svg.append('path')
              .attr('class', 'state-borders iftMap__svg__path--stateBorders')
              .attr('d', path(topojson.mesh(data, data.objects.states, function(a, b) { return a !== b; })));
        });
        //END DRAW MAP


        function mapHandlerFunction(event, statefromD3){            
            //if a state on the map has been clicked
            if(event.currentTarget.tagName === 'path') {                
                singularViewOnlyStatusContainer.currentStateCode = statefromD3.id;
                singularViewOnlyStatusContainer.currentStateName = statefromD3.properties.stateName;
                removeAddActiveState('thenAdd');
                stateSelectMenu.value = singularViewOnlyStatusContainer.currentStateCode;
            }
            //if a dropdown item has been selected (select menu visible only on mobile)
            if(event.currentTarget.id === 'stateSelectMenu') {
                singularViewOnlyStatusContainer.currentStateCode = stateSelectMenu.options[stateSelectMenu.selectedIndex].value;
                singularViewOnlyStatusContainer.currentStateName = stateSelectMenu.options[stateSelectMenu.selectedIndex].text;
                removeAddActiveState('thenAdd');
            }
            //if an international item has been selected
            if(event.currentTarget.id === 'internationalSelectMenu'){
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
            var indexOfPanelContainingAlreadySavedSection;

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

                //POPULATE REQUIRED FIELDS FROM MODEL
                //THESE ARE JUST SPANS
                var panelToAddStatusTo;
                var valueForParentPanel;



                (function populatePanels(){
                    var slowCounter = 0;
                    
                    //this will always run 4 times

                    arrayOfArrayOfFieldsToPopulate.map(function(arrayOfFieldsToPopulate){
                    // everything in here will always run 4 times
                        //here is a loop
                        for(var jBCounter = 0; jBCounter < arrayOfFieldsToPopulate.length; jBCounter++){
                            var valueForThisField = mapStatusContainerDeepARRAY[slowCounter][Object.keys(fieldsRequiredByPanelView)[jBCounter]];
                            arrayOfFieldsToPopulate[jBCounter].setAttribute('data-thisSpan', valueForThisField);
                            arrayOfFieldsToPopulate[jBCounter].innerHTML = valueForThisField

                        }
                       
                        valueForParentPanel = rawSectionData.SectionItems[indexOfSectionItem].ComponentParentProduct;

                        //move out of loop?
                        panelToAddStatusTo = nodeListOfPanelsToPopulate[slowCounter];

                        
                        (function addDataAttributes(){
                            panelToAddStatusTo.setAttribute('data-thispanel', valueForParentPanel);
                        })(panelToAddStatusTo);


                        slowCounter++;

                    });


                })();//end of populate panels

                //this will always be the last one
                
                
            });//end of matchingSectionItems.map


            (function actionsBasedOnSectionsUserAlreadyHas(){
               
                //does home section exist
                //does additional exist?

                //cases
                //NO home user section, NO already saved
                //YES home user section, NO already saved
                //NO home user section, YES already saved
                //YES home user section, YES already saved



                if(hiddenInputToCheckForHomeSections !== null && hiddenInputToCheckForHomeSections.value !== null){
                        //if it does exist, put textValue here and make it a number
                        userAlreadySavedSections.userHomeSectionProductID = parseInt(hiddenInputToCheckForHomeSections.value);     
                }
                else {console.log('no current homeUserSection');}

                if(additionalSectionsInput !== null && additionalSectionsInput.value !== null){
                    userAlreadySavedSections.additionalAlreadySavedSections.push(parseInt(additionalSectionsInput.value));
                    console.log('there are already saved sections and the first one is called ' + userAlreadySavedSections.additionalAlreadySavedSections[0]);
                }
                else {
                    console.log('no already saved section');
                }

                
                (function actionsBasedOnUserHomeSection(){
                        
                    for(var i = 0; i < matchingSectionItems.length; i++){
                        if(matchingSectionItems[i].ProductId === userAlreadySavedSections.userHomeSectionProductID){
                                //thisMatchingSectionItem.currentHomeSection = userHomeSectionProductID;
                                indexOfPanelContainingHomeUserSection = i;
                                //console.log('I am the user home section and my panel index is ' + );

                        }//end if
                        if(matchingSectionItems[i].ProductId === userAlreadySavedSections.additionalAlreadySavedSections[i]){
                            indexOfPanelContainingAlreadySavedSection = i;
                        }
                    }

                    //undisable panel status function will be called later either way

                })();//end actionsBasedOnUserHomeSection function

            })();//end actionsBasedOnUserHomeSectionOuterMostFunction


            //PANEL STATUS STUFF HERE BECAUSE OF THE WAY THE EVENT LOOP IS
            //QUERY THE DOM FOR THESE UNLESS PREPARED TO DO A PANEL STATE CONTAINER [hasTip, disabled, hidden]

            (function panelStatusMasterFunction(){
                for(var i = 0; i < nodeListOfPanelsToPopulate.length; i++){
    
                    var thisPanelToBeInspected = nodeListOfPanelsToPopulate[i];

                    //test 1

                    //adding tooltips to all in panel... even if there is no data in it
                    (function decideToolTips(){
                        if(thisPanelToBeInspected.getAttribute('data-thispanel') === 'IFT'){
                            var referenceElem = thisPanelToBeInspected.querySelectorAll('label')[0];
                            createToolTipOnDemand(referenceElem);
                        }
                    })();

                    //only undisable

                    //this test might not match the tooltip test depending on requirements.
                    //check if should also uncheck its self

                    (function unDisablePanels(){

                        //make sure record associated with the panel [using the index of the loop] does not contain user home state before unDisabling that panel

                        if(i !== indexOfPanelContainingHomeUserSection && userAlreadySavedSections.userHomeSectionProductID !== null && indexOfPanelContainingAlreadySavedSection !== null && i !== indexOfPanelContainingAlreadySavedSection){
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
                        var valOfQuickRef = firstSpanInPanel.getAttribute('data-thisspan');         
                        //if there is any actual value here, unhide the panel
                        
                        if(valOfQuickRef !== null && valOfQuickRef !== 'null' && valOfQuickRef !== ''){
                            thisPanelToBeInspected.classList.remove('iftMap__sectionData__wrapper--HIDDEN-STATE');
                        }
                    })();
                }
            })();//end of panelStatusMasterFunction
        
        }//end of display data on the page function


        function createToolTipOnDemand(theReferenceFormLabelElement){
            //hard Test code 
            //only show actual message on click
            var theToolTipMessageToDisplay = 'I am am awesome tooltip';

            var tooltipElement = document.createElement('i');
            //cannot use classList yet bC there isnTone
            tooltipElement.setAttribute('class', 'niftyTooltip');
            tooltipElement.setAttribute('data-toolTipText', 'Membership in a nearby section is complimentary to this section');
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
            else if(allOrJustThis === 'justThis'){

                hiddenInputForBackend.value = '';
                //then immediately re-populate hidden input with all other panels to be populated?
                //or surgically clear that part of the JSON? That's not JSON--itS just a string

            }

            //hiddenInputForBackend.value = '';

            // //else just clear the one inQuestion [hardcoding this for one second] -- just setting one static input to blank
            // else if(optionalIndexKey !== null) {
            //     //console.log('this is running' + optionalIndexKey);
            //     console.log('just clearing the single hidden input in question');

            //     //only one exists currently
            //     //nodeListOfHiddenInputsForBackend[optionalIndexKey].value = '';
            //     nodeListOfHiddenInputsForBackend[0].value = '';
            // }
            
        }

       

       //going to have to create tooltips on demand
        //this must be called each time new data is put on the page to get a fresh nodelist
        (function collectTooltipsAndAttachListeners(){
            var arrayOfToolTipIcons = Array.prototype.slice.call(document.querySelectorAll('.iconInfo'));
            var arrayOfToolTipsCloseButtons = Array.prototype.slice.call(document.querySelectorAll('.iftMap__tooltip__closeButton__wrapper'));
            //add listeners
            arrayOfToolTipIcons.map(function(tooltipIcon){
                tooltipIcon.addEventListener('click', openThisTooltip, false);
            });
            arrayOfToolTipsCloseButtons.map(function(toolTipCloseButton){
                toolTipCloseButton.addEventListener('click', closeActiveTooltip, false);
            });
        })();


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
            if(event.currentTarget === iftMapButtonOpen) {
                iftMapWrapperOuter.classList.add(activeStateSting);
            }
            if(event.currentTarget === iftMapButtonClose || event.currentTarget === iftMapButtonCancel) {
                closeActiveTooltip();
                iftMapWrapperOuter.classList.remove(activeStateSting);
            }
        }


        function stagePanelOfThisCheckbox(event){
            //make this cleaner this is dirty knowledge -- looking for closest ancestor with wrapper class
            var referenceToParentPanelOfCheckedInput = event.currentTarget.parentElement.parentElement;
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


                    //takeTheOutputOfThisPanelAndStickInInTheInput
                    //could force this to 0
                    //putOutputArrayInHiddenInput(indexOfThisPanel);
                    putOutputArrayInHiddenInput(0);

                    //problem with piping is that i would need to recompute the entire value string every thing based on the number
                    //

                })();
            }

            else if(stageOrUnstage==='uNstage'){
                //this is a nodelist
                console.log('time To unStage this panel: ' + referenceToParentPanelOfCheckedInput.id);
                UTILITY_clearThisObject(thisOutputObject);
                console.log(thisOutputObject);

                //this is separate clearing the backend model. This field gets populated by the back endmodel

                //only clear this one
                clearHiddenInputForBackend('justThis', indexOfThisPanel);
            }
        }
        //when pushing values to this csv, itS going to be complex to retain order... 

         function putOutputArrayInHiddenInput(indexOfHiddenInputToPopulate){

            var formattedOutput = JSON.stringify(deepOutputObjectForStaging);
            //this function will be called multiple times, with the particular panelS index mattering.

            if(hiddenInputForBackend !== null){
                //var theHiddenInputToPopulate = nodeListOfHiddenInputsForBackend[indexOfHiddenInputToPopulate];
                hiddenInputForBackend.value = formattedOutput;
                console.log(hiddenInputForBackend.value);
            }
            else {
                console.log('test failing');
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
                //name this function stageORunstage
                thisCheckbox.addEventListener('change', stagePanelOfThisCheckbox, false);
            })

        })();
    }    

    document.addEventListener('DOMContentLoaded', iftMapFunctionInit);
    
    //we are doing full postback now, so this can be removed
    //if partial postBack
    // if(window.hasOwnProperty('Sys')){
    //     Sys.WebForms.PageRequestManager.getInstance().add_endRequest(iftMapFunctionInit)   
    // }

})();