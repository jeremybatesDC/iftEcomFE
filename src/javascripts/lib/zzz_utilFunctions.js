// you can also reate a timeline and play/reverse

function toggleTween(thingToTween, classNameString, optionalFunction1, optionalFunction2){
	let addOpString = '+=';
	let removeOpString = '-=';
	if(thingToTween.classList.contains(classNameString)){
		TweenMax.to(thingToTween, .2, {
			className: `${removeOpString}${classNameString}`,
			ease: Power1.ease
		});
		if(optionalFunction2){
			optionalFunction2();
		}
	}		
	else {
		TweenMax.to(thingToTween, .2, {
			className: `${addOpString}${classNameString}`,
			ease: Power1.ease
		});
		if(optionalFunction1){
			optionalFunction1();
		}
	}
}

function pureTweenTo(thingToTween, plusOrMinus, classNameString, optionalFunction1){
	TweenMax.to(thingToTween, .2, {
		className: `${plusOrMinus}${classNameString}`,
		ease: Power1.ease
	});
}


var utilFunctions = {toggleTween, pureTweenTo};

module.exports = utilFunctions;