define(['angular'], function (angular) {
	'use strict';
	
	return angular.module('dashboardMod', [])

		.config(['$stateProvider', function($stateProvider) {
			
			$stateProvider.state('dashboard', {
				url: "/dashboard",
				templateUrl: "app/dashboard/dashboard.tpl.html",
				controller: 'dashboardCtrl'
			});

		}])

		.controller('dashboardCtrl', ['$scope', 'callDataSvc', function($scope, callDataSvc) {
		  
		  $scope.filteredContent = [];
		  $scope.localStorage = {};
		  $scope.outputData = [];
		  $scope.contentTrackerOrder = [];

		  var contentTracker = {
		  	"idea" 				: 0,
		  	"personal-project"  : 0,
		  	"brainstorm" 		: 0,
		  	"project" 			: 0,
		  	"howto" 			: 0,
		  	"challenge" 		: 0,
		  	"design" 			: 0
		  }

		  //Get local storage encoded json object from preferences selected
		  var getStorage = function(){
		  	$scope.localStorage = angular.fromJson(localStorage.getItem("lm-prefs"));
		  }

		  //Adding point values to contentTracker object to see which categories will be loaded and in which order
		  var addPoints = function(){
		  	for(var prop in $scope.localStorage){

		  		if(Number($scope.localStorage[prop]) === 0){

		  			contentTracker[prop]--;

		  		}else if(Number($scope.localStorage[prop]) === 1){

		  			contentTracker[prop]++;

		  		}else if(prop == "personType"){

		  			contentTracker["idea"]++;
		  			if($scope.localStorage[prop] === "hobbyist"){
		  				contentTracker["personal-project"]++;
		  			}else{
		  				contentTracker["project"]++;
		  			}

		  		}else if(prop == "preference"){

		  			contentTracker["idea"]++;
		  			if($scope.localStorage[prop] === "design"){
		  				contentTracker["design"]++;
		  				contentTracker["challenge"]--;
		  			}else if($scope.localStorage[prop] === "engineer"){
		  				contentTracker["project"]++;
		  				contentTracker["challenge"]++;
		  			}else{
		  				contentTracker["design"]++;
		  				contentTracker["project"]++;
		  			}

		  		}
		  	}
		  }

		  //Order the objects into an array first being best, last being not as important.
		  var loadOrderMap = function(){
		  		for(var prop in contentTracker){
		  			if(contentTracker[prop] <= 0){ continue; }
		  			$scope.contentTrackerOrder.push([prop, contentTracker[prop]])
		  		}
		  		$scope.contentTrackerOrder.sort(function(a, b) {return a[1] - b[1]})
		  }

		  var loadOrderCallData = function(){
		  	for(var i=0; i < $scope.contentTrackerOrder.length; i++){

				var categoryArray = $scope.contentTrackerOrder[i];
				var options = {
					request : "content",
					params : "order_by=-updated&limit=4&content_type_name="
				}
		  		
		  		//augment the params to match the api correctly
		  		if(categoryArray[0] === 'design'){
		  			options.params = "order_by=-updated&limit=4&content_type_name=concept&category__tag__slug=";
		  		}else if(categoryArray[0] === 'personal-project'){
		  			options.params = "order_by=-updated&limit=4&container=";
		  		}

		  		options.params = options.params + categoryArray[0];
		  		
		  		//call Local Motors api and add object data to correct position in array
		  		callLmData(i, options, categoryArray[0]);
		  	}
		  	
		  }

		  var callLmData = function(position, options, name){

		  	var newName = name.replace("-", " ");

			callDataSvc.fetchData(options).then(
				function(data){
					$scope.outputData[position] = { "title" : newName + "s", "data" : data.objects };
					//$scope.outputData[position] = { "name" : name data };
				},
				function(status){
					return status;
				}
			);

		  }

		  //1. call local storage
		  getStorage();
		  //2. assign local storage object to point system
		  addPoints();
		  loadOrderMap();
		  //3. loop through each api call and append it to new local scoped object to display. 
		  loadOrderCallData();

		}])
		
		.filter('titlecase', function() {
		    return function(s) {
		        s = ( s === undefined || s === null ) ? '' : s;
		        return s.toString().toLowerCase().replace( /\b([a-z])/g, function(ch) {
		            return ch.toUpperCase();
		        });
		    };
		})

		.filter('htmlToPlaintext', function() {
			return function(text) {
				var newText = String(text).replace(/&nbsp;/, ' ').replace(/<[^>]+>/gm, '').trim().substring(0, 100);
				if(newText.length > 60){
					newText += " ...";
				}
				return newText;
			};
		});//app

});