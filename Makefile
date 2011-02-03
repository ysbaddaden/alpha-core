YUICOMP = java -jar bin/yuicompressor-2.4.2.jar

FILES=lib/array.js \
	lib/string.js \
	lib/core.js \
	lib/dom/dom.js \
	lib/dom/element.js \
	lib/dom/event.js \
	lib/dom/window.js \
	lib/selectors/sly.js \
	lib/selectors/classname.js \
	lib/xmlhttprequest.js \
	lib/json2.js

all: core

core:
	cat $(FILES) > lib/alpha-core.js
	$(YUICOMP) lib/alpha-core.js > lib/alpha-core-compressed.js

