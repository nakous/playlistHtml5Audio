/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 //----------------------------//
 //Varialble site 
 var URL="music.xml";
 var PLAYURL="https://play.google.com/store/apps/details?id=com.cxxxxx";
 var TITRE="Amazigh music";

 
var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
		admob_ads();
		check_conection();
		analytics.startTrackerWithId('UA-xxxxxxxx-x', function(){console.log("startTrackerWithId ok");}, function(){console.log("startTrackerWithId non");});
	
    }
};

app.initialize();

function check_conection(){
	if ((navigator.network.connection.type).toUpperCase() != "NONE" &&
		   (navigator.network.connection.type).toUpperCase() != "UNKNOWN") {
				// console.log('Connectez à l\'internet');
				$(".error").hide();
		   }else{
			   	// console.log('S\'il vous plaît connectez vous à l\'internet'); 
				$(".error").html('S\'il vous plaît connectez vous à l\'internet').show();
		   }
	   setTimeout(check_conection, 10000);
}

function admob_ads(){
	
 	  admob.setOptions({
        publisherId:          "ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx",  // Required
        interstitialAdId:     "ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx",  // Optional
        tappxShare:           0.5                                        // Optional
      });
 

      // Start showing banners (atomatic when autoShowBanner is set to true)
      admob.createBannerView();

      // Request interstitial (will present automatically when autoShowInterstitial is set to true)
      
}

//-----------------------
// Tratement Audio

function pauseaudio() {
var vid = document.getElementById("audio"); 
    vid.pause();
}
function playaudio() {
var vid = document.getElementById("audio"); 
    vid.play();
} 

$( document ).on( "pagebeforechange" , function(e, data) {
	if(data.toPage[0].id != undefined){
		// window.analytics.trackView(data.toPage[0].id);
		if(typeof analytics != "undefined"){
			analytics.trackView(data.toPage[0].id, {},function(){console.log("trackView ok");}, function(){console.log("trackView non");});
		}
		
		pauseaudio();
		if(data.toPage[0].id=="playlistpage"){			
				if(typeof admob != "undefined"){
					admob.requestInterstitialAd();
					// console.log("requestInterstitialAd")
				}	
		}	
	}
});
$(window).load(function(){
	var audio;
	var playlist;
	var tracks;
	var current;

	init();
	function init(){
		current = 0;
		audio = $('audio');
		playlist = $('#playlist');
		tracks = playlist.find('li a.lk');
		len = tracks.length - 1;
		audio[0].play();
		
		playlist.on('click', 'a.lk', function(e) {
			e.preventDefault();
			link = $(this);
			current = link.parent().index();
			run(link, audio[0]);
			
			return false;
		});
		audio[0].addEventListener('ended',function(e){
			current++;
			if(current == len){
				current = 0;
				link = playlist.find('a.lk')[0];
			}else{
				link = playlist.find('a.lk')[current];    
			}
			run($(link),audio[0]);
		});
	}
	function run(link, player){
			player.src = link.attr('href');
			par = link.parent();
			par.addClass('active').siblings().removeClass('active');
			audio[0].load();
			audio[0].play();
	}
});


//-------------------------------
// Angular JS App

appl = angular.module('sound',[]);
appl.directive('html', [ function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.html(attrs.html);
    }
  }
}]);
appl.filter('decodeURIComponent', function() {
    return window.decodeURIComponent;
});
appl.controller('global', function($scope , $rootScope , $http) {
	
	$scope.app_name=TITRE;
	$scope.player=$('#audio');
	$scope.artiste=[];
	$scope.album=[];
	$scope.playurl=PLAYURL;
	$scope.getartiste=function(){
		return $scope.artiste ;
	}
	$scope.setartiste=function(e){
		$scope.artiste=e;
	}	
	$scope.getalbum=function(){
		return $scope.album;
	}
	$scope.setalbum=function(e){
		$scope.album=e;
	}	
	$scope.play=function(e){
		$scope.run(e,$scope.player);
	}	
	$scope.shareTT=function(){
		window.plugins.socialsharing.share(TITRE, null, null, PLAYURL);
	}
	$scope.shareFB=function(){
		window.plugins.socialsharing.shareViaFacebook(TITRE, null ,PLAYURL, function() {console.log('share ok')}, function(errormsg){console.log('non share')});
	}	
	$scope.shareTw=function(){
		window.plugins.socialsharing.shareViaTwitter(TITRE, null , PLAYURL);
	}
	$scope.to_album=function(e){
		$scope.album=e;
		playaudio();
		$.mobile.navigate("#playlistpage");
		
	}
	$scope.run=function(link, player){
        player.src = link;
        player.load();
        player.play();
	}

	
	$http.get(URL, {transformResponse: function (cnv) {
                            var x2js = new X2JS();
                            var aftCnv = x2js.xml_str2json(cnv);
                            return aftCnv;
                        }
                    }).success(function (response) {
						$scope.setartiste(response.arts.art);						
					});
});
