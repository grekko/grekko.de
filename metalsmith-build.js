var Metalsmith = require('metalsmith'),
  markdown = require('metalsmith-markdown'),
  layouts = require('metalsmith-layouts'),
  inPlace = require('metalsmith-in-place'),
  prism = require('metalsmith-prism'),
  static = require('metalsmith-static'),
  moveUp = require('metalsmith-move-up'),
  dateInFilename = require('metalsmith-date-in-filename'),
  discoverHelpers = require('metalsmith-discover-helpers'),
  collections = require('metalsmith-collections'),
  layoutByPath = require(__dirname + '/lib/layout-by-path'),
  inlineSource = require(__dirname + '/lib/inline-source'),
  serve = require('metalsmith-serve'),
  debug = require('metalsmith-debug');

Metalsmith(__dirname)
  .use(debug())
  .use(serve({
    port: 8080,
    verbose: true
  }))
  .metadata({
    title: "Gregory Igelmund",
    layout: "page.html"
  })
  .source('./src/content')
  .destination('./docs')
  .clean(true)
  .use(static({
    src: "src/public",
    dest: "."
  }))
  .use(discoverHelpers())
  .use(markdown({ langPrefix: 'language-' }))
  .use(prism())
  .use(dateInFilename(true))
  .use(collections({
    posts: {
      pattern: "posts/*.html",
      sortBy: "date",
      reverse: true
    },
    pages: {
      pattern: "pages/*.html"
    }
  }))
  .use(layoutByPath())
  .use(layouts({
    engine: "handlebars",
    directory: "src/layouts",
    default: "page.html",
    partials: "src/layouts/partials"
  }))
	.use(inPlace())
	.use(inlineSource())
  .use(moveUp("pages/*"))
  .build(function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Site build complete!');
    }
  });
