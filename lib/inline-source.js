/* Calls inline source on all files  */


var debug = require('debug')('metalsmith:inline-source');
var inline = require('inline-source').sync;

module.exports = function(options) {
  'use strict';

  var options = options || {};

  return function(files, metalsmith, done) {
    var file, f;

    if(!options.rootpath) {
      options.rootpath = metalsmith.source();
    }

    for (f in files) {
      file = files[f];

      if(file.path.includes(".html")) {
        debug('Transforming file: ' + file.path);
        file.contents = inline(file.contents.toString(), options);
      } else {
        debug('Ignoring file: ' + file.path);
      }
    }

    done();
  }
}
