/**
 * Created by chaclus on 16/7/25.
 */


(function () {
    'use strict';
    
    angular.module('Hunter.pages.auth.login', [])
        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                title: '登录',
                templateUrl: 'app/pages/auth/login/login.html',
                controller: 'LoginPageCtrl',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 0,
                },
            });
    }
})();


