/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('Hunter.pages.admin')
      .controller('FavoritePageCtrl', FavoritePageCtrl);

  /** @ngInject */
  function FavoritePageCtrl($scope, $http, archiveService, $filter, editableOptions, editableThemes) {
    
    $scope.selected = [];
    $scope.isChecked = false;
    $scope.selectedBoxes = [];
    $scope.smartTablePageSize = 5;
    var ctrl = $scope;
    $scope.smartTableData = [];



    $http.get('/archives/getFavs').then(function (res) {
      ctrl.docs = res.data;
    });

    var updateSelected = function(action,id,name){
         if(action == 'add' && $scope.selected.indexOf(id) == -1){
               $scope.selected.push(id);
           }
         if(action == 'remove' && $scope.selected.indexOf(id)!=-1){
               var idx = $scope.selected.indexOf(id);
               $scope.selected.splice(idx,1);
           }
     }

     $scope.updateSelection = function($event, id){
           var checkbox = $event.target;
           var action = (checkbox.checked?'add':'remove');
           updateSelected(action,id,checkbox.name);
           if(checkbox.checked){
             $scope.selectedBoxes.push(checkbox);
           }
     }

     $scope.isSelected = function(id){
           return $scope.selected.indexOf(id)>=0;
     }

    $scope.selectAll = function ($event){
      var checkbox = $event.target;
      $scope.isChecked = (checkbox.checked);
      $scope.selectedBoxes.forEach(function(item){
        item.checked = checkbox.checked;
      })
    }
    //
    // $scope.smartTableData = [
    //   {
    //     id: 1,
    //     firstName: 'Mark',
    //     lastName: 'Otto',
    //     username: '@mdo',
    //     email: 'mdo@gmail.com',
    //     age: '28'
    //   },
    //   {
    //     id: 2,
    //     firstName: 'Jacob',
    //     lastName: 'Thornton',
    //     username: '@fat',
    //     email: 'fat@yandex.ru',
    //     age: '45'
    //   },
    //   {
    //     id: 3,
    //     firstName: 'Larry',
    //     lastName: 'Bird',
    //     username: '@twitter',
    //     email: 'twitter@outlook.com',
    //     age: '18'
    //   },
    //   {
    //     id: 2,
    //     firstName: 'Jacob',
    //     lastName: 'Thornton',
    //     username: '@fat',
    //     email: 'fat@yandex.ru',
    //     age: '45'
    //   },
    //   {
    //     id: 3,
    //     firstName: 'Larry',
    //     lastName: 'Bird',
    //     username: '@twitter',
    //     email: 'twitter@outlook.com',
    //     age: '18'
    //   },
    //   {
    //     id: 2,
    //     firstName: 'Jacob',
    //     lastName: 'Thornton',
    //     username: '@fat',
    //     email: 'fat@yandex.ru',
    //     age: '45'
    //   },
    //   {
    //     id: 3,
    //     firstName: 'Larry',
    //     lastName: 'Bird',
    //     username: '@twitter',
    //     email: 'twitter@outlook.com',
    //     age: '18'
    //   }
    // ];

  }

})();
