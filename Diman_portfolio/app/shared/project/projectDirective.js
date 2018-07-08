(function() {
    'use strict';

    app.directive('projectDirective', function () {

        return {
            restrict: 'E',
            templateUrl: function (elem, attr) {
                var baseUrl = '/portfolio/app/shared/project/';
                var templates = {
                    data: 'projectDatasideDirective.html',
                    bg: 'projectBgsideDirective.html'
                };

               
                if (attr.side === "data") {
                    
                } else if (attr.side === "bg") {
                   
                }

                
                return './app/shared/project/projectDatasideDirective.html';

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
