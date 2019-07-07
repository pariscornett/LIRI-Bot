//require all packages necessary to run app
require("dotenv").config();
var keys = require("./keys.js");
//var spotify = new spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var spotifyRequire = require("node-spotify-api");

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
            "Date: " + concertResponse.datetime,
            divider
        ].join("\n\n");
    
        fs.appendFile("log.txt", showConcert + divider, function(err){
            if(err) throw err;
            console.log(showConcert);
        })
    })
}
