# AlphaCore

AlphaCore is an obstrusive JavaScript library that aims at fixing, implementing
and emulating standard JavaScript and DOM in broken and old browsers.

The initial idea was to create a compatibility library, permitting developers
to write JavaScript and DOM as defined by the ECMAScript and the W3C. This means
an obstrusive framework that transparently adds support for missing or broken
standard methods like `addEventListener` or `querySelectorAll` using a
standard API.


## Why?

We used to need JavaScript libraries like jQuery or Prototype because Internet
Explorer's JScript sucks. This is no longer the case with IE9+, and IE8 makes it
possible to fix the DOM since it implements constructors and prototypes like
Element.prototype, allows getters and setters with Object.defineproperty, etc.

Actually the one thing that's really broken in IE8 is the non support of
standard DOM Events, which AlphaCore fixes.

It works in all modern browsers, and particularly in IE8 and more. Older
browsers like IE6 and IE7 are no longer supporter because their usage dropped
under 1% (unless you live you China).


## DOM4 mutations

The current DOM draft features new methods for manipulating the DOM which are
quite cool, and are thus available in AlphaCore:

  - `elm.append(*nodes)`
  - `elm.prepend(*nodes)`
  - `elm.before(*nodes)`
  - `elm.after(*nodes)`
  - `elm.replace(*nodes)`
  - `elm.remove()`

Since IE8 is still a little broken, we can't manipulate HTML comment nodes with
those methods! This is because IE8 doesn't provide any constructor for Comment
but only for Text, and doesn't make those inherit from the CharacterData
interface like it should.

So beware of HTML comment nodes in IE8. Something like `elm.previousSibling.remove()`
may not work because the previous sibling node may be a comment. A solution is
to remove all comments from your HTML, or to work only with
previousElementSibling-like methods.


## DOM Events in Internet Explorer 8

Internet Explorer until IE9 lacked support for DOM Events, and still relies
on `attachEvent`, `detachEvent`, etc. AlphaCore implements them —in bubbling
mode only since the capture mode is harder to emulate (thought doable).

AlphaCore fixes the Event object passed to the listeners —in fact IE doesn't
even pass any Event object. Most of the elements related to the event are fixed:
`target`, `relatedTarget`, `currentTarget`; `this` is also fixed; as well as
some values like `pageX` and `pageY`. For instance:

    document.getElementById('elm').addEventListener('click', function(event) {
        alert(event.relatedTarget);
    }, false);

### Custom events.

You may also listen and dispatch custom events. Which is always nice to have:

    var event = document.createEvent('Event');
    event.initEvent('my_custom_type', true, true);
    element.dispatchEvent(event);


## Backward compatibility

New browsers come with nice new features, that are obviously lacking in older
releases that we still have to support. One goal of AlphaCore is to implement
(or emulate) these when they're missing.


## Explorer Canvas (by Google)

From what I tested, excanvas.js must be loaded in the document's HEAD, and any
script that needs to access canvas elements must be defered, or started on
load. For instance:

    <script type="text/javascript" defer="defer">
    var ctx = document.getElementById('my-canvas').getContext('2d');
    </script>

If excanvas.js is loaded before AlphaCore, created `canvas` elements will be
automatically extended when calling `document.createElement('canvas')`.

    <script type="text/javascript">
    window.addEventListener('load', function () {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // do something with your canvas
    }, false);
    </script>


## Authors

- Julien Portalier <julien@portalier.com>

### Credits

AlphaCore relies on some external libraries:

- [es5-shim](https://github.com/kriskowal/es5-shim) by Kris Kowal and contributors.

### Contribute

Just fork the project on Github and send pull requests. Please check your code
with [jshint](http://www.jshint.com/about/) before.

