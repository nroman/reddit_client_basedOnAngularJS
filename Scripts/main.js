var app = angular.module("redditViewer",['ngRoute']);

app.config(function($routeProvider,$controllerProvider){	
	$routeProvider
		.when('/',{			
			templateUrl: 'View/maingrid.html',
			controller: 'MainController'
		})
		.when('/authorDetails/:authorName',{
			templateUrl: 'View/authorDetails.html',
			controller: 'AuthorDetails'
		})
		.when('/bigimage/:imageUrl',{
			templateUrl: 'View/bigimage.html',
			controller: 'MainController'
		})
		.otherwise(
			{template: "The page doesn't exist"}
		);
   })
   .controller('MainController', ['$scope', '$http', function($scope, $http){
        $scope.greeting = "Watch top reddits";	
        $scope.imageUrl = 
	
        $scope.pageInit = function(){
            $http.get("http://www.reddit.com/r/pics/.json")
             .then(onDataUploadComplete, onError);
        };
        
        var onDataUploadComplete = function(response){
            $scope.reddits = response.data.data.children;
        };
        
        var onError = function(response){
            $scope.error = "Cannot find any data!";
        };               
    }])
   .controller('AuthorDetails', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
        $scope.pageHeader = "Author details";
	        
        $scope.showAuthorDetails = function(){
	    var authorName = $routeParams.authorName;
	    authorName = authorName.substring(1, authorName.length);
	    var path = "http://www.reddit.com/user/" + authorName +"/about.json";
	    
	    $http.get(path).then(onDataUploadComplete, onError);
        };
	
        var onDataUploadComplete = function(response){
            $scope.authorDetails = response.data.data;
        };
        
        var onError = function(response){
            $scope.error = "Cannot find any data!";
        };
    }])
   .directive('ngBigimage', function () {
     return {
	scope: {
                imageUrl: '@'
        },
        link: function ($scope, element, attrs, $location, $window) {
            element.bind('click', function () {
		var image = attrs.imageUrl;
		//alert(image);
		$window.location.href = image;
		//$scope.imageUrl = $sce.trustAsResourceUrl(attrs.imageUrl);
		
		//$scope.$apply(function($location) { $location.path(image); });
		//$location.path('/someNewPath');
		//next.templateUrl = image;
            });
        }
    };
   });

