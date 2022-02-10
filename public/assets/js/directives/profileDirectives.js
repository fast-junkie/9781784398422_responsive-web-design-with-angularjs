(() => {
  angular
    .module('fj.app.directives')
    .directive('responsiveImage', _responsiveImage);
  _responsiveImage.$inject = ['$window'];
  function _responsiveImage($window) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        respalt: '@imagealt',
        respsrc: '@imagesrc',
      },
      template: '<img class="profile-image" ng-src="{{modifiedsrc}}" alt="{{respalt}}"/>',
      link(scope) {
        scope.width = $window.innerWidth;
        scope.$watch('width', (newWidth) => {
          if (newWidth <= 400) {
            scope.modifiedsrc = `${scope.respsrc}?s=80`;
          } else if (newWidth > 400 && newWidth <= 767) {
            scope.modifiedsrc = `${scope.respsrc}?s=150`;
          } else {
            scope.modifiedsrc = `${scope.respsrc}?s=250`;
          }
        });
        angular.element($window).on('resize', () => {
          scope.$apply(() => {
            scope.width = $window.innerWidth;
          });
        });
      },
    };
  }

  angular
    .module('fj.app.directives')
    .directive('responsiveHeader', _responsiveHeader);
  _responsiveHeader.$inject = ['$window'];
  function _responsiveHeader($window) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        respText: '@targettext',
      },
      template: '<p class="{{deviceSize}}" ng-bind="respText"></p>',
      link(scope) {
        scope.deviceSize = 'largeDevice';
        scope.width = $window.innerWidth;
        scope.$watch('width', (newWidth) => {
          if (newWidth <= 400) {
            scope.deviceSize = 'smallDevice';
          } else if (newWidth > 400 && newWidth <= 767) {
            scope.deviceSize = 'mediumDevice';
          } else {
            scope.deviceSize = 'largeDevice';
          }
        });
        angular.element($window).on('resize', () => {
          scope.$apply(() => {
            scope.width = $window.innerWidth;
          });
        });
      },
    };
  }

  angular
    .module('fj.app.directives')
    .directive('responsiveParagraph', _responsiveParagraph);
  _responsiveParagraph.$inject = ['$window'];
  function _responsiveParagraph($window) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        respPara: '@targetpara',
      },
      template: '<p class="aboutme {{paragraphSize}}" ng-bind="respPara"></p>',
      link(scope) {
        scope.paragraphSize = 'largePara';
        scope.width = $window.innerWidth;
        scope.$watch('width', (newWidth) => {
          if (newWidth <= 400) {
            scope.paragraphSize = 'smallPara';
          } else if (newWidth > 400 && newWidth <= 767) {
            scope.paragraphSize = 'mediumPara';
          } else {
            scope.paragraphSize = 'largePara';
          }
        });
        angular.element($window).on('resize', () => {
          scope.$apply(() => {
            scope.width = $window.innerWidth;
          });
        });
      },
    };
  }

  angular
    .module('fj.app.directives')
    .directive('responsiveList', _responsiveList);
  _responsiveList.$inject = ['$window'];
  function _responsiveList($window) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        itemList: '=targetlist',
      },
      template: `
        <div class="item-list-container">
          <ol>
            <li ng-class="{smallText:isMorePresent}" ng-repeat="item in itemDisplayList" ng-bind="item"></li>
          </ol>
          <button class="show-more" ng-show="isMorePresent" ng-click="showMore(itemDisplayList)"><span>More...</span></button>
        </div>`,
      link(scope) {
        scope.isMorePresent = false;
        scope.$watch('itemList', (newItemList) => {
          scope.itemList = newItemList;
          scope.height = $window.innerHeight;
          scope.itemDisplayList = scope.itemList;
        }, true);
        scope.$watch('height', (newHeight) => {
          const listLength = angular.isDefined(scope.itemList) ? scope.itemList.length : 0;
          if (newHeight < 400 && listLength > 2) {
            scope.isMorePresent = true;
            scope.itemDisplayList = scope.itemList.slice(0, 2);
          } else if (newHeight >= 400 && newHeight < 700 && listLength > 3) {
            scope.isMorePresent = true;
            scope.itemDisplayList = scope.itemList.slice(0, 3);
          } else {
            scope.isMorePresent = false;
            scope.itemDisplayList = scope.itemList;
          }
        });
        angular.element($window).on('resize', () => {
          scope.$apply(() => {
            scope.height = $window.innerHeight;
          });
        });
        scope.showMore = () => {
          scope.itemDisplayList = scope.itemList;
          scope.isMorePresent = false;
        };
      },
    };
  }
})();
