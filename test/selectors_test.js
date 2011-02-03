// IE will fail since it doesn't understand any HTML5 elements,
// and looks like it refuses to consider them as elements :/

new Unit.TestCase('QuerySelectorTest',
{
  test_querySelectorAll_prototype: function()
  {
    this.assertTypeOf('function', document.querySelectorAll);
    this.assertTypeOf('function', Element.prototype.querySelectorAll);
    this.assertTypeOf('function', document.createElement('div').querySelectorAll);
  },

  test_querySelector_prototype: function()
  {
    this.assertTypeOf('function', document.querySelector);
    this.assertTypeOf('function', Element.prototype.querySelector);
    this.assertTypeOf('function', document.createElement('div').querySelector);
  },

  test_id: function()
  {
    this.assertEqual(document.querySelectorAll('#main').length, 1);
    this.assertEqual(document.querySelectorAll('#link').length, 1);
  },

  test_tagName: function()
  {
    this.assertEqual(document.querySelectorAll('div').length, 2);
    this.assertEqual(document.querySelectorAll('p').length, 4);
  },

  test_className: function()
  {
    this.assertEqual(document.querySelectorAll('.block').length, 2);
    this.assertEqual(document.querySelectorAll('.edit').length, 2);
  },

  test_tagName_id_and_className: function()
  {
    this.assertEqual(document.querySelectorAll('a.edit').length, 2);
    this.assertEqual(document.querySelectorAll('a.nothing').length, 0);
    this.assertEqual(document.querySelectorAll('a#link').length, 1);
    this.assertEqual(document.querySelectorAll('a#link.edit').length, 1);
  },

  test_descendant_child: function()
  {
    this.assertEqual(document.querySelectorAll('div p').length, 3);
    this.assertEqual(document.querySelectorAll('p div').length, 0);
    this.assertEqual(document.querySelectorAll('div p a').length, 3);
    this.assertEqual(document.querySelectorAll('div .edit').length, 2);
    this.assertEqual(document.querySelectorAll('div a.edit').length, 2);
    this.assertEqual(document.querySelectorAll('div a#link').length, 1);
    this.assertEqual(document.querySelectorAll('div a#nothing .more').length, 0);
    this.assertEqual(document.querySelectorAll('div a#bug').length, 0);
  },

  test_operators: function()
  {
    this.assertEqual(document.querySelectorAll('div > p').length, 2);
    this.assertEqual(document.querySelectorAll('article > p').length, 1);
    this.assertEqual(document.querySelectorAll('p + p').length, 1);
    this.assertEqual(document.querySelectorAll('div + p').length, 1);
    this.assertEqual(document.querySelectorAll('section+section').length, 2);
    this.assertEqual(document.querySelectorAll('section + section.toc').length, 1);
    this.assertEqual(document.querySelectorAll('section ~ section').length, 3);
    this.assertEqual(document.querySelectorAll('div, p, a').length, 10);
  },

  test_attributes: function()
  {
    this.assertEqual(document.querySelectorAll('a[class]').length, 3);
    this.assertEqual(document.querySelectorAll('a[href]').length, 4);
    this.assertEqual(document.querySelectorAll('a[class][href]').length, 3);
    this.assertEqual(document.querySelectorAll('a[href][lang][class]').length, 1);
    this.assertEqual(document.querySelectorAll('a[lang][class]').length, 1);
    this.assertEqual(document.querySelectorAll('a[class=edit]').length, 1);
    this.assertEqual(document.querySelectorAll('a[class~=test]').length, 1);
    this.assertEqual(document.querySelectorAll('article[class|=dtd]').length, 1);
    this.assertEqual(document.querySelectorAll('article[class^=dtd]').length, 1);
    this.assertEqual(document.querySelectorAll('article[class$=ample]').length, 1);
    this.assertEqual(document.querySelectorAll('article[class*=exam]').length, 1);
  },

  test_pseudo_selectors: function()
  {
  this.assertEqual(document.querySelectorAll('a:first-child').length, 3);
  this.assertEqual(document.querySelectorAll('p:last-child').length, 1);
  this.assertEqual(document.querySelectorAll('p:only-child').length, 1);
  this.assertEqual(document.querySelectorAll('div.block :first-child').length, 5);
  this.assertEqual(document.querySelectorAll('div.block :last-child').length, 5);
  this.assertEqual(document.querySelectorAll('div.block :only-child').length, 2);
  }
});

new Unit.TestCase('GetElementsByClassNameTests',
{
  test_getElementsByClassName_prototype: function()
  {
    this.assertTypeOf('function', document.getElementsByClassName);
    this.assertTypeOf('function', Element.prototype.getElementsByClassName);
    this.assertTypeOf('function', document.createElement('div').getElementsByClassName);
  },

  test_getElementsByClassname: function()
  {
    var c = document.getElementsByClassName('c').item(0);
    this.assertEqual(c.className, 'c');
    
    var more = c.getElementsByClassName('more').item(0);
    this.assertEqual(more.id, 'bug');
  }
});
