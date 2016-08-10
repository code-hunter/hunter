/**
 * Created by Administrator on 2016/7/27.
 */
(function () {
    'use strict';

    angular.module('Hunter.theme.components')
        .controller('PageTopCtrl', PageTopCtrl);

    /** @ngInject */
    function PageTopCtrl($scope, $http,toastr,layoutPaths) {
        $scope.imageUrl = '';
        $scope.isLogin = false;
        $scope.search_title = '';

        $http.get('/profiles/get').then(function (res) {
            if(res.data.code < 0 ){
                $scope.isLogin = false;
                $scope.imageUrl = layoutPaths.images.defaultProfileImage;
                return;
            }else {
                if(!res.data.data || !res.data.data.image_url) {
                    $scope.isLogin = true;
                    $scope.imageUrl = layoutPaths.images.defaultProfileImage;
                }else{
                    $scope.isLogin = true;
                    $scope.imageUrl = res.data.data.image_url;
                }
            }
        })

        $scope.onSearch = function () {
            console.log($scope.search_title);

            $http.get('/archives/getPage?search_title=' +$scope.search_title).then(function (res) {
                $scope.docs = res.data;
                var data = {};
                data.search_title = $scope.search_title;
                data.result = res.data;
                $scope.$emit("articleChanged", data);
            })
        }
        
        $scope.onSubject = function (subject) {
            console.log(subject);
            $http.get('/archives/getPage?search_subject=' +subject).then(function (res) {
                $scope.docs = res.data;
                var data = {};
                debugger
                data.search_subject = subject;
                data.result = res.data;
                $scope.$emit("articleChanged", data);
            })
        }

        $scope.on_signout = function () {
            $http.get('/users/logout').then(function (res) {
                if(res.data.code < 0 ){
                    toastr(res.data.msg);
                }else {
                    $scope.isLogin = false;
                }
            })
        }
    }

})();