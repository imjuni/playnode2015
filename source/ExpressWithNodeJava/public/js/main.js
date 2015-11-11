(function () {
  'use strict';

  function MainController ($scope, $http) {
    var vm = this;

    vm.model = {};
    vm.model.text = '';

    vm.onClickSimple = function onClickSimple () {
      console.log('onClickSimple');

      $http({
        method: 'GET',
        url: '/simple',
        timeout: 60 * 1000
      }).then(function (resp) {
        console.log(resp.data);

        try {
          vm.model.text = JSON.stringify(resp.data) + '\n';
        } catch (err) {
          vm.model.text = err.message + '\n';
        }
      });
    };

    vm.onClickLongRunning = function onClickLongRunning () {
      console.log('onClickLongRunning');

      $http({
        method: 'GET',
        url: '/long',
        timeout: 60 * 1000
      }).then(function (resp) {
        console.log(resp.data);

        try {
          vm.model.text = JSON.stringify(resp.data) + '\n';
        } catch (err) {
          vm.model.text = err.message + '\n';
        }
      });
    };

    vm.onClickLongRunningAsync = function onClickLongRunningAsync () {
      console.log('onClickLongRunningAsync');

      $http({
        method: 'GET',
        url: '/long_async',
        timeout: 60 * 1000
      }).then(function (resp) {
        console.log(resp.data);

        try {
          vm.model.text = JSON.stringify(resp.data) + '\n';
        } catch (err) {
          vm.model.text = err.message + '\n';
        }
      });
    };
  }

  angular.module('javatest', [])
    .controller('MainController', [ '$scope', '$http', MainController ]);
})();
