(() => {
  angular
    .module('fj.app.directives')
    .directive('responsiveImage', _responsiveImage);
  _responsiveImage.$inject = [];
  function _responsiveImage() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        respalt: '@imagealt',
        respsrc: '@imagesrc',
      },
      template: '<img class="profile-image" ng-src="{{modifiedsrc}}" alt="{{respalt}}"/>',
      link(scope) {
        scope.$on('breakpointClassChange', (event, argument) => {
          scope.$apply(() => {
            if (angular.equals(argument.styleClass, 'large-screen')) {
              scope.modifiedsrc = `${scope.respsrc}?s=250&d=monsterid`;
            } else if (angular.equals(argument.styleClass, 'medium-screen')) {
              scope.modifiedsrc = `${scope.respsrc}?s=150&d=monsterid`;
            } else if (angular.equals(argument.styleClass, 'small-screen')) {
              scope.modifiedsrc = `${scope.respsrc}?s=80&d=monsterid`;
            }
          });
        });
      },
    };
  }

  angular
    .module('fj.app.directives')
    .directive('responsiveHeader', _responsiveHeader);
  _responsiveHeader.$inject = [];
  function _responsiveHeader() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        respText: '@targettext',
      },
      template: '<p class="header {{deviceSize}}" ng-bind="respText"></p>',
      link(scope) {
        scope.$on('breakpointClassChange', (event, argument) => {
          scope.$apply(() => {
            scope.deviceSize = argument.styleClass;
          });
        });
      },
    };
  }

  angular
    .module('fj.app.directives')
    .directive('responsiveParagraph', _responsiveParagraph);
  _responsiveParagraph.$inject = [];
  function _responsiveParagraph() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        respPara: '@targetpara',
      },
      template: '<p class="paragraph {{paragraphSize}}" ng-bind="respPara"></p>',
      link(scope) {
        scope.$on('breakpointClassChange', (event, argument) => {
          scope.$apply(() => {
            scope.paragraphSize = argument.styleClass;
          });
        });
      },
    };
  }

  angular
    .module('fj.app.directives')
    .directive('breakpoint', _breakpoint);
  _breakpoint.$inject = ['$rootScope', '$timeout', '$window'];
  function _breakpoint($rootScope, $timeout, $window) {
    return {
      restrict: 'A',
      link(scope, element, attributes) {
        const breakpointString = attributes.breakpoint;
        const customBreakpoints = angular.fromJson(breakpointString);
        scope.breakpoint = { windowSize: $window.innerWidth, styleClass: '' };
        scope.broadcastBreakEvent = () => {
          $rootScope.$broadcast('breakpointClassChange', scope.breakpoint);
        };
        scope.$watch('breakpoint.styleClass', (newStyleClass, oldStyleClass) => {
          if (newStyleClass.length > 0 && newStyleClass !== oldStyleClass) {
            $timeout(() => { scope.broadcastBreakEvent(); });
          }
        });
        scope.$watch('breakpoint.windowSize', (newSize) => {
          let className = 'small-screen';
          Object.keys(customBreakpoints).forEach((key) => {
            const breakSize = parseInt(key, 10);
            if (breakSize < newSize) {
              className = customBreakpoints[breakSize];
            }
          });
          scope.breakpoint.styleClass = className;
        });
        angular.element($window).on('resize', () => {
          scope.$apply(() => {
            scope.breakpoint.windowSize = $window.innerWidth;
          });
        });
        jQuery(() => {
          $timeout(() => {
            scope.broadcastBreakEvent();
            console.info('complete broadcast...');
          }, 1e2);
        });
      },
    };
  }

  angular
    .module('fj.app.directives')
    .directive('responsiveText', _responsiveText);
  _responsiveText.$inject = ['$log'];
  function _responsiveText($log) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        respText: '@targettext',
      },
      template: '<p class="text {{deviceSize}}" ng-bind="respText"></p>',
      link(scope) {
        scope.$on('breakpointClassChange', (event, argument) => {
          $log.log('responsiveText receiving breakpointClassChange ', argument);
          scope.$apply(() => {
            scope.deviceSize = argument.styleClass;
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
          <ol class="{{deviceSize}}">
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
        scope.$on('breakpointClassChange', (event, argument) => {
          scope.$apply(() => {
            scope.deviceSize = argument.styleClass;
          });
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
