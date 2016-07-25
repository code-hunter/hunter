/**
 * Created by chaclus on 16/7/25.
 */

(function () {
    'use strict';

    angular.module('Hunter.pages.auth.reg')
        .directive("matchModel",matchModel);

    /** @ngInject */
    function matchModel() {
        return{
            restrict: 'ngModel',
            link: function (scope, element, attributes, ngModel){
                console.log("===========");
                var valCache = null;
                scope.$watch(attributes["matchModel"], function (newVal, oldVal) {
                    valCache = newVal;

                    validate(ngModel.$viewValue);
                });

                var validate = function (value) {
                    ngModel.$setValidity("match", value === valCache);
                    return value === valCache ? value : undefined;
                };

                ngModel.$parsers.unshift(validate);

            }
        }
    }


})();