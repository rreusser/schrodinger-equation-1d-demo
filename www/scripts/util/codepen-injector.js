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

  var formStyle = 'display:inline-block;position:absolute;top:0;left:124px;'
  var form =
    '<form action="http://codepen.io/pen/define" method="POST" target="_blank" style="' + formStyle + '">' +
      '<input type="hidden" name="data" value="' + JSONstring + '">' +
      '<button class="codepenButton">' +
        '<img src="http://s.cdpn.io/3/cp-arrow-right.svg" width="40" height="40" alt="Create New Pen with Prefilled Data">' +
        '<span>Edit on CodePen</span>' +
      '</button>' +
    '</form>';

  return hyperstream({
    body: {
      _appendHtml: form
    }
  });
}
