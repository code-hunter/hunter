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
            debugger;
            $scope.submitted = true;
            if(!isValid) {
                console.log("form validate failure.");
                $scope.submitted = false;
                return;
            }
            $scope.submitted = false;
            console.log("form validate success.");
        };
    }
})();