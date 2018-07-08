(function () {
    'use strict';

    app.directive('skillDirective', function () {

        return {
            restrict: 'E',
            templateUrl: './app/shared/skill/skillDirective.html',
            replace: true,
            scope: {
                inputLabel: '@',
                rwdClass: '@',
                inputClass: '@',
                skillHeader: '@',
                skillIcon: '@',
                skillSubHeader: '@',
                skillText: '@'
            }
        }
    });
})();


