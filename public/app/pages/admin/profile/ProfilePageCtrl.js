/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('Hunter.pages.admin')
    .controller('ProfilePageCtrl', ProfilePageCtrl);

  /** @ngInject */
  function ProfilePageCtrl($scope, $http, toastr,Upload,md5, fileReader, $filter, $uibModal) {
    $scope.submitted = false;
    $scope.submittedPass = false;
    $scope.profile = {username:'', nickname:'', phone:'', email:'', pass:"", repass:''};
    $scope.picture = $filter('profilePicture')('nohead');

    $http.get('/profiles/get').then(function (res) {
      debugger;
      if(res.data.code < 0 ){
        window.location.href= "#/";
      }else {
        if(!res.data.data) {
          window.location.href= "#/";
        }else{
          $scope.profile = res.data.data;
          if($scope.profile.image_url){
            $scope.picture = $scope.profile.image_url;
          }
        }
      }
    })

    $scope.removePicture = function () {
      $scope.picture = $filter('appImage')('theme/no-photo.png');
      $scope.noPicture = true;
    };

    $scope.uploadPicture = function () {
      var fileInput = document.getElementById('uploadFile');
      fileInput.click();
    };

    $scope.onFileSelect = function ($files) {
        alert('select');
    };

    $scope.showModal = function (item) {
      $uibModal.open({
        animation: false,
        controller: 'ProfileModalCtrl',
        templateUrl: 'app/pages/profile/profileModal.html'
      }).result.then(function (link) {
        item.href = link;
      });
    };

    $scope.getFile = function (item) {
      $scope.file = item;
      fileReader.readAsDataUrl($scope.file, $scope)
          .then(function (result) {
            $scope.picture = result;
          });
    };
  
    $scope.onSubmitProfile = function (isValid) {
      debugger
      $scope.submitted = true;
      if(!isValid) {
        return;
      }
      
      Upload.upload({
        url: '/profiles/save',
        data:{file: $scope.file,
              profile: $scope.profile}
      }).then(function(res){
        debugger
        $scope.submitted = false;
        if(res.data.code < 0){
          toastr.error(res.data.msg);
        }else{
          toastr.success(res.data.msg);

          if($scope.file){
            $scope.$emit("imageChanged", res.data.data.image_url);
          }
        }
      });
    };

    $scope.onSubmitPassword = function (isValid) {

      debugger
      $scope.submittedPass = true;
      if(!isValid) {
        return;
      }
      
      $http({
        url: '/profiles/modPass',
        method: 'POST',
        emulateJSON: true,
        data: {
          password: md5.createHash($scope.profile.pass)
        }
      }).then(function (res) {
        $scope.submittedPass = false;
        if(res.data.code < 0){
          toastr.error(res.data.msg);
        }else{
          toastr.success(res.data.msg);
        }
      });
    }
  }
})();
