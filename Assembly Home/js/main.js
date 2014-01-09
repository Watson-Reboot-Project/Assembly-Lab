require.config({
  baseUrl: 'js/',
  paths: {
    angular:      '../lib/js/angular',
    bootstrap:    '../lib/js/bootstrap',
    jquery:       '../lib/js/jquery',
    less:         '../lib/js/less',
    uiBootstrap:  '../lib/js/ui-bootstrap',
    tabs:		  '../lib/js/tabs'
  },
  shim: {
    'angular': {'exports': 'angular'}
  }
});

require(['angular', 'assemblyui'], function(angular, app) {
  angular.bootstrap(document, ['assemnlyui']);
  console.log('require block, standing by');
});

console.log('main.js, standing by');
