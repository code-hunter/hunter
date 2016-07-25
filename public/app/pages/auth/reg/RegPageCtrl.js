/**
 * Created by chaclus on 16/7/25.
 */


(function () {
    'use strict';

    angular.module('Hunter.pages.auth.reg')
        .controller('RegPageCtrl', RegPageCtrl);

    function RegPageCtrl($scope) {
        $scope.submitted = false;
        $scope.user = {username: "", password: "", email: "",passwordRepeat:""};

        $scope.submitForm = function (isValid) {
            $scope.submitted = true;
            if(!isValid) {
                return;
            }
        };
    }
})();