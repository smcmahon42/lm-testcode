define(['angular'], function (angular) {
	'use strict';
	
	return angular.module('prefsMod', [])

		.config(['$stateProvider', function($stateProvider) {
			
			$stateProvider.state('preferences', {
				url: "/preferences",
				templateUrl: "app/prefs/prefs.tpl.html",
				controller: 'prefsCtrl'
			});

		}])

		.controller('prefsCtrl', ['$scope', '$state', function($scope, $state) {

			function checkStorage(){
				if(localStorage.getItem("lm-prefs")){
					$scope.user = angular.fromJson(localStorage.getItem("lm-prefs"));
				}
			}
		  
			$scope.reset = function(filterQuestion){
				if(filterQuestion){
					filterQuestion.$setPristine();
					filterQuestion.$setUntouched();
				}
			}

			$scope.update = function(data){
				localStorage.setItem("lm-prefs", angular.toJson(data));
				$state.go('dashboard');
			}

			checkStorage();
	
		}])

		.directive("myPreferences", function(){
			return {
				restrict: 'A',
				replace : true,
				templateUrl : 'app/prefs/questionForm.tpl.html'
			}
		});//app
});