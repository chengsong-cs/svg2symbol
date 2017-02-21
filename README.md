[![Build Status](https://travis-ci.org/sunshiner/svg2symbol.svg?branch=master)](https://travis-ci.org/sunshiner/svg2symbol) [![npm](https://img.shields.io/npm/v/gulp-svg2symbol.svg)](https://www.npmjs.com/package/gulp-svg2symbol)

# svg2symbol
transfrom SVG file to symbol file

# usage

recommend use with `gulp-svgmin` to optimize svg

***notice:*** if you want to know why i write a lot of config code for svgmin plugin, please look at this [issue](https://github.com/svg/svgo/issues/665)

```
var gulp = require('gulp');
var svg2symbol = require('./index');
var svgmin = require('gulp-svgmin');
var path = require('path');

gulp.task('svg', function () {
    return gulp
        .src('./test/*.svg')
        .pipe(svgmin({
            full: true,
            plugins: [
                "removeDoctype",
                "removeXMLProcInst",
                "removeComments",
                "removeMetadata",
                {
                    removeXMLNS: true
                },
                "removeEditorsNSData",
                "cleanupAttrs",
                "minifyStyles",
                "convertStyleToAttrs",
                "cleanupIDs",
                {
                    removeRasterImages: true
                },
                "removeUselessDefs",
                "cleanupNumericValues",
                "cleanupListOfValues",
                "convertColors",
                "removeUnknownsAndDefaults",
                "removeNonInheritableGroupAttrs",
                "removeUselessStrokeAndFill",
                "cleanupEnableBackground",
                "removeHiddenElems",
                "removeEmptyText",
                "convertShapeToPath",
                "moveElemsAttrsToGroup",
                "moveGroupAttrsToElems",
                "collapseGroups",
                "convertPathData",
                "convertTransform",
                "removeEmptyAttrs",
                "removeEmptyContainers",
                "mergePaths",
                "removeUnusedNS",
                {
                    sortAttrs: true
                },
                {
                    removeTitle: true
                },
                "removeDesc",
                "removeDimensions",
                // "removeElementsByAttr",
                // "addClassesToSVGElement",
                {
                    removeStyleElement: true
                },
                // "addAttributesToSVGElement",
                {
                    transformsWithOnePath: {
                        width: 24,
                        height: 24
                    }
                },
                {
                    removeAttrs: ['style', 'fill', 'opacity']
                }
            ]
        }))
        .pipe(svg2symbol())
        .pipe(gulp.dest('res'));
});

gulp.task('default', ['svg']);

```

