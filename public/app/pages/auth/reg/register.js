/**
 * Created by chaclus on 16/7/25.
 */

(function () {
    'use strict';
    
    angular.module('Hunter.pages.auth.reg')
        .directive("pwdConfirm",pwdConfirm);

    /** @ngInject */
    function pwdConfirm() {
        return {
            require: 'ngModel',
            link: function($scope, $elem, $attrs, $ctrl) {
                var key = $attrs.pwdConfirm;
                $elem.add("#" + key).on('keyup', function () {
                    $scope.$apply(function () {
                        $ctrl.$setValidity("isMatch", $elem.val() == $scope.myForm[key].$viewValue);
                    });
                });

            }
        };
    }

    /** @ngInject */
    function check() {
        return {
            require: 'ngModel',
            link: function ($scope, $elem, $attrs, $ctrl, $http) {
                $.elem.on("blur", function () {
                    $scope.$apply(function () {
                        $http.get("/user/check?key=" + $elem.val()).then(function (res) {
                            debugger;
                        });

                        $ctrl.$setValidity("isMatch", $elem.val() == $scope.myForm[key].$viewValue);
                    });
                });
            }
        };
    }

})();