'use strict';

var hyperstream = require('hyperstream');

module.exports = codepenInjector;

function codepenInjector (content, externalJS) {
  content = content || {};

  var data = {};
  if (content.html) data.html = content.html;
  if (content.js) data.js = content.js;
  if (content.css) data.css = content.css;
  if (externalJS) data.js_external = externalJS;

  var JSONstring = JSON.stringify(data).replace(/"/g, '&quot;');

  var formStyle = 'display:inline-block;position:absolute;top:0;right:5px;'
  var form =
    '<form action="http://codepen.io/pen/define" method="POST" target="_blank" style="' + formStyle + '">' +
      '<input type="hidden" name="data" value="' + JSONstring + '">' +
      '<input type="image" src="http://s.cdpn.io/3/cp-arrow-right.svg" width="40" height="40" value="Create New Pen with Prefilled Data" class="codepen-mover-button">' +
    '</form>';

  return hyperstream({
    body: {
      _appendHtml: form
    }
  });
}
