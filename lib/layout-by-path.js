/* Sets layout metadata based on file path */

module.exports = function() {
  'use strict';

  return function(files, metalsmith, done) {
    var file, f;

    for (f in files) {
      file = files[f];
      file.layout = "page.html";

      if(file.path.startsWith("posts")) {
        file.layout = "post.html";
      }
    }

    done();
  }
}
