'use strict';

var fs = require('fs');
var str = require('string-to-stream');
var htmlStream = require('./html-stream');
var wrapStream = require('./wrap-stream');

module.exports = wrapHtml;

function wrapHtml (inputHtml) {
  return function (opts) {
    var jsStream;
    opts = opts || {};

    if (opts.js) {
      if (typeof opts.js === 'string') {
        jsStream = str(opts.js);
      } else {
        jsStream = opts.js;
      }

      jsStream = wrapStream('<script>\nwindow.onload = function () {\n', jsStream, '\n};\n</script>');
    }

    return htmlStream({
      meta: {
        site: 'Your website name',
        title: opts.title,
      },
      html: inputHtml,
      entry: opts.entry || 'static.js',
      css: opts.css || 'styles.css',
      js: jsStream
    });
  };
};
