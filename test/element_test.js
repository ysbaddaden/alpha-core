Element.prototype.get_id = function() {
  return this.id;
}

new Unit.TestCase('ElementTest',
{
  setup: function()
  {
    this.div = document.createElement('div');
    this.div.innerHTML = '<div id="test"></div> <div id="toto">  <div id="tata">tata</div>      <div id="next2">next2</div><div id="next1">next1</div> </div>';
    document.body.appendChild(this.div);
  },

  teardown: function() {
    document.body.removeChild(this.div);
  },

  test_$_must_return_an_element_by_id: function()
  {
    var element = $('test');
    this.assertEqual(element.id, 'test');
  },

  test_$_must_extend_element: function()
  {
    var element = $('test');
    this.assertTypeOf('function', element.get_id);
  },

  test_getElementById_must_extend_element: function()
  {
    var element = $('test');
    this.assertTypeOf('function', element.get_id);
  },

  test_document_getElementByTagName_must_return_a_NodeList: function()
  {
    var elements = document.getElementsByTagName('div')
    this.assertTypeOf('function', elements.item(0).get_id);
  },

  test_document_getElementByTagName_must_extend_element: function()
  {
    var elements = document.getElementsByTagName('div')
    this.assertTypeOf('function', elements.item(0).get_id);
  },

  test_Element_getElementByTagName_must_return_a_NodeList: function()
  {
    var elements = $('toto').getElementsByTagName('div')
    this.assertTypeOf('function', elements.item(0).get_id);
  },

  test_Element_getElementByTagName_must_extend_element: function()
  {
    var elements = $('toto').getElementsByTagName('div')
    this.assertTypeOf('function', elements.item(0).get_id);
  },
  
  test_Element_getElementsByTagName_must_extend_elements: function()
  {
    var elements = $('toto').getElementsByTagName('div');
    this.assertTypeOf('function', elements.item(0).get_id);
  },

  test_Element_getElementByTagName_must_only_return_its_descendants: function()
  {
    var elements = $('toto').getElementsByTagName('div');
    this.assertEqual(elements.item(0).get_id(), 'tata');
  },

  test_childElementCount: function() {
    this.assertEqual(3, document.getElementById('toto').get('childElementCount'));
  },

  test_children: function()
  {
    var children = document.getElementById('toto').get('children');
    this.assertEqual(children[0].id, 'tata');
    this.assertEqual(children[1].id, 'next2');
    this.assertEqual(children[2].id, 'next1');
  },

  test_firstElementChild: function()
  {
    var child = document.getElementById('toto').get('firstElementChild');
    this.assertEqual('tata', child.id);
  },

  test_lastElementChild: function()
  {
    var child = document.getElementById('toto').get('lastElementChild');
    this.assertEqual('next1', child.id);
  },

  test_nextElementSibling: function()
  {
    var sibling = document.getElementById('tata').get('nextElementSibling');
    this.assertEqual('next2', sibling.id);
    
    var sibling = document.getElementById('next1').get('nextElementSibling');;
    this.assertNull(sibling);
  },

  test_previousElementSibling: function()
  {
    var sibling = document.getElementById('next1').get('previousElementSibling');
    this.assertEqual('next2', sibling.id);
    
    var sibling = document.getElementById('tata').get('previousElementSibling');
    this.assertNull(sibling);
  }
});

