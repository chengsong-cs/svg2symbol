[![Build Status](https://travis-ci.org/sunshiner/svg2symbol.svg?branch=master)](https://travis-ci.org/sunshiner/svg2symbol)

# svg2symbol
transfrom SVG file to symbol file

# usage

look at gulpfile.js

```
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

```

