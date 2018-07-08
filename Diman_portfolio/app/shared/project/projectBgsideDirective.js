(function() {
    'use strict';

    app.directive('projectBgsideDirective', function () {
        return {
            restrict: 'E',
            templateUrl: function (elem, attr) {
                return './app/shared/project/projectBgsideDirective.html';
            },
            replace: true,
            link: function (element) {
                
            },
            scope: {
                projectDescription: '=',
                side: '@'
            }
        }
    });
})();

