(function () {
    var div = document.createElement('div');

    if (div.classList === undefined || div.relList === undefined) {
        var list = function (node, property) {
            var value = node[property].trim();
            return (value === "") ? [] : value.split(/\s+/);
        };

        var set = function (node, property, tokens) {
            return node[property] = tokens.join(' ');
        };

        var validate = function (token) {
            for (var i = 0, l = arguments.length; i < l; i++) {
                if (arguments[i] === "") {
                    throw SyntaxError("Token cannot be the empty string.");
                }
                if (/\s/.test(arguments[i])) {
                    //throw InvalidCharacterError("Token cannot contain any space character.");
                    throw SyntaxError("Token cannot contain any space character.");
                }
            }
        };

        var DOMTokenList = function (node, property) {
            this.node = node;
            this.property = property;
        };

        try {
            Object.defineProperty(DOMTokenList.prototype, 'length', {
                get: function () {
                    return list(this.node, this.property).length;
                }
            });
        } catch (ex) {
        }

        DOMTokenList.prototype.item = function (index) {
            return list(this.node, this.property)[index];
        };

        DOMTokenList.prototype.contains = function (token) {
            validate(token);
            return list(this.node, this.property).indexOf(token) !== -1;
        };

        DOMTokenList.prototype.add = function (token) {
            validate.apply(null, arguments);
            var tokens = list(this.node, this.property);
            for (var i = 0, l = arguments.length; i < l; i++) {
                if (tokens.indexOf(arguments[i]) === -1) {
                    tokens.push(arguments[i]);
                }
            }
            set(this.node, this.property, tokens);
        };

        DOMTokenList.prototype.remove = function (token) {
            validate.apply(null, arguments);
            var tokens = list(this.node, this.property);
            for (var i = 0, l = arguments.length; i < l; i++) {
                var idx = tokens.indexOf(token);
                if (idx !== -1) {
                    tokens.splice(idx, 1);
                }
            }
            set(this.node, this.property, tokens);
        };

        DOMTokenList.prototype.toggle = function (token, force) {
            validate(token);
            var tokens = list(this.node, this.property);
            var idx = tokens.indexOf(token);
            var ret = force;
            if (idx !== -1) {
                if (force !== true) {
                    tokens.splice(idx, 1);
                    ret = false;
                }
            } else if (force !== false) {
                tokens.push(token);
                ret = true;
            }
            set(this.node, this.property, tokens);
            return ret;
        };

        DOMTokenList.prototype.toString = function () {
            return this.node[this.property];
        };

        if (div.classList === undefined) {
            Object.defineProperty(Element.prototype, 'classList', {
                get: function () {
                    if (!this._classList) {
                        this._classList = new DOMTokenList(this, 'className');
                    }
                    return this._classList;
                }
            });
        }

        if (div.relList === undefined) {
            Object.defineProperty(Element.prototype, 'relList', {
                get: function () {
                    if (!this._relList) {
                        this._relList = new DOMTokenList(this, 'rel');
                    }
                    return this._relList;
                }
            });
        }
    }
})();
