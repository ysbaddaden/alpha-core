YUICOMP = java -jar bin/yuicompressor-2.4.2.jar

FILES=src/support/array.js \
	src/support/string.js \
	src/core.js \
	src/dom/dom.js \
	src/dom/element.js \
	src/dom/event.js \
	src/dom/window.js \
	src/selectors/sly.js \
	src/selectors/classname.js \
	src/support/xmlhttprequest.js \
	src/support/json2.js

all: core

core:
	cat $(FILES) > lib/alpha-core.js
	$(YUICOMP) lib/alpha-core.js > lib/alpha-core-compressed.js

