'use strict';

var budo = require('budo');
var wrapHtml = require('./util/wrap-html');
var url = require('url');
var lr = require('inject-lr-script-stream');
var resolve = require('./util/content-resolver');
var toStr = require('stream-to-string');
var metaTagInjector = require('./util/meta-tag-injector');
var metadata = require('../metadata');

var app = budo('www/src/static.js', {
  watchGlob: 'www/src/**/*.{html,css,js}',
  live: true,
  dir: 'www/src',
  port: 9966,
  open: true,
  stream: process.stdout,
  defaultIndex: wrapHtml(),

  middleware: function (req, res, next) {
    var pathname = url.parse(req.url).pathname

    // Wrap index.html in the layout, if present:
    if (pathname === '/') {
      pathname = '/index.html';
    }

    if (pathname.match(/\.html/)) {
      try{
      var streams = resolve(__dirname + '/../src' + pathname, {
        defaultCss: 'index.css',
      }, function (err, streams, data) {
        res.statusCode = 200;

        wrapHtml(streams.html)({
          title: 'Page',
          js: streams.js,
          css: data.cssrel
        })
          .pipe(lr())
          .pipe(metaTagInjector(metadata.metaTags))
          .pipe(res);
      });
      } catch(e) {
        console.error(e.stack);
      }
    } else {
      next();
    }
  }
});
