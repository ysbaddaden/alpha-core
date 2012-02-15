/**
 * Original code developed by Robert Nyman, http://www.robertnyman.com
 * Code/licensing: http://code.google.com/p/getelementsbyclassname/
 */

if (!document.getElementsByClassName) {
  if (document.evaluate) {
    // XPATH
    Alpha.getElementsByClassName = function (parent, className) {
      var classes = className.split(" ");
      var classesToCheck = "";
      var xhtmlNamespace = "http://www.w3.org/1999/xhtml";
      var namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace) ? xhtmlNamespace : null;
      var returnElements = [];
      var elements;
      var node;

      for (var i = 0, ilen = classes.length; i < ilen; i++) {
        classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[i] + " ')]";
      }

      try	{
        elements = document.evaluate(".//*" + classesToCheck, parent, namespaceResolver, 0, null);
      } catch (e) {
        elements = document.evaluate(".//*" + classesToCheck, parent, null, 0, null);
      }

      while ((node = elements.iterateNext())) {
        returnElements.push(node);
      }
      return new Alpha.NodeList(returnElements);
    };
  } else {
    // DOM PARSING (IE6+, IE7, etc.)
    Alpha.getElementsByClassName = function (parent, className) {
      var classes = className.split(" ");
      var classesToCheck = [];
      var elements = (parent.all) ? parent.all : parent.getElementsByTagName('*');
      var current;
      var returnElements = [];
      var match;
      var i, ilen;

      for (i = 0, ilen = classes.length; i < ilen; i++) {
        classesToCheck.push(new RegExp("(^|\\s)" + classes[i] + "(\\s|$)", 'i'));
      }
      for (i = 0, ilen = elements.length; i < ilen; i++) {
        current = elements[i];
        match = false;

        for (var j = 0, jlen = classesToCheck.length; j < jlen; j++) {
          match = classesToCheck[j].test(current.className);
          if (!match) {
            break;
          }
        }
        if (match) {
          returnElements.push(current);
        }
      }
      returnElements = Alpha.extendElements ? Alpha.extendElements(returnElements) : returnElements;
      return new Alpha.NodeList(returnElements);
    };
  }

  Element.prototype.getElementsByClassName = function(className) {
    return Alpha.getElementsByClassName(this, className);
  };

  document.getElementsByClassName = function(className) {
    return Alpha.getElementsByClassName(document, className);
  };
}
