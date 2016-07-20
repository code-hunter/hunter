/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('Hunter.pages.admin.profile', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('admin.profile', {
          url: '/profile',
          title: 'Profile',
          templateUrl: 'app/pages/admin/profile/profile.html',
          controller: 'ProfilePageCtrl',
            sidebarMeta: {
                icon: 'ion-android-home',
                order: 0,
            },
        });
  }

})();
