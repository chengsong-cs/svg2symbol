[![Build Status](https://travis-ci.org/sunshiner/svg2symbol.svg?branch=master)](https://travis-ci.org/sunshiner/svg2symbol)

# svg2symbol
transfrom SVG file to symbol file

# usage

recommend use with `gulp-svgmin`

```
var gulp = require('gulp');
var svg2symbol = require('gulp-svg2symbol');
var svgmin = require('gulp-svgmin');

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

```

