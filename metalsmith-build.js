var Metalsmith = require('metalsmith'),
  markdown = require('metalsmith-markdown'),
  layouts = require('metalsmith-layouts'),
  inPlace = require('metalsmith-in-place'),
  metallic = require('metalsmith-metallic'),
  static = require('metalsmith-static'),
  moveUp = require('metalsmith-move-up'),
  dateInFilename = require('metalsmith-date-in-filename'),
  discoverHelpers = require('metalsmith-discover-helpers'),
  collections = require('metalsmith-collections'),
  serve = require('metalsmith-serve'),
  debug = require('metalsmith-debug');

Metalsmith(__dirname)
  .use(debug())
  .use(serve({
    port: 8080,
    verbose: true
  }))
  .metadata({
    title: "Gregory Igelmund"
  })
  .source('./src/content')
  .destination('./docs')
  .clean(true)
  .use(static({
    src: "src/public",
    dest: "."
  }))
  .use(discoverHelpers())
  .use(metallic())
  .use(markdown())
  .use(dateInFilename(true))
  .use(collections({
    posts: {
      pattern: "posts/*.html",
      sortBy: 'date',
      reverse: true,
    },
    pages: {
      pattern: "pages/*.html"
    }
  }))
  .use(layouts({
    engine: "handlebars",
    directory: "src/layouts",
    default: "index.html"
  }))
	.use(inPlace())
  .use(moveUp("pages/*"))
  .build(function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Site build complete!');
    }
  });
