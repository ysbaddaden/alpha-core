unit.module("getElementsByClassName");

unit.setup(function () {
    var div;
    this.elm = document.createElement('div');
    this.divs = [];
    [ 'first', 'second', 'second last' ].forEach(function (className) {
        div = document.createElement('div');
        div.className = className;
        this.divs.push(div);
        this.elm.appendChild(div);
    }, this);
    document.body.appendChild(this.elm);
});

unit.teardown(function () {
    this.divs.forEach(function (div) {
        div.remove();
    });
});

unit.test("document.getElementsByClassName(name)", function () {
    var elements = document.getElementsByClassName('first');
    assert.equal(elements.length, 1);
    assert.ok(elements[0].classList.contains('first'));
});

unit.test("document.getElementsByClassName(names)", function () {
    var elements = document.getElementsByClassName('last second');
    assert.equal(elements.length, 1);
    assert.ok(elements[0].classList.contains('last'));
    assert.ok(elements[0].classList.contains('second'));
});

unit.test("Element.getElementsByClassName(name)", function () {
    var elements = this.elm.getElementsByClassName('second');
    assert.equal(elements.length, 2);
    assert.ok(elements[0].classList.contains('second'));
    assert.ok(elements[1].classList.contains('second'));
});

unit.test("Element.getElementsByClassName(names)", function () {
    var elements = this.elm.getElementsByClassName('second last');
    assert.equal(elements.length, 1);
    assert.ok(elements[0].classList.contains('second'));
    assert.ok(elements[0].classList.contains('last'));
});

