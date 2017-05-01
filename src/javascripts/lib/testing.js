function testEventTimes(){
	if (document.readyState === 'loading') {
		console.log('loading');
	}

	if (document.readyState === 'interactive'){
		console.log('interactive');
	}

	if (document.readyState === 'complete') {
		console.log('complete');
	}
}

//FOR TESTING ONL
document.addEventListener('readystatechange', testEventTimes);
