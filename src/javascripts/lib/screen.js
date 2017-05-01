// Just creates a screen element and fades it in, then destroys it.
// CSS for this resides in partials/_main.scss or style it here is you want
var Screen = function() {
	this.turnScreenOn = function(modifier) {
		if (!document.getElementById('screen__overlay')) {
			let screenOverlay = document.createElement('div'),
				mainElement = document.getElementsByTagName('main')[0];
			mainElement.appendChild(screenOverlay)
			screenOverlay.setAttribute('id', 'screen__overlay');
			screenOverlay.setAttribute('class', 'screen__overlay');
			setTimeout(function() {
				screenOverlay.classList.add('screen__overlay--on');
				if (modifier) {
					screenOverlay.classList.add('screen__overlay--' + modifier);
				}
			}, 10)
		}
	}
	this.turnScreenOff = function() {
		let screenOverlay = document.getElementById('screen__overlay');
		screenOverlay.classList.remove('screen__overlay--on');
		setTimeout(function() {
			screenOverlay.outerHTML = '';

		}, 400)
	}
}
module.exports = Screen;
