---
title: HTML Escaping in Handlebars
---

# HTML Escpaing in Handlebars

When setting up this microblog I observed [handlebars](http://handlebarsjs.com/) offers a neat
built-in security feature: Automatic HTML Escaping for interpolated strings.

Meaning the following string being stored as `html_fragment`:

```html
<p>This is some html-fragment I'd like to place into a html-layout-file</p>
```

being interpolated in:

```html
<!DOCTYPE html>
…
{{ html_fragment }}
…
```

would result in:

```html
<!DOCTYPE html>
…
&lt;&gt;This is some html-fragment I'd like to place into a html-layout-file&lt;&gt;
…
```

While I love the built-in default security behavior you sometimes want to disable it.
Achieving this is quite easy, with the `triple-stash`:

```html
<!DOCTYPE html>
…
{{{ html_fragment }}}
…
```

results in:

```html
<!DOCTYPE html>
…
<p>This is some html-fragment I'd like to place into a html-layout-file</p>
…
```
