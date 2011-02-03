new Unit.TestCase('EventsTest',
{
  setup: function()
  {
    this.input = document.createElement('input');
    this.div = document.createElement('div');
    this.div.appendChild(this.input);
    document.body.appendChild(this.div);
  },

  teardown: function() {
    document.body.removeChild(this.div);
  },

  test_event_must_be_prototyped: function() {
    this.assertEqual('object', typeof Event.prototype);
  },

  test_window_addEventListener: function() {
    this.assertTypeOf('function', window.addEventListener);
  },

  test_document_body_addEventListener: function() {
    this.assertTypeOf('function', document.body.addEventListener);
  },

  test_document_documentElement_addEventListener: function() {
    this.assertTypeOf('function', document.documentElement.addEventListener);
  },

  test_addEventListener_with_one_listener: function()
  {
    var test;
    this.input.addEventListener('click', function() { test = true }, false);
    this.input.click();
    this.assertTrue(test);
  },

  test_addEventListener_with_many_listeners: function()
  {
    var test = 0;
    this.input.addEventListener('click', function() { test += 1 }, false);
    this.input.addEventListener('click', function() { test += 2 }, false);
    this.input.click();
    this.assertEqual(3, test);
  },

  test_removeEventListener: function()
  {
    var test = null, fn = function() { test = true }
    this.input.addEventListener('click', fn, false);
    this.input.removeEventListener('click', fn, false);
    this.input.click();
    this.assertNull(test);
  },

  test_event_type: function()
  {
    var type;
    this.input.addEventListener('click', function(evt) { type = evt.type }, false);
    this.input.click();
    this.assertEqual(type, 'click');
  },

  test_event_bubbling: function()
  {
    var test, fn = function(evt) { test = false }
    
    this.input.addEventListener('click', function(evt) { test = true }, false);
    this.div.addEventListener('click', fn, false);
    this.input.click();
    this.assertFalse(test);
    
    this.div.removeEventListener('click', fn, false);
  },

  test_stopPropagation: function()
  {
    var test = null;
    
    function fn(evt) { test = 1 }
    
    this.input.addEventListener('click', function(evt) { test = true; evt.stopPropagation(); }, false);
    this.input.addEventListener('click', function(evt) { test = false; }, false);
    this.div.addEventListener('click', fn, false);
    
    this.input.click();
    this.assertFalse(test);
    
    this.div.removeEventListener('click', fn, false);
  },

  test_clearEvents: function()
  {
    if (Element.prototype.clearEvents)
    {
      var test = null;
      this.input.addEventListener('click', function(evt) { test = true  }, false);
      this.input.addEventListener('click', function(evt) { test = false }, false);
      this.input.clearEvents();
      this.input.click();
      this.assertNull(test);
    }
  },

  test_throwing_an_error_musnt_stop_further_listeners: function()
  {
    var test = null;
    
    this.input.addEventListener('click', function()
    {
      test = true;
      throw new Error("This ERROR IS EXPECTED, please discard.");
    }, false);
    
    this.input.addEventListener('click', function() { test = false }, false);
    this.input.click();
    this.assertFalse(test);
  },

  test_addEventListener_with_custom_event: function()
  {
    this.async();
    
    var self = this;
    this.input.addEventListener('custom', function(event)
    {
      self.sync(function() {
        this.assertEqual('custom', event.type);
      });
    }, false);
    
    var e = document.createEvent('Event');
    e.initEvent('custom', true, true);
    this.assertTrue(this.input.dispatchEvent(e));
  },

  test_removeEventListener_with_custom_event: function()
  {
    this.async();
    
    var self = this, test = null;
    var fn = function(event) { test = true }
    
    this.input.addEventListener('custom', fn, false);
    this.input.addEventListener('custom', function(event)
    {
      self.sync(function() {
        this.assertNull(test);
      });
    }, false);
    this.input.removeEventListener('custom', fn, false);
    
    var e = document.createEvent('HTMLEvents');
    e.initEvent('custom', true, true);
    this.assertTrue(this.input.dispatchEvent(e));
  }
});
