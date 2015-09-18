angular.module('wpIonic.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('DataLoader', function( $http ) {

  return {
    get: function(url) {
      // Simple index lookup
      return $http.jsonp( url );
    }
  }

})

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);
