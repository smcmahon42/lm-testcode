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
			$scope.user = {};

			var checkStorage = function (){
				if(localStorage.getItem("lm-prefs") != null){
					$scope.user = angular.fromJson(localStorage.getItem("lm-prefs"));
				}
			}
		  
			$scope.reset = function(){
				$scope.user = {};
			}

			$scope.update = function(data){
				
				if( Object.keys($scope.user).length === 0 ){ 
					alert("Please answer at least one question."); 
					return false; 
				}

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