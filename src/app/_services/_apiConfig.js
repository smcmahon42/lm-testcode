define(['angular'], function (angular) {
	'use strict';
	
	return angular.module('apiConfig', [])
		.constant('API_URL', "http://apitest.dev/api.php");
});