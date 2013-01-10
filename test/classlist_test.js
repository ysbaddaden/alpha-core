unit.module("DOMTokenList (classList)");

unit.setup(function () {
    this.elm = document.createElement('div');
});

unit.test("classList getter", function () {
    assert.notStrictEqual(undefined, this.elm.classList);
});

unit.test("classList.item(idx)", function () {
    this.elm.className = 'first second';
    this.elm.classList.add('third');
    assert.equal(this.elm.classList.item(0), 'first');
    assert.equal(this.elm.classList.item(1), 'second');
    assert.equal(this.elm.classList.item(2), 'third');
});

unit.test("classList shouldn't cache", function () {
    this.elm.className = 'first second';
    this.elm.classList.add('third');
    this.elm.className = 'completely different class names';
    assert.equal(this.elm.classList, 'completely different class names');
});

unit.test("classList.contains(name)", function () {
    this.elm.className = 'first second fourth';
    assert.ok(this.elm.classList.contains('first'));
    assert.ok(this.elm.classList.contains('fourth'));
    assert.ok(!this.elm.classList.contains('fifth'));
});

unit.test("classList.add(name)", function () {
    this.elm.classList.add('first');
    assert.equal(this.elm.className, 'first');

    this.elm.classList.add('first');
    assert.equal(this.elm.className, 'first',
        "adding a className multiple times should add it once only");

    this.elm.classList.add('second');
    assert.equal(this.elm.className, 'first second');

    //this.elm.classList.add('third', 'fourth');
    //assert.equal(this.elm.classList.toString(), 'first second third fourth');
});

unit.test("classList.remove(name)", function () {
    this.elm.className = 'first second third';
    this.elm.classList.remove('first');
    assert.equal(this.elm.className, 'second third');

    this.elm.classList.remove('third');
    assert.equal(this.elm.className, 'second');

    this.elm.classList.remove('fifth');
    assert.equal(this.elm.className, 'second',
        "removing an unknown className shouldn't have any effect");
});

unit.test("classList.toggle(name)", function () {
    this.elm.classList.toggle('selected');
    assert.ok(this.elm.classList.contains('selected'));

    this.elm.classList.toggle('selected');
    assert.ok(!this.elm.classList.contains('selected'));
});

