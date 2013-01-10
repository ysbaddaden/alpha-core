// A read only polyfill for dataset.
(function () {
    if (document.createElement('div').dataset === undefined) {
        var camelize = function (str) {
            return str.replace(/-(\w)/, function (s) {
                return s.charAt(1).toUpperCase();
            });
        };

        Object.defineProperty(Element.prototype, 'dataset', {
            get: function () {
                var set = {}, m;
                for (var i = 0, l = this.attributes.length; i < l; i++) {
                    if ((m = this.attributes[i].name.match(/^data-(.*)$/))) {
                        set[camelize(m[1])] = this.attributes[i].value;
                    }
                }
                return set;
            }
        });
    }
}());
