var FILES = [
  'array.js',
  'string.js',
  'core.js',
  'dom/dom.js',
  'dom/event.js',
  'dom/element.js',
  'dom/window.js',
  'selectors/classname.js',
  'selectors/sly.js',
  'json2.js',
  'xmlhttprequest.js'
];

for (var i=0; i<FILES.length; i++) {
  document.write('<script type="text/javascript" src="../lib/' + FILES[i] + '"></script>');
}
