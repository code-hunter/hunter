/**
 * Created by Administrator on 2016/7/27.
 */
(function () {
    'use strict';

    angular.module('Hunter.theme.components')
        .controller('PageTopCtrl', PageTopCtrl);

    /** @ngInject */
    function PageTopCtrl($scope, $http,layoutPaths) {
        $scope.imageUrl = '';
        $scope.isLogin = false;
        debugger
        $http.get('/profiles/get').then(function (res) {

            debugger
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
            debugger
        })
    }

})();