angular.module('wpIonic.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $sce, DataLoader, $rootScope ) {
  
  // Enter your site url here. You must have the WP-API v2 installed on this site. Leave /wp-json/wp/v2/ at the end.
  $rootScope.url = 'http://scottbolinger.com/wp-json/wp/v2/';

  $rootScope.callback = '_jsonp=JSON_CALLBACK';

})

.controller('PostCtrl', function($scope, $stateParams, DataLoader, $ionicLoading, $rootScope, $sce, CacheFactory, $log, Bookmark ) {

  if ( ! CacheFactory.get('postCache') ) {
    CacheFactory.createCache('postCache');
  }

  var postCache = CacheFactory.get( 'postCache' );

  $scope.itemID = $stateParams.postId;

  var singlePostApi = $rootScope.url + 'posts/' + $scope.itemID + '?_embed&' + $rootScope.callback;

  if( !postCache.get( $scope.itemID ) ) {

    // cache doesn't exist, so go get post

    $ionicLoading.show({
      noBackdrop: true
    });

    DataLoader.get( singlePostApi ).then(function(response) {
      $scope.post = response.data;

      // Don't strip post html
      $scope.content = $sce.trustAsHtml(response.data.content.rendered);

      $scope.comments = $scope.post._embedded['replies'][0];

      // add post to our cache
      postCache.put( response.data.id, response.data );

      $ionicLoading.hide();
    }, function(response) {
      $log.error('error', response);
      $ionicLoading.hide();
    });

  } else {
    // Item exists, use cached item
    $scope.post = postCache.get( $scope.itemID );
    $scope.content = $sce.trustAsHtml( $scope.post.content.rendered );
    $scope.comments = $scope.post._embedded['replies'][0];
  }

  $scope.bookmarked = Bookmark.check( $scope.itemID );

  $scope.bookmarkItem = function( id ) {
    
    if( $scope.bookmarked ) {
      Bookmark.remove( id );
      $scope.bookmarked = false;
    } else {
      Bookmark.set( id );
      $scope.bookmarked = true;
    }
  }

})

.controller('PostsCtrl', function( $scope, $http, DataLoader, $timeout, $ionicSlideBoxDelegate, $rootScope, $log ) {

  var postsApi = $rootScope.url + 'posts?' + $rootScope.callback;

  $scope.moreItems = false;

  $scope.loadPosts = function() {

    // Get all of our posts
    DataLoader.get( postsApi ).then(function(response) {

      $scope.posts = response.data;

      $scope.moreItems = true;

      //$log.log(response.data);

    }, function(response) {
      $log.error(response);
    });

  }

  // Load posts on page load
  $scope.loadPosts();

  paged = 2;

  // Load more (infinite scroll)
  $scope.loadMore = function() {

    if( !$scope.moreItems ) {
      return;
    }

    var pg = paged++;

    $log.log('loadMore ' + pg );

    $timeout(function() {

      DataLoader.get( postsApi + '&page=' + pg ).then(function(response) {

        angular.forEach( response.data, function( value, key ) {
          $scope.posts.push(value);
        });

        if( response.data.length <= 0 ) {
          $scope.moreItems = false;
        }
      }, function(response) {
        $scope.moreItems = false;
        $log.error(response);
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
  
    $timeout( function() {

      $scope.loadPosts();

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    
    }, 1000);
      
  };
    
})

.controller('BookmarksCtrl', function( $scope, $http, DataLoader, $timeout, $rootScope, $log, Bookmark, CacheFactory ) {

  $scope.$on('$ionicView.enter', function(e) {

    if ( ! CacheFactory.get('postCache') ) {
      CacheFactory.createCache('postCache');
    }

    var postCache = CacheFactory.get( 'postCache' );

    if ( ! CacheFactory.get('bookmarkCache') ) {
      CacheFactory.createCache('bookmarkCache');
    }

    var bookmarkCacheKeys = CacheFactory.get( 'bookmarkCache' ).keys();

    $scope.posts = [];
  
    angular.forEach( bookmarkCacheKeys, function( value, key ) {
      var newPost = postCache.get( value );
      $scope.posts.push( newPost );
    });

  });
    
})

.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate, $ionicHistory) {

  // $ionicSlideBoxDelegate.update();

  $ionicHistory.nextViewOptions({
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