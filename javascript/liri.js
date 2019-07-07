//require all packages necessary to run app
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");


//global variables
var command = process.argv[2] //stores the command
var input = process.argv.slice(3).join(" "); //stores user input and avoids the need for camelCase, quotes, etc.
var divider = "\n---------------------------\n";


//set up Axios to start making API calls
if (command == "concert-this") {
    var bandsURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
    axios.get(bandsURL).then(function(response){
        var concertResponse = response.data[0];
       // console.log(concertResponse);
        var showConcert = [
            divider,
            "Venue: " + concertResponse.venue.name,
            "Location: " + concertResponse.venue.city + "," + concertResponse.venue.region,
            "Date: " + moment(concertResponse.datetime).format("MMM Do YYYY"),
            divider
        ].join("\n\n");
    
        fs.appendFile("log.txt", showConcert + divider, function(err){
            if(err) throw err;
            console.log(showConcert);
        })
    }).catch(function(error){
        console.log(error);
    })
}
else if(command == "movie-this") {
    var moviesURL = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";
    axios.get(moviesURL).then(function(response){
        var moviesResponse = response.data;
        //console.log(moviesResponse);
        //console.log(moviesResponse.Ratings[0])
        var showMovie = [
            divider,
            "Title: " + moviesResponse.Title,
            "Released: " + moviesResponse.Year,
            "IMDB Rating: " + moviesResponse.Ratings[0].Value,
            "Rotten Tomatoes Rating: " + moviesResponse.Ratings[1].Value,
            "Produced in: " + moviesResponse.Country,
            "Language: " + moviesResponse.Language,
            "Plot: " + moviesResponse.Plot,
            "Actors: " + moviesResponse.Actors,
            divider
        ].join("\n\n");

        fs.appendFile("log.txt", showMovie + divider, function(err) {
            if(err) throw err;
            console.log(showMovie);
        })
    })  
}
else if (command == "spotify-this-song") {
    var spotifyRequire = require("node-spotify-api");
    var spotify = new Spotify ({
        id: "b3b2887fefce4f5ca159c852e25e2886",
        secret: "566a9e14d1c34aab8eda4523db8bc5cb"
    });
    spotify.search({type:"track", query: input}).then(function(response){
        console.log(response.data);
    });
}


       
