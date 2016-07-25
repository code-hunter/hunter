/**
 * Created by chaclus on 16/7/25.
 */


(function () {
    'use strict';
    
    angular.module('Hunter.pages.auth.reg', [])
        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('reg', {
                url: '/reg',
                title: '注册',
                templateUrl: 'app/pages/auth/reg/reg.html',
                controller: 'RegPageCtrl',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 0,
                },
            });
    }
})();


