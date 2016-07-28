/**
 * Created by chaclus on 16/7/28.
 */

(function () {
    'use strict';

    angular.module('Hunter.pages.auth.login')
        .directive('login', ['$http', login]);
    
    
    function login($http) {
        return {
            require: 'ngModel',
            link: function ($scope, $elem, $attrs, $ctrl) {
                
            }
        }
    }
})();