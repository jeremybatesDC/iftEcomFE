
// $(function () {
//     $('#emailSubmitButton').click(function (event) {
//         event.preventDefault();
//         $.ajax({
//             url: '/handlers/Signup.ashx',
//             contentType: "application/json; charset=utf-8",
//             headers: { 'Id': $("input[name='guid']").val(), 'email': $("input[name='email']").val() },
//             success: function (response) {
//                 if (response === "pass") {
//                     $('#signupForm').html($("input[name='thankyou']").val());
//                 } else {
//                     $('#signupForm').html($("input[name='error']").val());
//                 }
//             },
//         });
//     });
// });



// // Read a page's GET URL variables and return them as an associative array.
// function getUrlVars() {
//     var vars = [], hash;
//     var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
//     for (var i = 0; i < hashes.length; i++) {
//         hash = hashes[i].split('=');
//         vars.push(hash[0]);
//         vars[hash[0]] = hash[1];
//     }
//     return vars;
// }

// function updateURLParameter(url, param, paramVal) {
//     var newAdditionalURL = "";
//     var tempArray = url.split("?");
//     var baseURL = tempArray[0];
//     var additionalURL = tempArray[1];
//     var temp = "";
//     if (additionalURL) {
//         tempArray = additionalURL.split("&");
//         for (i = 0; i < tempArray.length; i++) {
//             if (tempArray[i].split('=')[0] != param) {
//                 newAdditionalURL += temp + tempArray[i];
//                 temp = "&";
//             }
//         }
//     }

//     var rows_txt = temp + "" + param + "=" + paramVal;
//     return baseURL + "?" + newAdditionalURL + rows_txt;
// }

// // Search/Listing Page Filter Scripts

// $(document).ready(function () {

//     //select refinements checkboxes if already present in query string
//     var refinements = getUrlVars()["refinements"];
//     if (refinements != undefined) {
//         var filters = refinements.split(',');
//         $.each(filters, function (index, value) {
//             $(this).siblings('span:first').text(value);
//             $("#facetssection input:checkbox[value='" + value + "']").attr("checked", true);
//         });
//     }

//     var selectedfilters = "";
//     $("#facetssection input[type=checkbox]").each(function () {
//         if ($(this).is(":checked")) {
//             selectedfilters += "<li class=\"searchFiltersActive__tagItem\" id=\"" + $(this).val() +
//                 "\"><span>" + $(this).siblings('span:first').text() + "</span></li>";
//         }
//     });

//     var yourfiltershtml = "";
//     if (selectedfilters != "") {
//         yourfiltershtml = selectedfilters;
//     }

//     //$("#spanfilters").html(selectedfilters);
//     $("#searchFiltersActive__tagList").html(yourfiltershtml);

//     //preselect sort order dropdown based on query string
//     var sorttype = getUrlVars()["sorttype"];
//     if (sorttype != undefined) {
//         $("select#sorttype").val(sorttype);
//     }

//     //Your Filters click function
//     $(".searchFiltersActive__tagItem").click(function () {
//         $('input:checkbox[value="' + this.id + '"]').attr('checked', false);
//         $('input:checkbox[value="' + this.id + '"]').trigger('change');
//     });

//     ////Search result tag click function
//     //$(".card-component__tag a").click(function () {

//     //});

//     //Facet checked function
//     $("#facetssection input:checkbox").change(function () {
//         var selected = $('.searchFacets__filtersContainer input:checked').map(function (i, el) { return el.value; }).get();
//         var selectedvalues = selected.join(",");

//         var facetsurl = window.location.href;
//         facetsurl = updateURLParameter(window.location.href, "refinements", selectedvalues);
//         facetsurl = updateURLParameter(facetsurl, "page", "1");

//         window.location.href = facetsurl;
//     });

//     $("select#sorttype").change(function () {
//         var sorturl = window.location.href;
//         sorturl = updateURLParameter(window.location.href, "sorttype", $('select#sorttype').val());
//         sorturl = updateURLParameter(sorturl, "page", "1");

//         window.location.href = sorturl;
//     });
// });

// // End Search/Listing Page Filter Scripts

// // autocomplete initialization

// $(document).ready(function () {
//     $('#txtKeyword').autoComplete({
//         source: function (term, response) {
//             getAutoComplete(term, response);
//         }
//     });

//     $('#toptxtKeyword').autoComplete({
//         source: function (term, response) {
//             getAutoComplete(term, response);
//         }
//     });

//     function getAutoComplete(term, response) {
//         $.ajax({
//             type: "POST",
//             contentType: "application/json; charset=utf-8",
//             url: "/handlers/AutoCompleteSearch.asmx/AutoComplete",
//             data: "{'searchterm':'" + term + "'}",
//             dataType: "json",
//             async: true,
//             success: function (data) {
//                 response(data.d);
//             },
//             error: function () {

//             }
//         });
//     }
// });