/**
 * Created by zhouyu on 2016/7/17.
 */
(function () {
    'use strict';

    angular.module('Hunter.pages.admin', [
        'ui.router',
        'ngFileUpload',

        'Hunter.pages.admin.profile',
        'Hunter.pages.admin.favorite'
        // 'Hunter.pages.admin.form',
    ])
        .config(routeConfig);
    
    function  routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/admin/profile');

        $stateProvider.state('admin',
            {
                url: '/admin',
                templateUrl:'app/pages/admin/admin.html'
            }
        )
        // $locationProvider.html5Mode(true);
    }


})();