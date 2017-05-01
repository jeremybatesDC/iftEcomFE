(function webWorker404(){
	if(1 > 0){
		var first = document.querySelector('#number1');
		var second = document.querySelector('#number2');
		var result = document.querySelector('.result');

		if (window.Worker) { // Check if Browser supports the Worker api.
			// Requries script name as input
			var myWorker = new Worker("javascripts/vendor/worker.js");

			second.onchange = function() {
			  myWorker.postMessage([first.value,second.value]);
			};

			myWorker.onmessage = function(e) {
				result.textContent = e.data;
			};
		}
	}
})();