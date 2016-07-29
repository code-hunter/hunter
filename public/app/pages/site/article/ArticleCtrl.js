
(function () {
    'use strict';

    angular.module('Hunter.pages.site')
        .controller('ArticleCtrl', ArticleCtrl);

    /** @ngInject */
    function ArticleCtrl($scope, $http, toastr) {

        $scope.page = 1;
        $scope.size = 10;
        $scope.search_title = '';
        $scope.search_subject = '';

        $http.get('/archives/getPage').then(function (res) {
            $scope.docs = res.data
        });

        $scope.on_prev = function () {
            if(this.page == 1) {
                alert('first page.');
                return;
            }else {
                this.page--;
            }

            this.$http.get('/archives/getPage?page=' +this.page+'&size=10&search_title=' +this.search_title+'&search_subject='+this.search_subject).then(function (res) {
                $scope.docs = res.data;
            })
        };

        $scope.on_next = function () {
            this.page++;
            $http.get('/archives/getPage?page=' +this.page+'&size=10&search_title=' +this.search_title+'&search_subject='+this.search_subject).then(function (res) {

                //todo : fixed me to max page size
                if((res.data).length <= 0) {
                    alert('last page.');
                    this.page--;
                    return;
                }else {
                    $scope.docs = res.data;
                }
            })
        };

        $scope.on_approve = function (doc_id) {
            if(!doc_id){
                window.location.href = '#/login';
            }

            $http({
                url: '/approves/save',
                method: 'POST',
                emulateJSON: true,
                data: {
                    archive_id: doc_id
                }
            }).then(function (res) {
                if (res.data.code < 0) {
                    toastr.error(res.data.msg);
                }else{
                    toastr.success(res.data.msg);
                }
            });
        };

        $scope.on_bookmark = function (doc_id) {
            if(!doc_id){
                window.location.href = '#/login';
            }

            $http({
                url: '/favorites/save',
                method: 'POST',
                emulateJSON: true,
                data: {
                    archive_id: doc_id
                }
            }).then(function (res) {
                if (res.data.code < 0) {
                    toastr.error(res.data.msg);
                }else{
                    toastr.success(res.data.msg);
                }
            });
        };
    }
})();