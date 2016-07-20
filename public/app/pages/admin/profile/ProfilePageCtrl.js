/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('Hunter.pages.admin')
    .controller('ProfilePageCtrl', ProfilePageCtrl);

  /** @ngInject */
  function ProfilePageCtrl($scope, $http, toastr, fileReader, $filter, $uibModal) {
    $scope.submitted = false;
    $scope.profile = {username:'testname', nickname:'testnick', phone:'', email:''};
    $scope.picture = $filter('profilePicture')('Nasta');

    $scope.removePicture = function () {
      $scope.picture = $filter('appImage')('theme/no-photo.png');
      $scope.noPicture = true;
    };

    $scope.uploadPicture = function () {
      var fileInput = document.getElementById('uploadFile');
      fileInput.click();

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

    $scope.getFile = function () {
      fileReader.readAsDataUrl($scope.file, $scope)
          .then(function (result) {
            $scope.picture = result;
          });
    };
  
    $scope.submitForm = function (isValid) {
      $scope.submitted = true;
      // alert(isValid);
      // if(!isValid) {
      //   return;
      // }

      $http.post('/profiles/save', $scope.profile).success(function () {
        toastr.success('Your information has been saved successfully!');
      }).error(function () {
        toastr.error("Your information hasn't been saved!", 'Error');
      })

    };

  }
})();
