angular.module('wpIonic.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $sce, DataLoader, $rootScope ) {
  
  // Enter your site url here. You must have the Reactor Core plugin activated on this site
  $rootScope.url = 'http://scottbolinger.com';
  
  $rootScope.callback = '_jsonp=JSON_CALLBACK';

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    $scope.src = $sce.trustAsResourceUrl( $rootScope.url + '/?appp=login' );
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.logUserIn = function( username, password ) {

      console.log('Logging in...');

      $scope.spinner = true;
      $scope.loginMessage = null;

      targetFrame = window.frames['login-iframe'];
      targetFrame.postMessage( {
        message: 'login',
        username: username,
        password: password

      }, '*');

  }

  window.addEventListener('message', function(event) {

      if( event.data.loggedin === true ) {
        $scope.spinner = false;
        console.log(event.data);
        $scope.loggedin();
        $scope.closeLogin();
        localStorage.setItem('reactorUser', JSON.stringify( event.data ) );
    }

    if( event.data.loggedin === false )  {
      $scope.spinner = false;
      console.log(event.data.message);
      $scope.loginMessage = event.data.message;
      $scope.$apply();
    }

  });

  $scope.loggedin = function() {
      $scope.isUserLoggedIn = true;
  }

  $scope.logUserOut = function() {
    $scope.$broadcast('logout');
  }

  $scope.$on('logout', function(event, msg) {
    console.log('doing logout');
    localStorage.removeItem('reactorUser');
    $scope.isUserLoggedIn = false;
    $scope.closeLogin();
  });

})

.controller('PostCtrl', function($scope, $stateParams, DataLoader, $ionicLoading, $rootScope, $sce ) {

  $ionicLoading.show({
      noBackdrop: true
    });

  var singlePostApi = $rootScope.url + '/wp-json/posts/' + $stateParams.postId + '?' + $rootScope.callback;

  DataLoader.get( singlePostApi ).success(function(data, status, headers, config) {
      $scope.post = data;
      // Don't strip post html
      $scope.content = $sce.trustAsHtml(data.content);
      $ionicLoading.hide();
    }).
    error(function(data, status, headers, config) {
      console.log('error');
    });

})

.controller('PostsCtrl', function( $scope, $http, DataLoader, $timeout, $ionicSlideBoxDelegate, $rootScope ) {

    var postsApi = $rootScope.url + '/wp-json/posts?' + $rootScope.callback;

    $scope.loadPosts = function() {

      DataLoader.all( postsApi ).success(function(data, status, headers, config) {
        $scope.posts = data;
        //console.dir( data );
      }).
      error(function(data, status, headers, config) {
        console.log('error');
      });

    }

    // Load posts on page load
    $scope.loadPosts();

    paged = 2;
    $scope.moreItems = true;

    // Load more (infinite scroll)
    $scope.loadMore = function() {

      if( !$scope.moreItems ) {
        return;
      }

      var pg = paged++;

      $timeout(function() {

        var apiurl = $rootScope.url + '/wp-json/posts';

        DataLoader.all( apiurl + '?page=' + pg + '&' + $rootScope.callback ).success(function(data, status, headers, config) {

          angular.forEach( data, function( value, key ) {
            $scope.posts.push(value);
          });

          if( data.length <= 0 ) {
            $scope.moreItems = false;
          }
        }).
        error(function(data, status, headers, config) {
          $scope.moreItems = false;
          console.log('error');
        });

        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.resize');

      }, 1000);

    }

    $scope.moreDataExists = function() {
      return $scope.moreItems;
    }

    // Pull to refresh
    $scope.doRefresh = function() {
    
      console.log('Refreshing!');
      $timeout( function() {

        $scope.loadPosts();

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      
      }, 1000);
        
    };
    
})

.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate, $ionicViewService) {

  $ionicViewService.nextViewOptions({
    disableBack: true
  });
 
  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('app.posts');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };

})

.controller('TabsCtrl', function($scope) {

  // Tabs stuff here

});