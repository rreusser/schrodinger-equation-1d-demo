'use strict';

var hyperstream = require('hyperstream');
var html = require('simple-html-index');
var escape = require('escape-html');

module.exports = htmlStream;

function htmlStream (opts) {
  opts = opts || {};

  var h = html({
    css: opts.css,
    entry: opts.entry,
    favicon: true,
  });

  var head = { };

  var meta = '';

  if (opts.meta) {
    for (var name in opts.meta) {
      if (opts.meta.hasOwnProperty(name)) {
        var content = opts.meta[name];
        meta += '<meta name="' + escape(name) + '" content="' + escape(content) + '" />';
      }
    }
  }

  var content = {
    head: {
      _appendHtml: meta,
    },
  };

  if (opts.html) {
    content.body = {_appendHtml: opts.html}
  }

  var result =  h.pipe(hyperstream(content));

  if (opts.js) {
    result = result.pipe(hyperstream({
      body: {
        _appendHtml: opts.js
      }
    }));
  }

  return result;
};

