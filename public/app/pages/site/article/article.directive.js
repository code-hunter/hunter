/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('Hunter.pages.site')
      .directive('article', article);

  /** @ngInject */
  function article() {
    return {
      restrict: 'E',
      templateUrl: 'app/pages/site/article/article.html',
      controller: 'ArticleCtrl',
    };
  }

})();