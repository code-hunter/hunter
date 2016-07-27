/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('Hunter.pages.admin')
      .controller('FavoritePageCtrl', FavoritePageCtrl);

  /** @ngInject */
  function FavoritePageCtrl($scope, $http, $filter, editableOptions, editableThemes) {
    
    $scope.selected = [];
    $scope.isChecked = false;
    $scope.selectedBoxes = [];
    $scope.itemsByPage = 10;

      var ctrl = this;

      $scope.selectPage = function (page) {
          debugger;
          console.log(page);
      }

      $scope.callServer = function(tableState){

          ctrl.isLoading = true;

          var pagination = tableState.pagination;

          var start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
          var number = pagination.number || 10;  // Number of entries showed per page.

          // service.getPage(start, number, tableState).then(function (result) {
          //     ctrl.displayed = result.data;
          //     tableState.pagination.numberOfPages = result.numberOfPages;//set the number of pages so the pagination can update
          //     ctrl.isLoading = false;
          // });

          debugger
          $http.get('/archives/getFavs?page='+start+'&size='+number).then(function (res) {
              debugger
              tableState.pagination.numberOfPages = 2;
              $scope.items = res.data;
              ctrl.isLoading = false;
          });
      }


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
