# playlistHtml5Audio
playlist Html5 Audio


This is a great project Phonegap  With Angularjs and Html/Js/Css created by Nakous Mustapha .

If you have any problems with installation or integration, please contact me ;)

if you want tutorial about this application you can find it here :
http://howdevelopment.com/phonegap-make-playlist-mp3/

you can include all songs in file music.xml and give him an id , name ... , and list of songs.

<img class="aligncenter wp-image-80" src="http://howdevelopment.com/wp-content/uploads/2017/02/Capture-d’écran-2017-02-09-à-19.03.55-168x300.png" height="380" width="250">

This is a list of elements you  need to change it in JS/index.js file :

// Set your link to xml file here
var URL="music.xml";

//Set your link google play or app store 
var PLAYURL="https://play.google.com/store/apps/details?id=com.cxxxxx";

// Set the title of your the app here 
 var TITRE="Amazigh music";

// To track your app you need add Id code the google analytics here 
// Get this id in your account google analytics, Create new property mobile (Not website)
analytics.startTrackerWithId('UA-xxxxxxxx-x', func....)

//Here set your Id Admob, you can create 2 blocks in you admob account the publisher and interstitial Ad 
publisherId:          "ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx",  
interstitialAdId:     "ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx",


Good luck
