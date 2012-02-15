(function () {
  if (typeof document.createElement('div').classList === "undefined") {
    Alpha.ClassList = function (node) {
      this.node = node;
    };

    Alpha.ClassList.prototype.add = function (name) {
      if (!this.contains(name)) {
        this._add(name);
      }
    };

    Alpha.ClassList.prototype.contains = function (name) {
      return (this._list().indexOf(name) !== -1);
    };

    Alpha.ClassList.prototype.item = function (index) {
      return this._list()[index];
    };

    Alpha.ClassList.prototype.remove = function (name) {
      if (this.contains(name)) {
        this._remove(name);
      }
    };

    Alpha.ClassList.prototype.toggle = function (name) {
      var method = this.contains(name) ? '_remove' : '_add';
      this[method](name);
    };

    // internal methods

    Alpha.ClassList.prototype._list = function () {
      return this.node.className.trim().split(/\s+/);
    };

    Alpha.ClassList.prototype._add = function (name) {
      var list = this._list();
      list.push(name);
      this._set(list);
    };

    Alpha.ClassList.prototype._remove = function (name) {
      var list = this._list();
      var idx = list.indexOf(name);
      delete list[idx];
      this._set(list);
    };

    Alpha.ClassList.prototype._set = function (classNames) {
      this.node.className = classNames.join(' ');
    };

    Element.prototype._alpha_get_classList = function () {
      if (!this._alpha_classList) {
        this._alpha_classList = new Alpha.ClassList(this);
      }
      return this._alpha_classList;
    };

    if (Object.defineProperty) {
      Object.defineProperty(Element.prototype, 'classList', {
        get: Element.prototype._alpha_get_classList
      });
    } else if (Element.prototype.__defineGetter__) {
      Element.prototype.__defineGetter__('classList', Element.prototype._alpha_get_classList);
    }
  }
})();
