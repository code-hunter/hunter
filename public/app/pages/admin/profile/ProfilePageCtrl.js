/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('Hunter.pages.admin')
    .controller('ProfilePageCtrl', ProfilePageCtrl);

  /** @ngInject */
  function ProfilePageCtrl($scope, $http, toastr,Upload, fileReader, $filter, $uibModal) {
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
  
    $scope.submitForm = function (isValid) {
      $scope.submitted = true;
      alert(isValid);
      if(!isValid) {
        return;
      }

      Upload.upload({
        url: '/profiles/save',
        data:{file: $scope.file,
              profile: $scope.profile,
              username : $scope.profile.username}
      }).then(function(res){
        toastr.success('Your information has been saved successfully!');
      });

      // $http({
      //   method: 'POST',
      //   url: '/profiles/save',
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   },
      //   data: {
      //     email: $scope.profile.email,
      //     upload: $scope.file
      //   },
      //   transformRequest: function (data, headersGetter) {
      //     var formData = new FormData();
      //     angular.forEach(data, function (value, key) {
      //       formData.append(key, value);
      //     });
      //
      //     var headers = headersGetter();
      //     delete headers['Content-Type'];
      //
      //     return formData;
      //   }
      // })
      //     .success(function (data) {
      //       toastr.success('Your information has been saved successfully!');
      //     })
      //     .error(function (data, status) {
      //       toastr.error("Your information hasn't been saved!", 'Error');
      //     });

      // $http.post('/profiles/save', $scope.file).success(function () {
      //   toastr.success('Your information has been saved successfully!');
      // }).error(function () {
      //   toastr.error("Your information hasn't been saved!", 'Error');
      // })

    };

  }
})();
