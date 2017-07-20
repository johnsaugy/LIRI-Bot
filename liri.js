var keys = require('./keys.js');
var tweetKeys = keys.twitterKeys;
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var command =process.argv[2];
var product = process.argv[3];
var tweetClient = new Twitter(tweetKeys);
var fs = require('fs');
 
// ______________________________________________________________________________

// Twitter Function
	function tweetGet() {
		tweetClient.get('statuses/user_timeline',function(error, tweets, response){
			if(error){
				throw error;
				logResp(error);
			}
			for(var i = 0; i < tweets.length; i++){
				console.log(tweets[i].user.screen_name+" says "+tweets[i].text);
				console.log("---------------------------------------------------------------------");	
			}
		})
	};

//  Spotify Function
	function spotifyGet() {
				Spotify.search({type:'track', query: product}, function(err, data){

				var music = data.tracks.items

			for (i = 0; i < 1; i++) {

				if(err){
					console.log("That didn't work, try again");
					return;
		    	} else {
	    		console.log("---------------------------------------------------------------------");
	    		console.log("Artist: " + music[i].artists[0].name);
	    		console.log("Song Name: " + music[i].name);
	    		console.log("Preview Link: " + music[i].preview_url);
	    		console.log("Album: " + music[i].album.name);
	    		console.log("---------------------------------------------------------------------");
    			}
    		}
		});
	}

//  Movie OMDB Function
	function movieGet() {
		request("http://www.omdbapi.com/?t=" + product + "&plot=short&tomatoes=true&r=json", function(error, response, body){
			
			if(!error && response.statusCode == 200){
				var info = JSON.parse(body)
				var movies = [
					title = "Title: "+info.Title,
					year = "Year: "+info.Year,
					IMDB = "IMDB Rating: "+info.imdbRating,
					prod = "Production Company: "+info.Country,
					lang = "Language: "+info.Language,
					actors = "Actor: "+info.Actors,
					plot = "Plot: "+info.Plot,
					tomatoR = "Rotten Tomatoes Rating: "+info.tomatoRating,
					tomatoURL = "Rotten Tomatoes URL: "+info.tomatoURL,
				]
				for(var i = 0; i < movies.length; i++){
					console.log(movies[i]);
				}
			}
			else{
				console.log("That didn't work, try again");
			}
		})
	}

//
function doIt(){
		fs.readFile("random.txt", "utf8", function(error, data){
		var dataArr = data.split(",");
		command = dataArr[0];
		thing = dataArr[1];
		logGen(command, thing);
		switch(command){
			case "my-tweets":
			tweetGet();
			break;
			case "spotify-this-song":
			spotifyGet();
			break;
			case "movie-this":
			movieGet();
			break;
		}
		})
	}


//****************************************************
	switch(command){
//______________________________________
	case "my-tweets":
	tweetGet();
	break;
//______________________________________
	case "spotify-this-song":
	spotifyGet();
	if(product == undefined){
		product = 'The Sign';
	}
	break;
//______________________________________
	case "movie-this":
	if(product == undefined){
		product = 'Mr. Nobody';
	}
	movieGet();
	break;
//______________________________________
	case "do-what-it-says":
	doIt();
	break;
	default:
//______________________________________
	console.log("Invalid command, please run again.");
}


