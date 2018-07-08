"use strict";

module.exports = {
    dirs: {
        build: '.dist',
        js: 'dist/js',
        css: 'dist/css',
        images: 'dist/img/projects_img'
    },
    files: {
        js: 'dist/js/*.js',
        css: 'dist/css/*.css',
        images: 'assets/img/projects_img/*'
    },
    components: {
        sass: 'src/scss/main.scss',
        js: 'assets/js/*.js'
    },
    vendors: {
        js: [
            "assets/libs/modernizr-custom.js",
            "bower_components/jquery/dist/jquery.js",
            "bower_components/wow/dist/wow.js",
            "bower_components/vide/dist/jquery.vide.js",
            "bower_components/angular/angular.js",
            "bower_components/angular-route/angular-route.js",
            "bower_components/angular-resource/angular-resource.js",
            "bower_components/angular-messages/angular-messages.js",
            "app/**/*.js",
            "assets/js/main.js"
        ],
        css: [
            "bower_components/flexboxgrid/dist/flexboxgrid.css",
            "bower_components/wow/css/libs/animate.css",
            "bower_components/font-awesome/css/font-awesome.css",
            "assets/css/style.css"
        ]
    }
};

