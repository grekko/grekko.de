---
title: "REM vs. EM"
---

I recently read CSS-Code containing three different types of relative units:
[%](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage),
[em](https://developer.mozilla.org/en-US/docs/Web/CSS/length#em) and
[rem](https://developer.mozilla.org/en-US/docs/Web/CSS/length#rem).

Consider the following HTML snippet:

```html
<h1>Hello World</h1>
<p>…</p>
```

With the following CSS:

```css
html {
  font-size: 100%;      /* assuming 100% == 16px */
}

h1 {
  font-size: 2rem;      /* 1rem == 16px => 32px */
  line-height: 1em;     /* 1em refers to current font-size (32px) => 32px */
  padding-bottom: 1rem; /* 1rem == 16px => 16px */
}
```

Understanding the impact took me some time and I just finally `got it` when
I read the great write-up of Zell: [REM vs EM – The Great Debate](https://zellwk.com/blog/rem-vs-em/).

Please go to Zells post for a full explanation. The TL;DR version is this:

> Use `em` for properties relative to the current elements font-size. Use `rem` for everything else.

Following that rule you'd understand why the `line-height` property uses `em`
while `padding-bottom` would use `rem`.

