


//this is NOT running through Babel, so no ES6 (too bad, because forEach on nodelists is so nice)






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

    function MapStatusContainerDeepARRAY_CONSTRUCTOR(currentProductId, currentProductName, currentComponentProductId, currentComponentProductShortName, currentMemberPrice, currentPostalCodeRange, currentComponentParentProduct, currentHomeSection){
        this.currentProductId = currentProductId;
        this.currentProductName = currentProductName;
        this.currentComponentProductId = currentComponentProductId;
        this.currentComponentProductShortName = currentComponentProductShortName;
        this.currentMemberPrice = currentMemberPrice;
        this.currentPostalCodeRange = currentPostalCodeRange;
        this.currentComponentParentProduct = currentComponentParentProduct;
        this.currentHomeSection = currentHomeSection;
    }
    //MAX 4
    var mapStatusContainerDeepARRAY = [];
    function constructFreshMapStatusContainerModel(){
        for(var i = 0; i < 4; i++){
            var thisConstructedThing = new MapStatusContainerDeepARRAY_CONSTRUCTOR(null, null, null, null, null, null, null);
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
		var spanToCheckForHomeSections = document.getElementById('ctl00_MainContent_ctl00_MembershipJoinSection_homeSectionRepeater_ctl00_LabelHomeSection');
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

        var nodeListOfHiddenInputsForBackend = document.querySelectorAll('[id^="IFTSavedSectionHiddenfield"]');
        var hiddenInputForBackend = document.getElementById('IFTSavedSectionHiddenfield');
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
        d3.json('javascripts/data/topoJSONusCustom.json', function(error, data) {
        //d3.json('/Scripts/data/topoJSONusCustom.json', function(error, data) {
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
            matchingSectionItems.map(function(matchingSectionItem){
            //not all of these things should be in the map

            	console.log(matchingSectionItem);
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

                    //initialize as null -- but is this getting overwritten 
                    mapStatusContainerDeepARRAY[iteratorNum].currentHomeSection = null;



                   

                    iteratorNum++;

                })();

                //POPULATE REQUIRED FIELDS FROM MODEL
                //THESE ARE JUST SPANS
                var panelToAddStatusTo;
                var valueForParentPanel;

                (function populatePanels(){
                	var slowCounter = 0;
                	
                	//this will always run 4 times

                	//map inside a map
                	arrayOfArrayOfFieldsToPopulate.map(function(arrayOfFieldsToPopulate){
                	//everything in here will always run 4 times


						var jBCounter = 0;

						
						arrayOfFieldsToPopulate.map(function(fieldToPopulate){
							//this will run for the # of fields required by view (currently 4)
							var valueForThisField = mapStatusContainerDeepARRAY[slowCounter][Object.keys(fieldsRequiredByPanelView)[jBCounter]];
							
							

							//this is querying model for items that the View requires
							fieldToPopulate.setAttribute('data-thisSpan', valueForThisField);
							fieldToPopulate.innerHTML = valueForThisField
							jBCounter++;
						});



						//mark the panel with some EXTRA DATA for status!!!

						// THIS IS THE PART I THINK WAS NEEDED FOR TOOLTIPS

						valueForParentPanel = rawSectionData.SectionItems[indexOfSectionItem].ComponentParentProduct;






						// THIS IS WHERE WE CAN HOOK INTO 




						//should USE DIFFERENT COUNTER B/C SO WE CAN MOVE THIS OUTSIDE OF THIS LOOP
						panelToAddStatusTo = nodeListOfPanelsToPopulate[slowCounter];

						

						(function addDataAttributes(){
							panelToAddStatusTo.setAttribute('data-thispanel', valueForParentPanel);
						})(panelToAddStatusTo);


						console.log(panelToAddStatusTo.getAttribute('data-thispanel'));

						
					
						slowCounter++;

                	});


                })();//end of populate panels

                //this will always be the last one
                
                
            });//end of matchingSectionItems.map


            (function actionsBasedOnUserHomeSectionOuterMostFunction(){
                //does it exist

                //the 2nd part of this test isnT rigourous enough
                if(spanToCheckForHomeSections !== null && spanToCheckForHomeSections.textContent !== null){
                     //if it does, put textValue here
                        var userHomeSectionString = spanToCheckForHomeSections.textContent;
                        console.log('userHomeSection is ' + userHomeSectionString);
                        actionsBasedOnUserHomeSection(userHomeSectionString);
                }
                else {
                    console.log('no current homeUserSection');


                }


                function actionsBasedOnUserHomeSection(userHomeSectionString){
                        

                        //undisable panel status function will be called later either way

                        matchingSectionItems.map(function(thisMatchingSectionItem){


                            //using productnameKey
                            if(userHomeSectionString !== null && userHomeSectionString === thisMatchingSectionItem.currentProductName){


                                    thisMatchingSectionItem.currentHomeSection = userHomeSectionString;



                                    console.log('there is a value in the model that matches the userHomeSection and it is ' + thisMatchingSectionItem.currentHomeSection);

                                    console.log('if we are to trigger change event with dropdown then we need state code -- unless i can make the dropdown exactly match this')

                                    //get a key you can send to the statedropdown menu -- statecode


                                    //this will hopefully trigger a change event // but currentStateCode is not in model
                                    //stateSelectMenu.value = stateCodeOfUserHomeSection;


                            }//end if
                            else {
                                //this value is used outside of this function, so i needs an assignment one way or the other
                                thisMatchingSectionItem.currentHomeSection = null;
                            }

                        });//end map


                        

                }

            })();


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

                        //something is wiping out this field
                        console.log('why always undefined or null?');
                        console.log(mapStatusContainerDeepARRAY[i].currentHomeSection);

	    				//make sure panel does not contain user home state before unDisabling

                        //THIS TEST NEEDS TO WORK

                        //too many things are passing. Something is clearing this value and making it always null -- or the initial value of null isn't getting properly set back in the model
	    				if(mapStatusContainerDeepARRAY[i].currentHomeSection === null){
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
			})();
		
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
                console.log('clearing all hidden outputs for backend');
                for(var i = 0; i < nodeListOfHiddenInputsForBackend.length; i++){
                    nodeListOfHiddenInputsForBackend[i].value = '';
                }
            }
            //else just clear the one inQuestion [hardcoding this for one second] -- just setting one static input to blank
            else if(optionalIndexKey !== null) {
                console.log('this is running' + optionalIndexKey);

                console.log('just clearing the single hidden input in question');
                nodeListOfHiddenInputsForBackend[optionalIndexKey].value = '';
            }
            
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

            //query page 

            if(event.currentTarget === iftMapButtonOpen) {
                iftMapWrapperOuter.classList.add(activeStateSting);
            }
            if(event.currentTarget === iftMapButtonClose || event.currentTarget === iftMapButtonCancel) {
                
            	//SHOULD CLOSING MODAL ALSO CLEAR MODEL & VIEW? NO. SELECTION SHOULD REMAIN IN CASE IT WAS ACCIDENTAL

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

	        		console.log('time To stage ' + referenceToParentPanelOfCheckedInput.id);
	        		console.log(thisOutputObject);


                    //update csv
                    //will need 4 inputs


                    //takeTheOutputOfThisPanelAndStickInInTheInput
                    putOutputArrayInHiddenInput(indexOfThisPanel);

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


                //only clear this one!
                clearHiddenInputForBackend('justThis', indexOfThisPanel);

        	}

                    //update csv



            //then update the outputCSV regardless o

   
        }
        //when pushing values to this csv, itS going to be complex to retain order... 

         function putOutputArrayInHiddenInput(indexOfHiddenInputToPopulate){

            console.log('what am i getting here? Is it null sometimes?');

            console.log(indexOfHiddenInputToPopulate);

            var formattedOutput = JSON.stringify(deepOutputObjectForStaging);
            //this function will be called multiple times, with the particular panelS index mattering.
            


            console.log('NOW what am i getting here? Is it null sometimes? Not sure how/why undefined maybe because blank or something');

            //


            console.log(theHiddenInputToPopulate);

            //takes contents of outputObjectForBackend and populates #hiddenInputForBackend
           
            //requested formatting is very specific

            //now must filter against 


            if(nodeListOfHiddenInputsForBackend[indexOfHiddenInputToPopulate] !== null){
                var theHiddenInputToPopulate = nodeListOfHiddenInputsForBackend[indexOfHiddenInputToPopulate];
                theHiddenInputToPopulate.value = formattedOutput;
                console.log(theHiddenInputToPopulate.value);
            }

            else {
                console.log('why does this sometimes return undefined?');
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
    
    if(window.hasOwnProperty('Sys')){
        //if partial postBack
 		//need to test this as injection point
        Sys.WebForms.PageRequestManager.getInstance().add_endRequest(iftMapFunctionInit)   
    }

})();