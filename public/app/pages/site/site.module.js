/**
 * Created by zhouyu on 2016/7/17.
 */
(function () {
    'use strict';

    angular.module('Hunter.pages.site', [
    ]) 
        .config(routeConfig);

    function  routeConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('site',
            {
                url: '/',
                templateUrl:'app/pages/site/index.html'
            }
        )}
})();