var cheerio = require('cheerio')
var path = require('path')
var gutil = require('gulp-util')
var Stream = require('stream')

module.exports = function (config) {

    config = config || {}

    var stream = new Stream.Transform({ objectMode: true })

    stream._transform = function transform(file, encoding, cb) {
        var $ = cheerio.load('<symbol></symbol>', { xmlMode: true })
        var fileNameNoExt = path.basename(file.relative, path.extname(file.relative))
        var fileName
        var $svg = cheerio.load(file.contents.toString(), { xmlMode: true })('svg')
        var iconPath = $svg.find('path').attr('d')
        var viewBoxAttr = $svg.attr('viewBox')
        var $symbol = $('symbol')
        var pathReg = /[Z|z]/g
        var nameReg = /[A-Z|a-z|0-9]-o$/g


        if (file.isStream()) {
            return cb(new gutil.PluginError('gulp-svg2symbol', 'Streams are not supported!'))
        }
        if (file.isNull() || $svg.length === 0) {
            return cb()
        }

        if (fileNameNoExt === '.' || !fileNameNoExt) {
            fileName = 'svg2symbol.symbol'
        } else {
            fileName = fileNameNoExt + '.symbol'
        }

        if (pathReg.test(iconPath) && !nameReg.test(fileNameNoExt)) {
            $symbol.attr('type', 'fill')
        } else {
            $symbol.attr('type', 'stroke')
        }

        $symbol.attr('id', 'icon-' + fileNameNoExt)

        if (viewBoxAttr) {
            $symbol.attr('viewBox', viewBoxAttr)
        }

        $symbol.append($svg.contents())

        var file = new gutil.File({ path: fileName, contents: new Buffer($.xml()) })

        this.push(file)
        cb()
    }

    return stream;
}