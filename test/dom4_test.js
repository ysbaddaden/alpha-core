unit.module("DOM4: child and sibling elements");

unit.setup(function () {
    this.div = document.createElement('div');
    this.div.innerHTML = '<div id="test"></div> <div id="toto">  <-- --> <div id="tata">tata</div>      <div id="next2">next2</div><div id="next1">next1</div> </div>';
    document.body.appendChild(this.div);
});

unit.teardown(function () {
    document.body.removeChild(this.div);
});

unit.test('children', function () {
    var children = document.getElementById('toto').children;
    assert.equal(children[0].id, 'tata');
    assert.equal(children[1].id, 'next2');
    assert.equal(children[2].id, 'next1');
});

unit.test('childElementCount', function () {
    assert.equal(document.getElementById('toto').childElementCount, 3);
});

unit.test('firstElementChild', function () {
    var child = document.getElementById('toto').firstElementChild;
    assert.equal(child.id, 'tata');
});

unit.test('lastElementChild', function () {
    var child = document.getElementById('toto').lastElementChild;
    assert.equal(child.id, 'next1');
});

unit.test('previousElementSibling', function () {
    var sibling = document.getElementById('next1').previousElementSibling;
    assert.equal(sibling.id, 'next2');

    sibling = document.getElementById('tata').previousElementSibling;
    assert.strictEqual(sibling, null);
});

unit.test('nextElementSibling', function () {
    var sibling = document.getElementById('tata').nextElementSibling;
    assert.equal(sibling.id, 'next2');
    sibling = document.getElementById('next1').nextElementSibling;
    assert.strictEqual(sibling, null);
});


unit.module("DOM4: mutations");

unit.test("prepend(*nodes)", function () {
    var elm = document.createElement('div');
    var div = document.createElement('div');
    var p   = document.createElement('p');
    var h1  = document.createElement('h1');

    elm.prepend('string');
    elm.prepend(div);
    elm.prepend(p, 'another string', h1);

    assert.equal(elm.childNodes.length, 5);
    assert.strictEqual(elm.childNodes[0], p);
    assert.equal(elm.childNodes[1].data, 'another string');
    assert.strictEqual(elm.childNodes[2], h1);
    assert.strictEqual(elm.childNodes[3], div);
    assert.equal(elm.childNodes[4].data, 'string');
});

unit.test("append(*nodes)", function () {
    var elm = document.createElement('div');
    var div = document.createElement('div');
    var p   = document.createElement('p');
    var h1  = document.createElement('h1');

    elm.append('string');
    elm.append(div);
    elm.append(p, 'another string', h1);

    assert.equal(elm.childNodes.length, 5);
    assert.equal(elm.childNodes[0].data, 'string');
    assert.strictEqual(elm.childNodes[1], div);
    assert.strictEqual(elm.childNodes[2], p);
    assert.equal(elm.childNodes[3].data, 'another string');
    assert.strictEqual(elm.childNodes[4], h1);
});

unit.test("before(*nodes)", function () {
    var par = document.createElement('div');
    var elm = document.createElement('div');
    var div = document.createElement('div');
    var p   = document.createElement('p');
    var h1  = document.createElement('h1');
    par.appendChild(elm);

    elm.before('string');
    elm.before(div);
    elm.before(p, 'another string', h1);

    assert.equal(par.childNodes.length, 6);
    assert.strictEqual(par.childNodes[0].data, 'string');
    assert.strictEqual(par.childNodes[1], div);
    assert.strictEqual(par.childNodes[2], p);
    assert.strictEqual(par.childNodes[3].data, 'another string');
    assert.strictEqual(par.childNodes[4], h1);
    assert.strictEqual(par.childNodes[5], elm);
    assert.strictEqual(elm.previousSibling, h1);
});

unit.test("after(*nodes)", function () {
    var par = document.createElement('div');
    var elm = document.createElement('div');
    var div = document.createElement('div');
    var p   = document.createElement('p');
    var h1  = document.createElement('h1');
    par.appendChild(elm);

    elm.after('string');
    elm.after(div);
    elm.after(p, 'another string', h1);

    assert.equal(par.childNodes.length, 6);
    assert.strictEqual(elm.nextSibling, p);
    assert.strictEqual(par.childNodes[0], elm);
    assert.strictEqual(par.childNodes[1], p);
    assert.strictEqual(par.childNodes[2].data, 'another string');
    assert.strictEqual(par.childNodes[3], h1);
    assert.strictEqual(par.childNodes[4], div);
    assert.strictEqual(par.childNodes[5].data, 'string');
});

unit.test("replace(*nodes)", function () {
    var par = document.createElement('div');
    var elm = document.createElement('div');
    var div = document.createElement('div');
    var p   = document.createElement('p');
    var h1  = document.createElement('h1');
    par.appendChild(elm);

    elm.replace('string');
    assert.equal(par.childNodes.length, 1);
    assert.equal(par.firstChild.data, 'string');

    par.firstChild.replace(div);
    assert.equal(par.childNodes.length, 1);
    assert.strictEqual(par.firstChild, div);

    par.firstChild.replace(p, 'another string', h1);
    assert.equal(par.childNodes.length, 3);
    assert.strictEqual(par.childNodes[0], p);
    assert.strictEqual(par.childNodes[1].data, 'another string');
    assert.strictEqual(par.childNodes[2], h1);
});

unit.test("remove()", function () {
    var elm = document.createElement('div');
    document.body.appendChild(elm);
    assert.strictEqual(elm.parentNode, document.body);
    elm.remove();
    assert.notStrictEqual(elm.parentNode, document.body);
});

unit.test("before() with no parent", function () {
    document.createElement('div').before(document.createElement('p'));
});

unit.test("after() with no parent", function () {
    document.createElement('div').before(document.createElement('p'));
});

unit.test("remove() with no parent", function () {
    document.createElement('div').remove();
});

