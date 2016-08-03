'use strict';

var wrapHtml = require('./wrap-html');
var resolve = require('./content-resolver');
var toStr = require('stream-to-string');
var str = require('string-to-stream');
var codepenInjector = require('./codepen-injector');
var metaTagInjector = require('./meta-tag-injector');
var metadata = require('../../metadata');

module.exports = build;

function build (htmlpath, opts, cb) {
  opts = opts || {};

  resolve(htmlpath, {defaultCss: opts.defaultCss || 'index.css'}, function (err, streams, meta) {
    if (err) {
      return cb(err);
    }

    var content = {};
    var cnt = 0;
    var total = 0;

    var streamNames = ['html', 'css', 'js'];
    for (var i = 0; i < streamNames.length; i++) {
      if (streams[streamNames[i]]) {
        (function(stream) {
          total++;
          toStr(streams[stream], function (err, data) {
            if (err) {
              return cb(err);
            }
            content[stream]= data;
            complete(stream, data);
          });

        }(streamNames[i]));
      }
    }

    function complete (name, data) {
      if (++cnt === total) {

        var html = content.html ? str(content.html) : null;
        var js = content.js ? str(content.js) : null;
        //var css = content.css ? str(content.css) : null;

        var out = wrapHtml(html)({
          entry: opts.entry || 'bundle.js',
          title: opts.title || meta.title,
          js: js,
          css: meta.csspath
        })

        if (opts.codepen) {
          out = out.pipe(codepenInjector(content, opts.externalJS))
        }

        out = out.pipe(metaTagInjector(metadata.metaTags));

        cb(null, out, meta);
      }
    }
  });
}
