'use strict';

var buildDist = require('./util/build-dist');
var argv = require('minimist')(process.argv.slice(2));
var xtend = require('xtend');
var awsConfig = require('./util/aws-config');
var awsCreds = require('../aws-credentials');
var path = require('path');

var meta = require('../metadata');

var opts = xtend(meta, {
  isSnapshot: !!argv.snapshot,
  bucket: argv.bucket,
  codepen: !!argv.codepen,
});

meta.isSnapshot = !!argv.snapshot;
meta.bucket = argv.bucket;

var config = awsConfig(meta);

buildDist({
  pattern: argv.input || 'www/src/*.html',
  destpath: path.resolve(process.cwd(), argv.dest)
});
