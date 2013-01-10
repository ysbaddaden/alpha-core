if (!document.getElementsByClassName) {
    (function (getElementsByClassName) {
        document.getElementsByClassName = function(className) {
            return getElementsByClassName(document, className);
        };
        Element.prototype.getElementsByClassName = function(className) {
            return getElementsByClassName(this, className);
        };
    }(function (elm, className) {
        var selector = className.replace(/\s+$/, '').replace(/^\s*|\s+/g, '.');
        return elm.querySelectorAll(selector);
    }));
}
