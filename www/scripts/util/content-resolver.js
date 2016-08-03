'use strict';

module.exports = resolve;

var fs = require('fs');
var path = require('path');

function resolve (htmlPath, options, cb) {
  var htmlname = path.resolve(htmlPath);
  var dirname = path.dirname(htmlname);
  var basename = path.basename(htmlname, path.extname(htmlname));
  var jsname = path.resolve(dirname, basename + '.js');
  var cssname = path.resolve(dirname, basename + '.css');

  fs.access(cssname, fs.F_OK, function (err) {
    if (err) {
      cssname = options.defaultCss
    }
    doResolve();
  });

  function doResolve () {
    var data = {
      htmlname: htmlname,
      dirname: dirname,
      basename: basename,
      jsname: jsname,
      cssname: cssname,
      cssrel: path.basename(cssname, dirname),
      jsrel: path.basename(jsname, dirname)
    };

    var streams = {
      html: fs.createReadStream(htmlname),
      js: fs.createReadStream(jsname),
      css: fs.createReadStream(cssname)
    };

    var completeCnt = 0;
    function complete () {
      completeCnt++;
      if (completeCnt === Object.keys(streams).length) {
        cb(null, streams, data);
      }
    }

    for (var sstream in streams) {
      (function (stream) {
        streams[stream].on('error', function () {
          streams[stream] = null;
          complete();
        }).on('open', complete);
      }(sstream));
    }
  }
}
