/**
 * Created by chaclus on 16/7/25.
 */


(function () {
    'use strict';

    angular.module('Hunter.pages.auth.login')
        .controller('LoginPageCtrl', LoginPageCtrl);

    function LoginPageCtrl($scope, $http, md5) {
        $scope.logined = false;
        $scope.submitted = false;
        $scope.user = {username: "", password: ""};

        $scope.submitForm = function (isValid) {
            $scope.submitted = true;
            if(!isValid) {
                return;
            }

            $http({
                url: '/users/login',
                method: 'POST',
                emulateJSON: true,
                data: {
                    username: $scope.user.username,
                    password: md5.createHash($scope.user.password)
                }
            }).then(function (res) {
                debugger;
                var result = res.data;
                if(result && result.code == 0) {
                    window.location.href = "#/"
                }else{
                    $scope.logined = true;
                }
                debugger
                $scope.submitted = false;
            });
        };
    }
})();