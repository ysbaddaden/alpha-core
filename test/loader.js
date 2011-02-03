var FILES = [
  'support/array.js',
  'support/string.js',
  'core.js',
  'dom/dom.js',
  'dom/event.js',
  'dom/element.js',
  'dom/window.js',
  'selectors/sly.js',
  'selectors/classname.js',
  'support/xmlhttprequest.js',
  'support/json2.js'
];

for (var i=0; i<FILES.length; i++) {
  document.write('<script type="text/javascript" src="../src/' + FILES[i] + '"></script>');
}
