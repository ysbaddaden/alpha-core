IE8=src/html5.js \
	src/es5-shim.js \
	src/events.js \
	src/getelementsbyclassname.js \
	src/classlist.js \
	src/dom4.js \
	src/window.js

CORE=src/classlist.js \
	src/dom4.js

all: core

core:
	cat $(IE8) > lib/core-ie8.js
	cat $(CORE) > lib/core.js

