
//what i want to say is "version of mapStatusContainer filtered for the View, and another version of mapStatusContainer filtered for the backend.

// var statusContainerFieldsNeededByView = Object.keys(mapStatusContainer).filter(function(key) {
//     return fieldsRequiredByPanelView.indexOf(key) > -1
// });
// console.log('the view needs these fields BUT I NEED ALSO TO GRAB THE DARN VALUES:');
// console.log(statusContainerFieldsNeededByView);
// var statusContainerFieldsNeededByBackend = Object.keys(mapStatusContainer).filter(function(key) {
//     return fieldsRequiredByBackend.indexOf(key) > -1
// });
// console.log('the backend needs these fields the view needs these fields BUT I NEED ALSO TO GRAB THE DARN VALUES:');
// console.log(statusContainerFieldsNeededByBackend);

 
//The fields should be comma separated and between two section selections separate with ‘|’ delimiter and these details frontend needs to save into another hidden field ‘IFTSavedSectionHiddenfield’

 var arrayOfPanelsToPopulate = Array.prototype.slice.call(document.querySelectorAll('.iftMap__sectionData__wrapper'));
        var arrayOfSpansToPopulateEmpty = Array.prototype.slice.call(document.querySelectorAll('.iftMap__sectionData__wrapper span'));