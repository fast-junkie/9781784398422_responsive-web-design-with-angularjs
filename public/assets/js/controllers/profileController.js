(() => {
  angular
    .module('fj.app')
    .controller('ProfileController', _profileController);
  _profileController.$inject = ['$scope', '$interval', '$rootScope', '$route', '$log', 'profileService'];
  function _profileController($scope, $interval, $rootScope, $route, $log, profileService) {
    $scope.professional = {};
    const professionalDetail = profileService.getProfessionalDetail();
    professionalDetail.get((jsonData) => {
      $scope.professional = jsonData;
    });

    $scope.personal = {};
    const personalDetail = profileService.getPersonalDetail();
    personalDetail.get((jsonData) => {
      $scope.personal = jsonData;
    });

    $rootScope.styleType = $route.current.styleType;
    $scope.loaded = false;
    $scope.selected = true;
    $scope.bookTitle = 'Book Title';

    $scope.getDetail = () => {
      $scope.selected = !$scope.selected;
    };

    const interval = $interval(init, 1e3);

    function init() {
      if (document.readyState === 'complete') {
        console.info('complete...');
        $interval.cancel(interval);
        $scope.loaded = !$scope.loaded;
      }
    }
  }
})();
