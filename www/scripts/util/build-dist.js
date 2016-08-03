'use strict';

var build = require('./build');
var glob = require('glob');
var path = require('path');
var fs = require('fs');

module.exports = buildDist;

function buildDist (config, cb) {
  glob(config.pattern, function(err, files) {
    var i = 0;

    function next () {
      (function (file) {
        console.log('Processing input: "[0;33;1m' + file + '"[0m');

        var opts = {};
        opts.codepen = !!config.codepen;
        opts.defaultCss = config.defaultCss || 'styles.css';

        if (config.externalJS) {
          opts.externalJS = config.externalJS;
        }

        build(file, opts, function(err, stream, meta) {
          if (err) {
            console.error(err);
            return;
          }

          stream.on('end', function () {
            if (i < files.length) {
              setImmediate(next);
            } else {
              cb && cb(null);
            }
          });

          var pathname = path.resolve(process.cwd(), file);
          var localpath = path.basename(pathname, meta.dirname);
          var dest = path.resolve(config.destpath, localpath);

          console.log('Writing output: "[0;32;1m' + dest + '"[0m\n');

          stream.pipe(fs.createWriteStream(dest));
        });

      }(files[i++]));
    }

    next();
  });
}
