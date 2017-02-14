var gulp = require('gulp');
var svg2symbol = require('./index');
var svgmin = require('gulp-svgmin');
var path = require('path');

gulp.task('svgstore', function () {
    return gulp
        .src('svg/*.svg')
        .pipe(svgmin({
            plugins: [{
                removeComments: true
            }, {
                removeXMLNS: true
            }, {
                removeTitle: true
            }, {
                transformsWithOnePath: true
            }]
        }))
        .pipe(svg2symbol())
        .pipe(gulp.dest('symbol'));
});

gulp.task('default', ['svgstore']);