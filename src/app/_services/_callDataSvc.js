define(['angular'], function (angular) {
	'use strict';
	
	return angular.module('callDataSvc', [])
		.factory('callDataSvc', ['$http', '$q','apiCallSvc', 
			function ($http, $q, apiCallSvc) {

				var callDataSvc = {};

				callDataSvc.fetchData = function(optparams){
					var deferred = $q.defer();

					apiCallSvc.call(optparams)
					.success(function(data){
						deferred.resolve(data);
					})
					.error(function(status){
						defferred.reject(status);
					});

					return deferred.promise;
				}

				return callDataSvc;

		}]);//app
});