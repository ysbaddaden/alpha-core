new Unit.TestCase('ClassListTest',
{
  setup: function()
  {
    this.div = document.createElement('div');
    this.div.className = 'some class names';
  },

  test_classList_getter: function()
  {
    this.assertNotUndefined(this.div.classList);
    this.assertTypeOf('function', this.div.classList.add);
    this.assertTypeOf('function', this.div.classList.remove);
    this.assertTypeOf('function', this.div.classList.toggle);
    this.assertTypeOf('function', this.div.classList.item);
    this.assertTypeOf('function', this.div.classList.contains);
  },

  test_classList_contains: function()
  {
    this.assertTrue(this.div.classList.contains("some"));
    this.assertTrue(this.div.classList.contains("class"));
  },

  test_classList_add: function()
  {
    this.div.classList.add("other");
    this.assertTrue(this.div.classList.contains("other"));
  },

  test_classList_remove: function()
  {
    this.div.classList.remove("some");
    this.assertFalse(this.div.classList.contains("some"));
  },

  test_classList_toggle: function()
  {
    this.div.classList.toggle("some");
    this.assertFalse(this.div.classList.contains("some"), "should have removed className");
    
    this.div.classList.toggle("some");
    this.assertTrue(this.div.classList.contains("some"), "should have added className");
  },

  test_classList_item: function()
  {
    this.assertEqual('some',  this.div.classList.item(0));
    this.assertEqual('class', this.div.classList.item(1));
    this.assertEqual('names', this.div.classList.item(2));
  }
});

