/* Calls inline source on all files  */

var debug = require('debug')('metalsmith:inline-source');
const { inlineSource } = require('inline-source');

module.exports = function(options) {
  'use strict';

  var options = options || {};

  return async function(files, metalsmith, done) {
    var file, f;

    if(!options.rootpath) {
      options.rootpath = metalsmith.source();
    }

    for (f in files) {
      file = files[f];

      if(file.path.includes(".html")) {
        debug('Transforming file: ' + file.path);
        file.contents = await inlineSource(file.contents.toString(), options);
      } else {
        debug('Ignoring file: ' + file.path);
      }
    }

    done();
  }
}
