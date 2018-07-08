var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    clean = require('gulp-clean'),
    gutil = require('gulp-util'),
    liveReload = require('gulp-livereload'),
    minify = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    merge = require('merge-stream'),
    ncu = require('npm-check-updates'),
    config = require('./gulp/config');

gulp.task('update', function () {
    ncu.run({
        packageFile: 'package.json',
        silent: true,
        jsonUpgraded: true
    }).then(function (upgraded) {
        console.log('dependencies to upgrade:', upgraded);
        console.log('Use: ncu --upgradeAll & npm install');
    });
});

gulp.task('clean', function (done) {
    gulp.src(['dist'], {
            read: false
        })
        .pipe(clean())
        .on('end', function () {
            gutil.log('All cleaned!');
        });
    done();
});

gulp.task('clean-js', function (done) {
    gulp.src(config.files.js, {
            read: false
        })
        .pipe(clean());
    done();
});

gulp.task('clean-css', function (done) {
    gulp.src(config.files.css, {
            read: false
        })
        .pipe(clean());
    done();
});

gulp.task('concat-minify-js', function (done) {
    gulp.src(config.vendors.js)
        .pipe(concat('build'))
        .pipe(uglify())
        .pipe(rename({
            extname: ".min.js"
        }))
        .pipe(gulp.dest(config.dirs.js))
        .pipe(liveReload({
            auto: false
        }))
        .on('end', function () {
            gutil.log('Scripts concatenated and merged!');
        });
    done();
});

gulp.task('concat-minify-css', function (done) {
    var sassStream = gulp.src(config.components.sass)
        .pipe(sass({
            errLogToConsole: true
        }));

    var cssStream = gulp.src(config.vendors.css);
    var mergedStream = merge(sassStream, cssStream)
        .pipe(concat('build.min.css'))
        .pipe(minify({
            keepBreaks: true
        }))
        .pipe(gulp.dest(config.dirs.css))
        .on('end', function () {
            gutil.log('Styles concatenated and merged!');
        });

    done();

    return mergedStream;
});

gulp.task('compress', function (done) {
    gulp.src(config.files.images)
        .pipe(imagemin())
        .pipe(gulp.dest(config.dirs.images));
    done();
});

gulp.task('watch', function (done) {
    gulp.watch('./src/scss/**/*.scss', gulp.series('concat-minify-css'));
    gulp.watch('./assets/js/*.js', gulp.series('clean-js',
        gulp.parallel('concat-minify-js')
    ));
    gulp.watch('./app/**/*.js', gulp.series('clean-js',
        gulp.parallel('concat-minify-js')
    ));
    gulp.watch('./assets/img/**/*',
        gulp.series('compress')
    );
    done();
});

gulp.task('default', gulp.series('concat-minify-css',
    gulp.parallel('concat-minify-js', 'watch')
));