// DOM Events support for IE8
//
// Custom event dispatching is inspired by Prototype.js
// by Sam Stephenson http://www.prototypejs.org/
//
// Shim on the Event object is from Joshua Bell's polyfill
// http://calormen.com/polyfill/
//
// The real listener fixes the current target of event, then
// indirectly calls the custom launcher through the
// onpropertychange event, this in order for a failing listener
// to not affect the execution of other listeners
//
(function () {
    if (!Element.prototype.addEventListener) {
        var CUSTOM_EVENTS_COUNTER = 'data-custom-events-counter';

        Event.NONE            = 0;
        Event.AT_TARGET       = 1;
        Event.BUBBLING_PHASE  = 2;
        Event.CAPTURING_PHASE = 3;

        var bubblingEventTypes = [
            'click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mousemove', 'mouseout', 'mousewheel',
            'keydown', 'keypress', 'keyup',
            'resize', 'scroll',
            'select', 'change', 'submit', 'reset',
            'ondataavailable'
        ];

        var cancelableEventTypes = [
            'click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mouseout', 'mousewheel',
            'keydown', 'keypress', 'keyup',
            'submit',
            'ondataavailable', 'onlosecapture'
        ];

        Object.defineProperties(Event.prototype, {
            NONE:            { get: function () { return 0; } },
            AT_TARGET:       { get: function () { return 1; } },
            BUBBLING_PHASE:  { get: function () { return 2; } },
            CAPTURING_PHASE: { get: function () { return 3; } },

            type: { get: function () {
                return this._type;
            }},

            target: { get: function () {
                return this._target;
            }},

            currentTarget: { get: function () {
                return this._currentTarget;
            }},

            relatedTarget: { get: function () {
                switch (this.type) {
                case 'mouseover': return this.fromElement;
                case 'mouseout':  return this.toElement;
                }
                return null;
            }},

            eventPhase: { get: function () {
                return (this.srcElement === this.currentTarget) ? Event.AT_TARGET : Event.BUBBLING_PHASE;
            }},

            bubbles: { get: function () {
                return bubblingEventTypes.indexOf(this.type) !== -1;
            }},

            cancelable: { get: function () {
                return cancelableEventTypes.indexOf(this.type) !== -1;
            }},

            defaultPrevented: { get: function () {
                return this._returnValue === false;
            }},

            pageX: { get: function () {
                return this.clientX + document.scrollLeft;
            }},

            pageY: { get: function () {
                return this.clientY + document.scrollTop;
            }}
        });

        Event.prototype.preventDefault = function () {
            this._returnValue = false;
            this.returnValue = false;
        };

        Event.prototype.stopPropagation = function () {
            this._cancelBubble = true;
            this.cancelBubble = true;
        };

        Event.prototype.initEvent = function (type, canBubble, cancelable) {
            this.eventType = canBubble ? 'ondataavailable' : 'onlosecapture';
            this._type = type;
        };

        var createRealListener = function (self, type) {
            var _listener      = '_' + type + '_listener';
            var _event         = '_' + type + '_event';

            self._events[type] = {
                listeners: [],

                realListener: function (event) {
                    event._type = type;
                    event._currentTarget = self;

                    if (event._target === undefined) {
                        // Fix: we must set the target once, because srcElement
                        // is only the right value before the event bubbles up:
                        event._target = event.srcElement;
                    }
                    self[_event] = event;

                    for (var i = 0, l = self._events[type].listeners.length; i < l; i++) {
                        self[_listener] = self._events[type].listeners[i];
                    }

                    // Fix: the original values are resetted by IE8 after the
                    // customLauncher returns. We thus rely on copied values,
                    // and we reapply them here:
                    event.cancelBubble = event._cancelBubble;
                    event.returnValue  = event._returnValue;
                },

                customLauncher: function (event) {
                    // we use a custom launcher in order to prevent a failing
                    // listener to stop the listeners chain. It also prevents to
                    // rely on a try catch block, which would block any error
                    // generated by a failing listener:
                    if (event.propertyName === _listener) {
                        self[_listener].call(self, self[_event]);
                    }
                }
            };

            if (self['on' + type] !== undefined) {
                self.attachEvent('on' + type, self._events[type].realListener);
            } else {
                if (self.getAttribute(CUSTOM_EVENTS_COUNTER) === null) {
                    self.attachEvent('ondataavailable', self._events[type].realListener);
                    self.attachEvent('onlosecapture',   self._events[type].realListener);
                }
                self.setAttribute(CUSTOM_EVENTS_COUNTER, self.getAttribute(CUSTOM_EVENTS_COUNTER) + 1);
            }
            self.attachEvent('onpropertychange', self._events[type].customLauncher);
        };

        var deleteRealListener = function (self) {
            if (typeof self['on' + type] != 'undefined') {
                self.detachEvent('on' + type, self._events[type].realListener);
            } else if (self.getAttribute(CUSTOM_EVENTS_COUNTER) === 1) {
                self.detachEvent('ondataavailable', self._events[type].realListener);
                self.detachEvent('onlosecapture',   self._events[type].realListener);
                self.removeAttribute(CUSTOM_EVENTS_COUNTER);
            } else {
                self.setAttribute(CUSTOM_EVENTS_COUNTER, self.getAttribute(CUSTOM_EVENTS_COUNTER) - 1);
            }
            self.detachEvent('onpropertychange', self._events[type].customLauncher);

            delete self._events[type].realListener;
            delete self._events[type].customLauncher;
            delete self._events[type];
        };

        var addEventListener = function (type, listener, useCapture) {
            if (useCapture) {
                throw Error("Capture mode isn't supported by MSIE and isn't emulated.");
            }
            if (!this._events) {
                this._events = {};
            }
            if (!this._events[type]) {
                createRealListener(this, type);
            }
            this._events[type].listeners.push(listener);
        };

        var removeEventListener = function (type, listener, useCapture) {
            if (useCapture) {
                throw Error("Capture mode isn't supported by MSIE and isn't emulated.");
            }
            if (this._events) {
                if (this._events[type]) {
                    var idx = this._events[type].listeners.indexOf(listener);
                    if (idx > -1) {
                        delete this._events[type].listeners[idx];
                        this._events[type].listeners.splice(idx, 1);
                    }
                    if (this._events[type].listeners.length === 0) {
                        deleteRealListener(this, type);
                    }
                }
                if (this._events.length === 0) {
                    delete this._events;
                }
            }
        };

        document.createEvent = function () {
            return document.createEventObject();
        };

        var dispatchEvent = function (event) {
            return this.fireEvent(event.eventType, event);
        };

        Window.prototype.addEventListener    = HTMLDocument.prototype.addEventListener    = Element.prototype.addEventListener    = addEventListener;
        Window.prototype.removeEventListener = HTMLDocument.prototype.removeEventListener = Element.prototype.removeEventListener = removeEventListener;
        Window.prototype.dispatchEvent       = HTMLDocument.prototype.dispatchEvent       = Element.prototype.dispatchEvent       = dispatchEvent;

        if (document.attachEvent) {
            document.attachEvent('onreadystatechange', function () {
                var e = document.createEvent('HTMLEvents');
                e.initEvent('DOMContentLoaded', true, true);
                document.dispatchEvent(e);
            });
        }
    }
}());
