var gulp = require('gulp');
var svg2symbol = require('./index');
var svgmin = require('gulp-svgmin');
var path = require('path');

gulp.task('svgstore', function () {
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

gulp.task('default', ['svgstore']);