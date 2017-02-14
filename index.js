var cheerio = require('cheerio')
var path = require('path')
var gutil = require('gulp-util')
var Stream = require('stream')

module.exports = function (config) {

    config = config || {}

    var stream = new Stream.Transform({ objectMode: true })

    stream._transform = function transform(file, encoding, cb) {
        var $ = cheerio.load('<symbol></symbol>', { xmlMode: true })
        var fileName

        if (file.isStream()) {
            return cb(new gutil.PluginError('gulp-svg2symbol', 'Streams are not supported!'))
        }

        if (file.isNull()) return cb()

        var $svg = cheerio.load(file.contents.toString(), { xmlMode: true })('svg')

        if ($svg.length === 0) return cb()

        var idAttr = path.basename(file.relative, path.extname(file.relative))
        var viewBoxAttr = $svg.attr('viewBox')
        var $symbol = $('symbol')

        if (!fileName) {
            fileName = path.basename(file.path, '.svg')

            if (fileName === '.' || !fileName) {
                fileName = 'svg2symbol.symbol'
            } else {
                fileName += '.symbol'
            }
        }

        $symbol.attr('id', 'icon-' + idAttr)
        if (viewBoxAttr) {
            $symbol.attr('viewBox', viewBoxAttr)
        }

        var attrs = $svg[0].attribs

        $symbol.append($svg.contents())
        var file = new gutil.File({ path: fileName, contents: new Buffer($.xml()) })
        this.push(file)
        // file.contents = new Buffer($.xml());
        cb()
    }

    return stream;
}