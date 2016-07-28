/**
 * Created by Administrator on 2016/7/27.
 */
(function () {
    'use strict';

    angular.module('Hunter.theme.components')
        .controller('PageTopCtrl', PageTopCtrl);

    /** @ngInject */
    function PageTopCtrl($scope, $http) {
        
        $scope.imageUrl = '';
        
        $http.get('/profiles/get').then(function (res) {

            if(res.data.code < 0 ){
                return;
            }
            $scope.imageUrl = res.data.data.image_url;
        })
    }

})();