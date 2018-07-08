(function() {
    'use strict';

    app.config(['$routeProvider', function ($routeProvider) {

        var templateUrl = 'app/components';

        $routeProvider
            .when('/', {
                templateUrl: templateUrl + '/mainPage/mainPage.html',
                
                controller: 'MainController'
            })
            
            .otherwise({
                templateUrl: templateUrl + '/mainPage/mainPage.html',
                controller: 'MainController'
            });
    }]);
})();