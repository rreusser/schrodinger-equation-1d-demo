'use strict';

module.exports = awsConfig;

function awsConfig (opts) {
  var config = {};

  var appName = opts.appName;
  var prefix = appName + '/';

  if (opts.isSnapshot) {
    prefix = 'snapshots/' + prefix + (+new Date()) + '/';
  }

  if (opts.webHost) {
    var baseUrl = opts.webHost + prefix;
  } else {
    var baseUrl = 'http://' + opts.bucket + '.s3-website-us-east-1.amazonaws.com/' + prefix;
  }

  config.prefix = prefix;
  config.baseUrl = baseUrl;
  config.bucket = opts.bucket;
  config.isSnapshot = !!opts.isSnapshot;

  return config;
}
