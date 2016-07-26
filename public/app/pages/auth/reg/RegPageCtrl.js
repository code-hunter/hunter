/**
 * Created by chaclus on 16/7/25.
 */


(function () {
    'use strict';

    angular.module('Hunter.pages.auth.reg')
        .controller('RegPageCtrl', RegPageCtrl);


    /** @ngInject */
    function RegPageCtrl($scope, $http) {
        $scope.submitted = false;
        $scope.user = {username: "", password: "", email: "",passwordRepeat:""};

        $scope.submitForm = function (isValid) {
            $scope.submitted = true;
            if(!isValid) {
                return;
            }
            $http({
                url: '/users/register',
                method: 'POST',
                emulateJSON: true,
                data: {
                    username: $scope.user.username,
                    email: $scope.user.email,
                    password: $scope.user.password
                }
            }).then(function (res) {
                debugger;
            });
        };
    }
})();