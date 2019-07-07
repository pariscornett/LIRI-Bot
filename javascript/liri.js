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
