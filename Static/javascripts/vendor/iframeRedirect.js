//verbose for readability
function initOuterIframeFunction(){
    var loginframeNode = document.getElementById('loginframe');
    if(loginframeNode !== null){
        loginframeNode.addEventListener('load', function(){
            initInnerIframeFunction(loginframeNode);
        });
    }
}

function initInnerIframeFunction(loginframeNode){
    var referenceToIframeContent = loginframeNode.contentDocument.body;
    var referenceToFormInsideIframe = referenceToIframeContent.querySelector('#aspnetForm');
    if(referenceToFormInsideIframe !== null){
        var valueOfFormAction = referenceToFormInsideIframe.getAttribute('action');
        
        console.log('show me form action value');
        console.log(valueOfFormAction);
        
        testForToken(valueOfFormAction);
    }
}

function testForToken(valueOfFormAction){
    
    var substring = 'token';
    var charToSplitString = '=';

    if(valueOfFormAction.indexOf(substring) !== -1){
        //token value is whatever follows the equal sign
        var splitString = valueOfFormAction.split([charToSplitString]);
        var stringAfterSplit = splitString[1];
        var tokenValue = stringAfterSplit;

        //log the second half
        console.log(tokenValue);
        redirectPageBasedOnToken(tokenValue);
    }
}

function redirectPageBasedOnToken(tokenValue){
    var redirectURL = 'iframeloginhandler.aspx?token=' + tokenValue;
    window.location = redirectURL;
}

document.addEventListener('DOMContentLoaded', initOuterIframeFunction);