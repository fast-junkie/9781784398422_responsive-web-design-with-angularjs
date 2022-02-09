(() => {
  angular
    .module('fj.app', [
      'ngResource',
      'ngRoute',
      'fj.app.providers',
      'fj.app.services',
    ])
    .config(_config);
  _config.$inject = ['$routeProvider', 'deviceTypeProvider'];
  function _config($routeProvider, deviceTypeProvider) {
    deviceTypeProvider = deviceTypeProvider.$get();
    const deviceType = deviceTypeProvider.getDeviceType();
    $routeProvider
      .when('/', {
        templateUrl: `assets/views/${deviceType}/profileTemplate.html`,
        controller: 'ProfileController',
        styleType: deviceType,
      });
  }

  angular.module('fj.app.providers', []);
  angular.module('fj.app.services', []);
})();
