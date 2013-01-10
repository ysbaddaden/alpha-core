unit.module("DOM Events");

unit.setup(function () {
    this.elm = document.createElement('div');
    this.input = document.createElement('input');
    this.elm.appendChild(this.input);
    this.elm.style.visibility = 'hidden';
    document.body.appendChild(this.elm);
});

unit.teardown(function () {
    this.elm.remove();
});

unit.async("addEventListener()", function () {
    var self = this;
    this.input.addEventListener('click', function (ev) {
        assert.strictEqual(this, self.input);
        assert.strictEqual(ev.target, self.input);
        assert.strictEqual(ev.currentTarget, self.input);
        assert.equal(ev.type, 'click');
        unit.complete();
    }, false);
    this.input.click();
});

unit.async("addEventListener() on parent element", function () {
    var self = this;
    this.elm.addEventListener('click', function (ev) {
        assert.strictEqual(this, self.elm);
        assert.strictEqual(ev.target, self.input);
        assert.strictEqual(ev.currentTarget, self.elm);
        assert.equal(ev.type, 'click');
        unit.complete();
    }, false);
    this.input.click();
});

unit.async("addEventListener() with many listeners", function () {
    var self = this;
    var value = 0;

    this.elm.addEventListener('click', function (ev) {
        value += 1;
    }, false);

    this.elm.addEventListener('click', function (ev) {
        value += 1;
    }, false);

    this.elm.addEventListener('click', function (ev) {
        assert.equal(value, 2);
        unit.complete();
    }, false);
    this.input.click();
});

unit.async("removeEventListener()", function () {
    var self = this;
    var value = 0;
    var listener = function (ev) {
        value += 1;
    };
    this.elm.addEventListener('click', listener, false);
    this.elm.addEventListener('click', function (ev) {
        assert.equal(value, 0);
        unit.complete();
    }, false);
    this.elm.removeEventListener('click', listener, false);
    this.input.click();
});

unit.async("preventDefault()", function () {
    var self = this;
    var value = 0;

    this.elm.addEventListener('click', function (ev) {
        value += 1;
        ev.preventDefault();
    }, false);

    this.elm.addEventListener('click', function () {
        value -= 1;
    }, false);

    this.elm.addEventListener('click', function (ev) {
        assert.equal(ev.defaultPrevented, true);
        assert.equal(value, 0);
        unit.complete();
    }, false);

    this.input.click();
});

unit.async("stopPropagation()", function () {
    var self = this;
    var value = 0;

    this.input.addEventListener('click', function (ev) {
        value += 1;
        ev.stopPropagation();
    }, false);

    this.elm.addEventListener('click', function (ev) {
        assert.ok(false, "The event shouldn't have bubbled.");
    }, false);

    setTimeout(function () {
        unit.complete();
    }, 200);
    this.input.click();
});

