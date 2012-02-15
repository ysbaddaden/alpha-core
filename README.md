# AlphaCore

AlphaCore is an obstrusive JavaScript library that aims at fixing, implementing
and emulating standard JavaScript and DOM in broken and old browsers.

The initial idea was to create a compatibility library, permitting developers
to write JavaScript and DOM as defined by the ECMAScript and the W3C. This means
an obstrusive framework that transparently adds support for missing or broken
standard methods like `addEventListener` or `querySelectorAll` using a
standard API.

Most of AlphaCore is actually optional in standard compliant browsers, even in
IE9, while still necessary for older browsers.


## Why?

Why do we use JavaScript librairies at all? Because Internet Explorer's JScript
sucks. It lacks complete support for the DOM Event or even the DOM Element
object. We thus rely on JavaScript librairies to ease our pain.

IE8 eventually introduced support for the DOM Element, meaning we could use
Element.prototype to implement missing DOM Event methods for instance. The
problem was IE6 and IE7 do not support this. I thus started hacking and found
a way to emulate an Element prototype and have standard methods like
`getElementById` to always return extended elements.

Since it just worked I continued and implemented DOM Events, querySelectorAll,
and more, so that I would have all the latest features to work on older
browsers, that are still widely used.

It works in all browsers I’ve tested so far (it may also work with older releases):

- Internet Explorer 6+
- Firefox 2+
- Opera 9.5
- Safari 3+
- Google Chome


## DOM prototypes in Internet Explorer before IE8

The prefered way to extend objects in JavaScript is throught objects' prototype.
JavaScript is all about prototypes. Problem is Internet Explore doesn't implement
any DOM prototypes (eg. Element, Event) before IE8. AlphaCore emulates the
Element and Event objects when they're undefined, so that all you have to do
when you want to add a `hide` method to all elements is adding it to
`Element.prototype`. For instance:

    Element.prototype.hide = function () {
      this.style.display = 'none';
    };

### Extending elements

Elements won't be extended automatically, which forces you to manually extend
them with methods like the famous `$`. AlphaCore does the job for you almost
everywhere by having methods like `document.getElementById` or
`elm.getElementsByTagName`, among others, to always return extended elements,
limiting the need to it manually.

For instance the following will just work in IE6:

    document.getElementById('myDialog').hide();

### Extending element attributes (which are elements themselves)

There is a limitation to automatic extend: we can overwrite methods that return
an element or a collection of element but we can't, for performance reasons,
extend attributes like +parentNode+, +nextSibling+, etc. It would cause the
whole tree to be extended at once, and there would be bugs anyway elements
added to the DOM with innerHTML not being extended, etc.

AlphaCore proposes two solutions to this problem:

- manually extend the attributes with `$` or `Alpha.$`.
- use `Element.prototype.get` method which returns extended attribute elements.

Examples:

    parent = $(element.parentNode);
    parent = Alpha.$(element.parentNode);
    parent = element.get('parentNode');

Since AlphaCore is optional in standard compliant browsers, the `get` method
may not be available, so you may test for its presence:

    parent = element.get ? element.get('parentNode') : element.parentNode;

In the end you may use whatever method suits you:

- you don't care about IE 6/7? just use attributes like the DOM says so;
- you care about IE 6/7? use `element.get(attribute)`;
- you care about IE 6/7 but don't want to load Alpha on mobiles? use
  `element.get ? element.get(attribute) : element.attribute`.


## DOM Events in Internet Explorer

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

You may also listen and dispatch custom events. This is always nice to have.

    var event = document.createEvent('Event');
    event.initEvent('my_custom_type', true, true);
    element.dispatchEvent(event);


## Limitations and concerns

Even thought IE8 has support for getters and setters, older releases do not,
and I don't think it's possible to emulate it without relying on ugly hacks
(see [http://alex.dojotoolkit.org/08/jscript/lettable.html](http://alex.dojotoolkit.org/08/jscript/lettable.html)).
This fact leads to some difficulties.

For instance the emulation of Firefox 3.5's `children`, `countElementChild`,
`lastElementChild`, etc. attributes. Those can be emulated throught getters
in most browsers, but not in IE 6/7. Sadly :(

In these browsers we need to rely on the `Element.prototype.get` method.


## Backward compatibility

New browsers come with nice new features, that are obviously lacking in older
releases that we still have to support. One goal of AlphaCore is to implement
(or emulate) these when they're missing.

Here are a few examples: the `JSON` object, `getElementsByClassName`,
`querySelectorAll`, etc.


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

- [GetElementsByClassName](http://robertnyman.com/2008/05/27/the-ultimate-getelementsbyclassname-anno-2008/) by Robert Nyman;
- [sly](https://github.com/digitarald/sly) by Harald Kirschner;
- [JSON2.js](http://www.json.org/js.html) by Douglas Crockford;
- JavaScript 1.6 and 1.8 polyfills for `Array` from the [Mozilla Developer Network](http://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Array).

### Contribute

Just fork the project on Github and send pull requests.
Please be sure to check your code with [jshint](http://www.jshint.com/about/) before.

