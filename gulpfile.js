var gulp = require('gulp');
var svg2symbol = require('./index');
var svgmin = require('gulp-svgmin');
var path = require('path');

gulp.task('svgstore', function () {
    return gulp
        .src('svg/*.svg')
        .pipe(svgmin({
            plugins: [{
                removeAttrs: {
                    attrs: ['opacity', 'fill']
                }
            },{
                transformsWithOnePath: {
                    width: 10,
                    height: 10
                }
            }, {
                removeXMLNS: true
            }, {
                removeTitle: true
            }]
        }))
        .pipe(svg2symbol())
        .pipe(gulp.dest('symbol'));
});

gulp.task('default', ['svgstore']);