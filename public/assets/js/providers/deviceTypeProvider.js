(() => {
  angular
    .module('fj.app.providers')
    .provider('deviceType', _deviceType);
  _deviceType.$inject = ['$windowProvider'];
  function _deviceType($windowProvider) {
    const $window = $windowProvider.$get();
    this.$get = function _get() {
      return {
        getDeviceType() {
          let deviceType = 'desktop';
          const userAgentString = $window.navigator.userAgent
            || $window.navigator.vendor
            || $window.opera;
          const width = $window.outerWidth;
          const isSmart = (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(userAgentString);
          if (isSmart && width >= 768) {
            deviceType = 'tablet';
          } else if (isSmart && width <= 767) {
            deviceType = 'mobile';
          }
          return deviceType;
        },
      };
    };
  }
})();
