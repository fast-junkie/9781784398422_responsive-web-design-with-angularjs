(() => {
  angular
    .module('fj.app', [
      'ngResource',
      'ngRoute',
      'fj.app.directives',
      'fj.app.providers',
      'fj.app.services',
    ])
    .config(_config);
  _config.$inject = ['$routeProvider'];
  function _config($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'assets/views/profileTemplate.html',
        controller: 'ProfileController',
      });
  }

  angular.module('fj.app.directives', []);
  angular.module('fj.app.providers', []);
  angular.module('fj.app.services', []);
})();
