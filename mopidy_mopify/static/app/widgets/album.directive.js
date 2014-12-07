'use strict';

angular.module('mopify.widgets.directive.album', [
    "mopify.services.mopidy",
    "mopify.services.station"
])

.directive('mopifyAlbum', function(mopidyservice, stationservice) {

    return {
        restrict: 'E',
        scope: {
            album: '='
        },
        templateUrl: 'app/widgets/album.tmpl.html',
        link: function(scope, element, attrs) {

            var encodedname = encodeURIComponent( scope.album.name.replace(/\//g, "-") );
            scope.tracklistUrl = "/#/music/tracklist/" + scope.album.uri + "/" + encodedname;

            /*
             * Play the album            
             */
            scope.play = function(){
                mopidyservice.getAlbum(scope.album.uri).then(function(tracks){
                    mopidyservice.playTrack(tracks[0], tracks);
                }); 
            }
            
            scope.startStation = function(){
                stationservice.startFromSpotifyUri(scope.album.uri);
            };
        }
    };

});