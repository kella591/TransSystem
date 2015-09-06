(function(){
	'use strict';
	var haiyunDirectives = angular.module('haiyunDirectives', []);

	haiyunDirectives.directive('formatDate',['$filter', function($filter){
		  return {
			 require: 'ngModel',
			    link: function(scope, elem, attr, ngModelCtrl) {
			      ngModelCtrl.$formatters.push(function(modelValue){
			        if(modelValue) {
			          return new Date(modelValue);
			        }
			      });

			      ngModelCtrl.$parsers.push(function(value){
			        if(value) {
			          return $filter('date')(value, 'yyyy-MM-dd');
			        }
			      });
			    }
			  };
	}]);
})();