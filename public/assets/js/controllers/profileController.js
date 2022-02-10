(() => {
  angular
    .module('fj.app')
    .controller('ProfileController', _profileController);
  _profileController.$inject = ['$scope', '$interval', 'profileService'];
  function _profileController($scope, $interval, profileService) {
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
    $scope.loaded = false;

    $scope.getDetail = () => {
      $scope.selected = !$scope.selected;
    };

    const interval = $interval(init, 1e3);
    function init() {
      if (document.readyState === 'complete') {
        $interval.cancel(interval);
        $scope.loaded = !$scope.loaded;
        console.info('complete...');
      }
    }
  }
})();
