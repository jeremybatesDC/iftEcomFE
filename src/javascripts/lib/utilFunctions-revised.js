/*function testForTemplate(templateToTestFor){
	if(document.querySelector(`.$templateToTestFor`){
		//do something
	}
}*/

// you can also reate a timeline and play/reverse

function toggleTween(tweenSpeed, thingToTween, classNameString, optionalFunction1, optionalFunction2){
	let addOpString = '+=';
	let removeOpString = '-=';
	if(thingToTween.classList.contains(classNameString)){
		TweenMax.to(thingToTween, tweenSpeed, {
			className: `${removeOpString}${classNameString}`,
			ease: Power1.ease
		});
		if(optionalFunction2){
			optionalFunction2();
		}
	}		
	else {
		TweenMax.to(thingToTween, tweenSpeed, {
			className: `${addOpString}${classNameString}`,
			ease: Power1.ease
		});
		if(optionalFunction1){
			optionalFunction1();
		}
	}
}

function pureTweenTo(tweenSpeed, thingToTween, plusOrMinus, classNameString, optionalFunction1){
	TweenMax.to(thingToTween, tweenSpeed, {
		className: `${plusOrMinus}${classNameString}`,
		ease: Power1.ease
	});
}

function pureTweenArrayTo(tweenSpeed, thingToLoop, plusOrMinus, classNameString){
	for(let i=0; i < thingToLoop.length; i++) {
		var itemIteration = thingToLoop[i];
		pureTweenThingTo(tweenSpeed, itemIteration, plusOrMinus, classNameString);
	}		
}



var utilFunctions = {toggleTween, pureTweenTo, pureTweenArrayTo};

module.exports = utilFunctions;