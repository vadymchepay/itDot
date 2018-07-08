(function () {
    'use strict';

    app.directive('timelineDirective', function () {

        return {
            restrict: 'E',
            templateUrl: './app/shared/timeline/timelineDirective.html',
            replace: true,
            scope: {
                imgClass: '@',
                imgSrc: '@',
                imgAlt: '@',
                title: '@',
                url: '@',
                position: '@',
                responsibilities: '@'
            }
        }
    });
})();


