(function () {
    'use strict';

    app.directive('formField', function () {

        return {
            restrict: 'E',
            require: '^form',
            templateUrl: './app/shared/formField/formField.html',
            replace: true,
            transclude: true,
            scope: {
                label: '@',
                fieldName: '@'
            },
            link: function (scope, element, attrs, ctrl) {
                var formInput = element.find("input");
                var formField = (formInput.length > 0) ? formInput : element.find("textarea");
                scope.field = ctrl[formField.attr('name')];

                scope.showErrorMessage = function() {
                    return angular.isDefined(scope.field)
                        && scope.field.$invalid
                        && (!scope.field.$isEmpty(scope.field.$modelValue) || scope.field.$dirty || ctrl.$submitted);
                };

              
                formField.bind('focus', function () {
                    formField.addClass('active');
                }).bind('blur', function () {
                    if (!formField.val()) {
                        formField.removeClass('active');
                    }
                });
            }
        };

    });

})();