/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('Hunter.pages.admin')
      .controller('FavoritePageCtrl', FavoritePageCtrl);

  /** @ngInject */
  function FavoritePageCtrl($scope, $http, $filter, toastr, editableOptions, editableThemes) {
    
    $scope.selected = [];
    $scope.isChecked = false;
    $scope.selectedBoxes = [];
    $scope.itemsByPage = 10;
      var tableStateRef;
      var ctrl = this;

      $scope.callServer = function(tableState){
          ctrl.isLoading = true;
          tableStateRef = tableState;
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

      $scope.onDelete = function (tableState) {
          var ids = '';
          if($scope.selected.length > 0){
              ids = $scope.selected.join(',');
          }else{
              toastr.error('请先选择要删除的项');
              return;
          }

          $http({
              url: '/favorites/delete',
              method: 'POST',
              emulateJSON: true,
              data: {
                  ids: ids
              }
          }).then(function (res) {
              debugger
              if(res.data.code < 0){
                  toastr.error(res.data.msg);
              }else{
                  toastr.success(res.data.msg);
                  $scope.callServer(tableStateRef);
              }
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

        $scope.items.forEach(function(item){
            if(checkbox.checked){
                $scope.selected.push(item.id);
            }else {
                $scope.selected.splice(item.id, 1);
            }
        })

        debugger;
    }
  }

})();
