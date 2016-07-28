/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('Hunter.theme.components')
      .directive('adminTop', adminTop);

  /** @ngInject */
  function adminTop() {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/adminTop/adminTop.html',
      controller: 'AdminTopCtrl'
    };
  }

})();