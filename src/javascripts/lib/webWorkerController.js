var first = document.querySelector('body');
// var second = document.querySelector('#number2');
// var result = document.querySelector('.result');

if (window.Worker) { // Check if Browser supports the Worker api.
	// Requries script name as input
	var myWorker = new Worker("worker.js");

// onkeyup could be used instead of onchange if you wanted to update the answer every time
// an entered value is changed, and you don't want to have to unfocus the field to update its .value

	first.onchange = function() {
	  myWorker.postMessage('postMessage'); // Sending message as an array to the worker
	  console.log('Message posted to worker');
	};

	
}