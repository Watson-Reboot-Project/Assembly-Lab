angular.module('assemblyui', ['ui.bootstrap']);
	var tabsstuff = function($scope){ 
		
		$scope.tabs = [
		               {title:"Editor", content:'stuff'},
		               {title:"Memory", content:'and such'}
		              ];
		
		$scope.error = function() {
			document.write('<h1>you broke it.</h1>');
		};
	};
	