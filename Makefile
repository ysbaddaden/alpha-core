YUICOMP = java -jar bin/yuicompressor-2.4.2.jar

FILES=src/array.js \
	src/string.js \
	src/core.js \
	src/dom/dom.js \
	src/dom/element.js \
	src/dom/event.js \
	src/dom/window.js \
	src/selectors/sly.js \
	src/selectors/classname.js \
	src/xmlhttprequest.js \
	src/json2.js

all: core

core:
	cat $(FILES) > lib/alpha-core.js
	$(YUICOMP) lib/alpha-core.js > lib/alpha-core-compressed.js

