/**
 * Created by Administrator on 2016/7/27.
 */
(function () {
    'use strict';

    angular.module('Hunter.theme.components')
        .controller('AdminTopCtrl', AdminTopCtrl);

    /** @ngInject */
    function AdminTopCtrl($scope, $http,layoutPaths) {
        
        $scope.imageUrl = '';

        $scope.$on('imageChanged', function (event, msg) {
            $scope.imageUrl = msg;
        });
        
        $http.get('/profiles/get').then(function (res) {
            if(res.data.code < 0 ){
                $scope.isLogin = false;
                $scope.imageUrl = layoutPaths.images.defaultProfileImage;
                window.location.href = '#/login';
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

        $scope.on_signout = function () {
            $http.get('/users/logout').then(function (res) {
                if(res.data.code < 0 ){
                    toastr(res.data.msg);
                }else {
                    $scope.isLogin = false;
                    window.location.href = "#/";
                }
            })
        }
    }

})();