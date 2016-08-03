'use strict';

var hyperstream = require('hyperstream');
var escape = require('escape-html');

module.exports = metaTagInjector;

function metaTagInjector (metaTags) {
  var metaTagHtml = '';

  for (var name in metaTags) {
    if (metaTags.hasOwnProperty(name)) {
      metaTagHtml += '<meta name="' + escape(name) + '" content="' + escape(metaTags[name]) + '" />\n';
    }
  }

  return hyperstream({
    head: {
      _appendHtml: metaTagHtml
    }
  });
}
