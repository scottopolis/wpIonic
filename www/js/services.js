angular.module('wpIonic.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('DataLoader', function( $http ) {

  return {
    all: function(url) {
      return $http.jsonp( url );
    },
    get: function(url) {
      // Simple index lookup
      return $http.jsonp( url );
    }
  }

});
