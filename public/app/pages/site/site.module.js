/**
 * Created by zhouyu on 2016/7/17.
 */
(function () {
    'use strict';

    angular.module('Hunter.pages.site', [
        'ui.router'
    ])
        .config(routeConfig);

    function  routeConfig($stateProvider,$urlRouterProvider,  $locationProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('site',
            {
                url: '/',
                templateUrl:'app/pages/site/index.html'
            }
        )
        // $locationProvider.html5Mode(true);
    }
})();