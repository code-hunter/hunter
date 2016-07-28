/**
 * Created by chaclus on 16/7/25.
 */


(function () {
    'use strict';

    angular.module('Hunter.pages.auth.reg')
        .controller('RegPageCtrl', RegPageCtrl);


    /** @ngInject */
    function RegPageCtrl($scope, $http,md5, $location) {
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
                    password: md5.createHash($scope.user.password)
                }
            }).then(function (res) {
                debugger;
                if(res.data && res.data.code == 0) {
                    window.location.href = "#/admin/profile"
                }else{
                    console.log("failed to reg user.");
                }
                $scope.submitted = false;
            });
        };
    }
})();