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
    this.assertEqual(1, document.querySelectorAll('#main').length);
    this.assertEqual(1, document.querySelectorAll('#link').length);
  },

  test_tagName: function()
  {
    this.assertEqual(2, document.querySelectorAll('div').length);
    this.assertEqual(4, document.querySelectorAll('p').length);
    this.assertEqual(4, document.querySelectorAll('section').length);
    this.assertEqual(1, document.querySelectorAll('article').length);
  },

  test_className: function()
  {
    this.assertEqual(2, document.querySelectorAll('.block').length);
    this.assertEqual(2, document.querySelectorAll('.edit').length);
  },

  test_tagName_id_and_className: function()
  {
    this.assertEqual(2, document.querySelectorAll('a.edit').length);
    this.assertEqual(0, document.querySelectorAll('a.nothing').length);
    this.assertEqual(1, document.querySelectorAll('a#link').length);
    this.assertEqual(1, document.querySelectorAll('a#link.edit').length);
  },

  test_descendant_child: function()
  {
    this.assertEqual(3, document.querySelectorAll('div p').length);
    this.assertEqual(0, document.querySelectorAll('p div').length);
    this.assertEqual(3, document.querySelectorAll('div p a').length);
    this.assertEqual(2, document.querySelectorAll('div .edit').length);
    this.assertEqual(2, document.querySelectorAll('div a.edit').length);
    this.assertEqual(1, document.querySelectorAll('div a#link').length);
    this.assertEqual(0, document.querySelectorAll('div a#nothing .more').length);
    this.assertEqual(0, document.querySelectorAll('div a#bug').length);
  },

  test_operators: function()
  {
    this.assertEqual(2, document.querySelectorAll('div > p').length);
    this.assertEqual(1, document.querySelectorAll('article > p').length);
    this.assertEqual(1, document.querySelectorAll('p + p').length);
    this.assertEqual(1, document.querySelectorAll('div + p').length);
    this.assertEqual(2, document.querySelectorAll('section+section').length);
    this.assertEqual(1, document.querySelectorAll('section + section.toc').length);
    this.assertEqual(3, document.querySelectorAll('section ~ section').length);
    this.assertEqual(10, document.querySelectorAll('div, p, a').length);
  },

  test_attributes: function()
  {
    this.assertEqual(3, document.querySelectorAll('a[class]').length);
    this.assertEqual(3, document.querySelectorAll('a[class]').length);
    this.assertEqual(1, document.querySelectorAll('a[lang][class]').length);
    this.assertEqual(1, document.querySelectorAll('a[class=edit]').length);
    this.assertEqual(1, document.querySelectorAll('a[class~=test]').length);
    this.assertEqual(2, document.querySelectorAll('[data-name|=dtd]').length);
    this.assertEqual(1, document.querySelectorAll('article[data-name|=dtd]').length);
    this.assertEqual(1, document.querySelectorAll('article[data-name^=dtd]').length);
    this.assertEqual(1, document.querySelectorAll('article[data-name$=ample]').length);
    this.assertEqual(1, document.querySelectorAll('article[data-name*=exam]').length);
  },

  test_firstChild_pseudo_selector: function()
  {
    this.assertEqual(3, document.querySelectorAll('a:first-child').length);
    this.assertEqual(5, document.querySelectorAll('div.block :first-child').length);
  },

  test_lastChild_pseudo_selector: function()
  {
    this.assertEqual(1, document.querySelectorAll('p:last-child').length);
    this.assertEqual(5, document.querySelectorAll('div.block :last-child').length);
  },

  test_nthChild_pseudo_selector: function()
  {
    this.assertEqual(1, document.querySelectorAll('p:nth-child(2)').length);
    this.assertEqual(3, document.querySelectorAll('a:nth-child(1)').length);
  },

  test_onlyChild_pseudo_selector: function()
  {
    this.assertEqual(1, document.querySelectorAll('p:only-child').length);
    this.assertEqual(2, document.querySelectorAll('div.block :only-child').length);
  }
});

new Unit.TestCase('GetElementsByClassNameTests',
{
  test_getElementsByClassName_prototype: function()
  {
    this.assertTypeOf('function', document.getElementsByClassName);
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

