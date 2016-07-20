/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('Hunter.pages.admin.form', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('admin.form', {
          url: '/form',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'Form Elements',
          sidebarMeta: {
            icon: 'ion-compose',
            order: 250,
          },
        })
        .state('admin.form.inputs', {
          url: '/inputs',
          templateUrl: 'app/pages/admin/form/inputs/inputs.html',
          title: 'Form Inputs',
          sidebarMeta: {
            order: 0,
          },
        })
  }
})();
