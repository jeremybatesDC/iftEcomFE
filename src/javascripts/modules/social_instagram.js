import Instafeed from 'lib/instafeed.custom';
  //clientId: '161217bc3cce40ab81b9ffb79abd0ab3'

//don't load too many, because these aren't small


//randomize it...
//0 or 1




(function instafeedModule(){
	if(document.querySelector('#instafeed')){
		
		console.log(Math.random());

		var feed = new Instafeed({
		  get: 'user',
		  userId: '226965373',
		  accessToken: '226965373.372a9ca.d1ef6f357358406082a07a93424dd6c9',
		  tags:'catsofinstagram',
		  //standard is highest resolution
		  resolution: 'standard_resolution',
		  limit: 18,
		  //target blank
		  template: '<a class="instragram__image--wrapper instragram__link" target="_blank" href="{{link}}"><img class="instagram__image" instagram-src="{{image}}" /></a>',

		  after: function() {    
        	 putImagesInCustomGrid();
      		}
		});

		feed.run();

		function shuffle(array) {
		    var currentIndex = array.length
		      , temporaryValue
		      , randomIndex
		      ;

		    // While there remain elements to shuffle...
		    while (0 !== currentIndex) {

		      // Pick a remaining element...
		      randomIndex = Math.floor(Math.random() * currentIndex);
		      currentIndex -= 1;

		      // And swap it with the current element.
		      temporaryValue = array[currentIndex];
		      array[currentIndex] = array[randomIndex];
		      array[randomIndex] = temporaryValue;
		    }

		    return array;
		    console.log(array);
  		}

  		

		
		function putImagesInCustomGrid(){
			var collectionOfBrickContainers = document.querySelectorAll('.brick');
			var arrayOfInstagramImageWrappers = Array.prototype.slice.call(document.querySelectorAll('.instragram__image--wrapper'));
			
			//shuffle the array NOT WORKING
			console.log(arrayOfInstagramImageWrappers);
			arrayOfInstagramImageWrappers = shuffle(arrayOfInstagramImageWrappers);
			console.log(arrayOfInstagramImageWrappers);
			
			for(let i=0; i < collectionOfBrickContainers.length; i++){
				//collectionOfBrickContainers[i].innerHTML = arrayOfInstagramImageWrappers[i];

				collectionOfBrickContainers[i].appendChild(arrayOfInstagramImageWrappers[i]);


			}
			setInstagramSrc();

		}

		function setInstagramSrc(){
			var arrayOfInstagramImages = document.querySelectorAll('.instagram__image');
			for(let i=0; i < arrayOfInstagramImages.length; i++ ) {
				let theInstagramSrcOfThisImage = arrayOfInstagramImages[i].getAttribute('instagram-src');
				arrayOfInstagramImages[i].setAttribute('src', theInstagramSrcOfThisImage);
			}
		}


		//timeline

		var arrayOfBrickGroups = document.querySelectorAll('.brick-group');

		//var instagramCollageTimeline = new TimelineMax({paused:true});
		//instagramCollageTimeline.play();
		// function animateCollage(){
		// }
		
		TweenMax.staggerTo(arrayOfBrickGroups, 2, {
			opacity:1,
			delay:0.1,
			ease:Power1.easeOut
		}, 0.1);

	}
})();