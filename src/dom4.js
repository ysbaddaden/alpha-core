(function () {
    var elm = document.createElement('div');
    elm.appendChild(document.createComment(' '));

    if (elm.textContent === undefined) {
          Object.defineProperty(Element.prototype, 'textContent', {
              get: function () {
                  return this.innerText;
              }
          });
    }

    if (elm.children === undefined || elm.children.length !== 0) {
        Object.defineProperty(Element.prototype, 'children', {
            get: function () {
                var children = [];
                var child = this.firstChild;
                while (child) {
                    if (child.nodeType === 1) {
                        children.push(child);
                    }
                    child = child.nextSibling;
                }
                return children;
            }
        });
    }

    if (elm.childElementCount === undefined) {
        Object.defineProperty(Element.prototype, 'childElementCount', {
            get: function() {
                var count = 0;
                var child = this.firstChild;
                while (child) {
                    if (child.nodeType === 1) {
                        count++;
                    }
                    child = child.nextSibling;
                }
                return count;
            }
        });
    }

    if (elm.firstElementChild === undefined) {
        Object.defineProperty(Element.prototype, 'firstElementChild', {
            get: function() {
                var child = this.firstChild;
                while (child && child.nodeType !== 1) {
                    child = child.nextSibling;
                }
                return (child && child.nodeType === 1) ? child : null;
            }
        });
    }

    if (elm.lastElementChild === undefined) {
        Object.defineProperty(Element.prototype, 'lastElementChild', {
            get: function() {
                var child = this.lastChild;
                while (child && child.nodeType !== 1) {
                    child = child.previousSibling;
                }
                return (child && child.nodeType === 1) ? child : null;
            }
        });
    }

    if (elm.nextElementSibling === undefined) {
        Object.defineProperty(Element.prototype, 'nextElementSibling', {
            get: function () {
                var sibling = this.nextSibling;
                while (sibling && sibling.nodeType !== 1) {
                    sibling = sibling.nextSibling;
                }
                return (sibling && sibling.nodeType === 1) ? sibling : null;
            }
        });
    }

    if (elm.previousElementSibling === undefined) {
        Object.defineProperty(Element.prototype, 'previousElementSibling', {
            get: function () {
                var sibling = this.previousSibling;
                while (sibling && sibling.nodeType !== 1) {
                    sibling = sibling.previousSibling;
                }
                return (sibling && sibling.nodeType === 1) ? sibling : null;
            }
        });
    }

    if (elm.append === undefined) {
        var node = function (arg) {
            return (typeof arg === 'string') ? document.createTextNode(arg) : arg;
        };

        var macro = function (args) {
            if (args.length === 1) {
                return node(args[0]);
            }
            var fragment = document.createDocumentFragment();
            for (var i = 0, l = args.length; i < l; i++) {
                fragment.appendChild(node(args[i]));
            }
            return fragment;
        };

        var prepend = function () {
            this.insertBefore(macro(arguments), this.firstChild);
        };

        var append = function () {
            this.appendChild(macro(arguments));
        };

        var before = function () {
            if (this.parentNode) {
                this.parentNode.insertBefore(macro(arguments), this);
            }
        };

        var after = function () {
            if (this.parentNode) {
                this.parentNode.insertBefore(macro(arguments), this.nextSibling);
            }
        };

        var replace = function () {
            if (this.parentNode) {
                this.parentNode.replaceChild(macro(arguments), this);
            }
        };

        var remove = function () {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        };

        (Document || HTMLDocument).prototype.prepend = prepend;
        (Document || HTMLDocument).prototype.append  = append;

        Element.prototype.prepend = prepend;
        Element.prototype.append  = append;
        Element.prototype.before  = before;
        Element.prototype.after   = after;
        Element.prototype.replace = replace;
        Element.prototype.remove  = remove;

        if (typeof CharacterData !== 'undefined') {
            // applies to Text, Comment and ProcessingInstruction
            CharacterData.prototype.before  = before;
            CharacterData.prototype.after   = after;
            CharacterData.prototype.replace = replace;
            CharacterData.prototype.remove  = remove;
        } else if (Text) {
            // IE8 has a constructor for Text, but none for Comment
            Text.prototype.before  = before;
            Text.prototype.after   = after;
            Text.prototype.replace = replace;
            Text.prototype.remove  = remove;
        }
    }
}());
