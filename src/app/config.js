require.config({
  baseUrl: 'app',
  paths: {
    angular: '../vendor/angular/angular',
    'angular-resource': '../vendor/angular-resource/angular-resource',
    'angular-sanitize': '../vendor/angular-sanitize/angular-sanitize',
    'ui-router': '../vendor/angular-ui-router/release/angular-ui-router',
    jquery: '../vendor/jquery/dist/jquery',
    requirejs: '../vendor/requirejs/require',
    'requirejs-text': '../vendor/requirejs-text/text'
  },
  shim: {
    angular: {
      deps: [
        'jquery'
      ],
      exports: 'angular'
    },
    'ui-router': {
      deps: [
        'angular'
      ]
    }
  },
  priority: [
    'angular'
  ],
  packages: [

  ]
});

window.name = "NG_DEFER_BOOTSTRAP!";

require( [
  'angular',
  'app',
  'jquery',
  'ui-router'
], function(angular, app) {
  'use strict';

  angular.element(document).ready(function() {
    angular.bootstrap(document, [app['name']]);
  });

});

