'use strict';

var through2 = require('through2');

module.exports = wrapStream;

function wrapStream(prefix, inputStream, suffix) {
  var wrotePrefix = false;

  return inputStream.pipe(through2(function (chunk, enc, callback) {
    if (!wrotePrefix) {
      this.push(prefix);
      wrotePrefix = true;
    }
    this.push(chunk);

    callback();

  }, function (cb) {
    this.push(suffix);
    cb();
  }));
}
