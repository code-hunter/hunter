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

      $scope.callServer = function(tableState){
          ctrl.isLoading = true;
          var pagination = tableState.pagination;
          var start = pagination.start || 0;
          var number = pagination.number || 10;
          var page = start/number;
          $http.get('/favorites/getPage?page='+page+'&size='+number).then(function (res) {
              tableState.pagination.numberOfPages = Math.ceil(res.data.data.total / number);
              $scope.items = res.data.data.docs;
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
  }

})();
