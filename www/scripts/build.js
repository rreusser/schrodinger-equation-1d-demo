'use strict';

var buildDist = require('./util/build-dist');
var meta = require('../metadata');
var argv = require('minimist')(process.argv.slice(2));

buildDist({
  appName: meta.appName,
  pattern: argv.pattern || 'www/src/*.html',
  destpath: argv.dest || 'www/dist',
  codepen: false,
  defaultCss: 'styles.css'
});
