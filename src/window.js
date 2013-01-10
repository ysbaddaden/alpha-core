if (window.innerWidth === undefined) {
    Object.defineProperty(window, 'innerWidth', {
        get: function () {
            return document.documentElement.clientWidth;
        }
    });

    Object.defineProperty(window, 'innerHeight', {
        get: function () {
            return document.documentElement.clientHeight;
        }
    });
}

if (window.pageXOffset === undefined) {
    Object.defineProperty(window, 'pageXOffset', {
        get: function () {
            return document.documentElement.scrollLeft;
        }
    });

    Object.defineProperty(window, 'pageYOffset', {
        get: function () {
            return document.documentElement.scrollTop;
        }
    });
}
