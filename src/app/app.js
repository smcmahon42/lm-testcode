define([
	/* Define Module File paths here */
	'require', 
	'angular', 
	'_services/_apiConfig',
	'_services/_logicSvc',
	'_services/_callDataSvc',
	'dashboard/dashboard_mod',
	'prefs/prefs_mod'
	], function () {
		'use strict';

		// Declare app main module which depends on filters, and services
		return angular.module('tool',
			[
			//Module Dependents go here
			'ui.router',
			
			//Services
			'apiConfig',
			'logicSvc',
			'callDataSvc',

			//Section Modules
			'dashboardMod',
			'prefsMod'
			])

			.controller('mainAppCtrl', ['$rootScope','$state', 
				function($rootScope, $state) {

				var checkStorage = function(){
					var prefData = null;
					prefData = localStorage.getItem("lm-prefs");

					if(prefData){
						return true;
					}else{
						return false;
					}
				}

				$rootScope.$on('$stateChangeStart', function(event, toState, fromState){

					if(toState.name === 'dashboard' && !checkStorage()){
						event.preventDefault();
						$state.go('preferences');
					}

				});

				if(checkStorage()){
					$state.go('dashboard');
				}else{
					$state.go('preferences');
				}

			}]);//app
});
