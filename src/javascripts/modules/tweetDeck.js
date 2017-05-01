// This is dummy Local Data
// will look something like:
// https://api.twitter.com/1.1/statuses/user_timeline.json? <- queries
// screen_name=NACACFairs&count=6
// Note count is completed first, if we filter out replies/rt
// our for loop will have to accomidate for i ... if i > 6 etc
// More info at https://dev.twitter.com/rest/reference/get/statuses/user_timeline

// IMPORTS
import TweetParse from 'lib/tweetParse.js';
import EnvVar from 'lib/envVar.js';

// FUNCTION
(function() {
	if (document.getElementById('tweetDeck')) {
		var tweetParse = new TweetParse;
		// DEV/PROD vars
		var TweetController = EnvVar({development:'//frontend.brightfind.com/ift/javascripts/data/twitter-feed.json',production:'/JSON/twitter-ift.json'});
		
		$.ajax({
			url: TweetController,
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				determineNumberOfTweets(data);
			}
		})
	}

	function determineNumberOfTweets(data){
		if(document.querySelectorAll('.twitter--vertical').length) {
			successFunction(data, 3)
		}
		else{
			successFunction(data, 6);
		}
	}

	function successFunction(data, numberOfTweets){
		var tweetDeck = document.getElementById('tweetDeck');
		var numberOfTweets = numberOfTweets;

		for (let i = 0; i < numberOfTweets; i++) {
			let tweetText = data[i].text;
			// Clean up tweet, add links
			tweetText = tweetParse.UrlUserHashtag(tweetText);
			tweetDeck.innerHTML = tweetDeck.innerHTML +
				'<div class="col-md-4 col-sm-6">' +
				'<div class="card-component vertical-component card-component__theme--default">' +
					'<div class="card-component__content-wrapper">' +
						'<div class="tweet-wrap">' +
							'<div class="tweet card-component__text">' + tweetText +
								'<div class="tweet-meta">' +
									'<a href="'+data[i].user.url+'"><img class="tweet__profile-pic" src="' + data[i].user.profile_image_url + '"></a>' +
									'<a href="'+data[i].user.url+'">'+data[i].user.screen_name+'</a><br>' +
									'<a href="#">' + tweetParse.parseTimeAgo(data[i].created_at) + '</a>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>'
		}
	}

})();

//add a test. If vertical, insert 3 tweets. If horizontal, insert 6