define(['angular'], function (angular) {
	'use strict';
	
	return angular.module('logicSvc', [])
		.factory('apiCallSvc', ['$http', 'API_URL', 
			function ($http, API_URL) {

				var apiCallSvc = {};

				apiCallSvc.call = function (opt) {

					var config = {
						method: 'GET',
						url: API_URL + "?request=" + opt.request + "&params=" + encodeURIComponent(opt.params),
						data: opt,
						cache: false
					};
					
					return $http(config).
					success(function(data, status, headers, config) {
						return data;
					}).
					error(function(data, status, headers, config) {
						//error response
					});

				};

				return apiCallSvc;

		}]);//app
});