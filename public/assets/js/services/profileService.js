(() => {
  angular
    .module('fj.app.services')
    .service('profileService', _profileService);
  _profileService.$inject = ['$resource'];
  function _profileService($resource) {
    return {
      getPersonalDetail() {
        return $resource('assets/data/personalDetail.json');
      },
      getProfessionalDetail() {
        return $resource('assets/data/professionalDetail.json');
      },
    };
  }
})();
