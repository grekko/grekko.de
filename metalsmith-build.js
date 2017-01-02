var Metalsmith = require('metalsmith'),
  markdown = require('metalsmith-markdown'),
  layouts = require('metalsmith-layouts'),
  inPlace = require('metalsmith-in-place'),
  metallic = require('metalsmith-metallic'),
  assets = require('metalsmith-assets'),
  moveUp = require('metalsmith-move-up'),
  dateInFilename = require('metalsmith-date-in-filename'),
  collections = require('metalsmith-collections'),
  serve = require('metalsmith-serve'),
  debug = require('metalsmith-debug');

Metalsmith(__dirname)
  .use(serve())
  .source('./src/content')
  .destination('./docs')
  .clean(true)
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
  .use(assets({
    source: "src/public",
    destination: "."
  }))
	.use(inPlace())
  .use(moveUp("pages/*"))
  .use(debug())
  .build(function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Site build complete!');
    }
  });
