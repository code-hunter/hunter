/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('Hunter.pages.admin.favorite', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('admin.favorite', {
          url: '/favorite', 
          title: 'Favorites',
          templateUrl : 'app/pages/admin/favorite/favorite.html',
          controller: 'FavoritePageCtrl',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 300,
          },
        });
  }

})();
