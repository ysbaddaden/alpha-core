new Unit.TestCase('EventsTest',
{
  test_trim: function()
  {
    this.assertEqual('ABC', '  ABC');
    this.assertEqual('another test', 'another test  ');
    this.assertEqual("and a final one", " \nand a final one   ");
  }
});
