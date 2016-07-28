/**
 * Created by chaclus on 16/7/25.
 */

(function () {
    'use strict';
    
    angular.module('Hunter.pages.auth.reg')
        .directive("pwdConfirm",pwdConfirm)
        .directive("check",['$http',check]);


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
    function check($http) {
        return {
            require: 'ngModel',
            link: function ($scope, $elem, $attrs, $ctrl) {
                $elem.on("blur", function () {
                    $scope.$apply(function () {
                        $http.get("/users/check?key=" + $elem.val()).then(function (res) {
                            var isHave = false;
                            if(res.data.status == "success") {
                                isHave = res.data.content;
                            }
                            $ctrl.$setValidity("isHave", !isHave);
                        });
                    });
                });
            }
        };
    }

})();