// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/embla-carousel/embla-carousel.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function Alignment(params) {
  var viewSize = params.viewSize,
      align = params.align;
  var predefined = {
    start: start,
    center: center,
    end: end
  };

  function start() {
    return 0;
  }

  function center(n) {
    return end(n) / 2;
  }

  function end(n) {
    return viewSize - n;
  }

  function percent() {
    return viewSize * Number(align);
  }

  function measure(n) {
    if (typeof align === 'number') return percent();
    return predefined[align](n);
  }

  var self = {
    measure: measure
  };
  return self;
}

function Animation(callback) {
  var animationFrame = 0;

  function ifAnimating(active, cb) {
    return function () {
      if (active === !!animationFrame) cb();
    };
  }

  function start() {
    animationFrame = window.requestAnimationFrame(callback);
  }

  function stop() {
    window.cancelAnimationFrame(animationFrame);
    animationFrame = 0;
  }

  var self = {
    proceed: ifAnimating(true, start),
    start: ifAnimating(false, start),
    stop: ifAnimating(true, stop)
  };
  return self;
}

function Axis(axis) {
  var scroll = axis === 'y' ? 'y' : 'x';
  var cross = axis === 'y' ? 'x' : 'y';

  function measure(node) {
    var _a = node.getBoundingClientRect(),
        width = _a.width,
        height = _a.height;

    return scroll === 'x' ? width : height;
  }

  var self = {
    cross: cross,
    measure: measure,
    scroll: scroll
  };
  return self;
}

function map(value, iStart, iStop, oStart, oStop) {
  return oStart + (oStop - oStart) * ((value - iStart) / (iStop - iStart));
}

function mathSign(n) {
  return !n ? 0 : n / Math.abs(n);
}

function deltaAbs(valueB, valueA) {
  return Math.abs(valueB - valueA);
}

function factorAbs(valueB, valueA) {
  if (valueB === 0 || valueA === 0) return 0;
  if (Math.abs(valueB) <= Math.abs(valueA)) return 0;
  var diff = deltaAbs(Math.abs(valueB), Math.abs(valueA));
  return Math.abs(diff / valueB);
}

function roundToDecimals(decimalPoints) {
  var pow = Math.pow(10, decimalPoints);
  return function (n) {
    return Math.round(n * pow) / pow;
  };
}

function debounce(callback, time) {
  var timeout = 0;
  return function () {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(callback, time) || 0;
  };
}

function groupArray(array, size) {
  var groups = [];

  for (var i = 0; i < array.length; i += size) {
    groups.push(array.slice(i, i + size));
  }

  return groups;
}

function arrayKeys(array) {
  return Object.keys(array).map(Number);
}

function removeClass(node, className) {
  var cl = node.classList;
  if (className && cl.contains(className)) cl.remove(className);
}

function addClass(node, className) {
  var cl = node.classList;
  if (className && !cl.contains(className)) cl.add(className);
}

function Counter(params) {
  var start = params.start,
      limit = params.limit,
      loop = params.loop;
  var min = limit.min,
      max = limit.max;
  var type = loop ? 'loop' : 'constrain';
  var withinLimit = limit[type];
  var counter = withinLimit(start);

  function get() {
    return counter;
  }

  function set(n) {
    counter = withinLimit(n);
    return self;
  }

  function add(n) {
    if (n !== 0) {
      var sign = mathSign(n);
      set(get() + sign);
      return add(n + sign * -1);
    }

    return self;
  }

  function clone() {
    return Counter({
      start: get(),
      limit: limit,
      loop: loop
    });
  }

  var self = {
    add: add,
    clone: clone,
    get: get,
    max: max,
    min: min,
    set: set
  };
  return self;
}

function Direction(direction) {
  var sign = direction === 'rtl' ? -1 : 1;

  function applyTo(n) {
    return n * sign;
  }

  var self = {
    applyTo: applyTo
  };
  return self;
}

function EventStore() {
  var listeners = [];

  function add(node, type, handler, options) {
    if (options === void 0) {
      options = false;
    }

    node.addEventListener(type, handler, options);
    listeners.push(function () {
      return node.removeEventListener(type, handler, options);
    });
    return self;
  }

  function removeAll() {
    listeners = listeners.filter(function (remove) {
      return remove();
    });
    return self;
  }

  var self = {
    add: add,
    removeAll: removeAll
  };
  return self;
}

function Vector1D(value) {
  var vector = value;

  function get() {
    return vector;
  }

  function set(n) {
    vector = readNumber(n);
    return self;
  }

  function add(n) {
    vector += readNumber(n);
    return self;
  }

  function subtract(n) {
    vector -= readNumber(n);
    return self;
  }

  function multiply(n) {
    vector *= n;
    return self;
  }

  function divide(n) {
    vector /= n;
    return self;
  }

  function normalize() {
    if (vector !== 0) divide(vector);
    return self;
  }

  function readNumber(n) {
    return typeof n === 'number' ? n : n.get();
  }

  var self = {
    add: add,
    divide: divide,
    get: get,
    multiply: multiply,
    normalize: normalize,
    set: set,
    subtract: subtract
  };
  return self;
}

function DragHandler(params) {
  var target = params.target,
      scrollBody = params.scrollBody,
      dragFree = params.dragFree,
      animation = params.animation,
      axis = params.axis,
      scrollTo = params.scrollTo;
  var root = params.root,
      dragTracker = params.dragTracker,
      location = params.location,
      events = params.events,
      limit = params.limit,
      direction = params.direction;
  var scrollAxis = axis.scroll,
      crossAxis = axis.cross;
  var focusNodes = ['INPUT', 'SELECT', 'TEXTAREA'];
  var startScroll = Vector1D(0);
  var startCross = Vector1D(0);
  var dragStartPoint = Vector1D(0);
  var activationEvents = EventStore();
  var interactionEvents = EventStore();
  var snapForceBoost = {
    mouse: 2.5,
    touch: 3.5
  };
  var freeForceBoost = {
    mouse: 5,
    touch: 7
  };
  var baseSpeed = dragFree ? 5 : 12;
  var dragThreshold = 4;
  var pointerIsDown = false;
  var preventScroll = false;
  var preventClick = false;
  var isMouse = false;

  function addActivationEvents() {
    var node = root;
    activationEvents.add(node, 'touchmove', function () {
      return undefined;
    }).add(node, 'touchend', function () {
      return undefined;
    }).add(node, 'touchstart', down).add(node, 'mousedown', down).add(node, 'touchcancel', up).add(node, 'contextmenu', up).add(node, 'click', click);
  }

  function addInteractionEvents() {
    var node = !isMouse ? root : document;
    interactionEvents.add(node, 'touchmove', move).add(node, 'touchend', up).add(node, 'mousemove', move).add(node, 'mouseup', up);
  }

  function removeAllEvents() {
    activationEvents.removeAll();
    interactionEvents.removeAll();
  }

  function isFocusNode(node) {
    var name = node.nodeName || '';
    return focusNodes.indexOf(name) > -1;
  }

  function forceBoost() {
    var boost = dragFree ? freeForceBoost : snapForceBoost;
    var type = isMouse ? 'mouse' : 'touch';
    return boost[type];
  }

  function allowedForce(force) {
    var scrollTarget = params.scrollTarget,
        index = params.index;
    var currentLocation = scrollTarget.byDistance(0, false);
    var targetChanged = currentLocation.index !== index.get();
    var seekNext = !targetChanged && Math.abs(force) > dragThreshold;
    var destination = force + location.get();

    if (seekNext && !dragFree && !limit.reachedAny(destination)) {
      var next = index.clone().add(mathSign(force) * -1);
      return scrollTarget.byIndex(next.get(), 0).distance;
    }

    return scrollTarget.byDistance(force, !dragFree).distance;
  }

  function down(evt) {
    isMouse = evt.type === 'mousedown';
    if (isMouse && evt.button !== 0) return;
    var isMoving = deltaAbs(target.get(), location.get()) >= 2;
    var clearPreventClick = isMouse || !isMoving;
    var isNotFocusNode = !isFocusNode(evt.target);
    var preventDefault = isMoving || isMouse && isNotFocusNode;
    pointerIsDown = true;
    dragTracker.pointerDown(evt);
    dragStartPoint.set(target);
    target.set(location);
    scrollBody.useBaseMass().useSpeed(80);
    addInteractionEvents();
    startScroll.set(dragTracker.readPoint(evt, scrollAxis));
    startCross.set(dragTracker.readPoint(evt, crossAxis));
    events.emit('pointerDown');
    if (clearPreventClick) preventClick = false;
    if (preventDefault) evt.preventDefault();
  }

  function move(evt) {
    if (!preventScroll && !isMouse) {
      if (!evt.cancelable) return up();
      var moveScroll = dragTracker.readPoint(evt, scrollAxis).get();
      var moveCross = dragTracker.readPoint(evt, crossAxis).get();
      var diffScroll = deltaAbs(moveScroll, startScroll.get());
      var diffCross = deltaAbs(moveCross, startCross.get());
      preventScroll = diffScroll > diffCross;
      if (!preventScroll && !preventClick) return up();
    }

    var diff = dragTracker.pointerMove(evt);
    if (!preventClick && diff) preventClick = true;
    animation.start();
    target.add(direction.applyTo(diff));
    evt.preventDefault();
  }

  function up() {
    var rawForce = dragTracker.pointerUp() * forceBoost();
    var force = allowedForce(direction.applyTo(rawForce));
    var speedFactor = factorAbs(rawForce, force);
    var isMoving = deltaAbs(target.get(), dragStartPoint.get()) >= 0.5;
    if (isMoving && !isMouse) preventClick = true;
    preventScroll = false;
    pointerIsDown = false;
    interactionEvents.removeAll();
    scrollBody.useSpeed(baseSpeed + baseSpeed * speedFactor);
    scrollTo.distance(force, !dragFree);
    isMouse = false;
    events.emit('pointerUp');
  }

  function click(evt) {
    if (preventClick) evt.preventDefault();
  }

  function clickAllowed() {
    return !preventClick;
  }

  function pointerDown() {
    return pointerIsDown;
  }

  var self = {
    addActivationEvents: addActivationEvents,
    clickAllowed: clickAllowed,
    pointerDown: pointerDown,
    removeAllEvents: removeAllEvents
  };
  return self;
}

function DragTracker(params) {
  var axis = params.axis,
      pxToPercent = params.pxToPercent;
  var scrollAxis = axis.scroll;
  var coords = {
    x: 'clientX',
    y: 'clientY'
  };
  var startDrag = Vector1D(0);
  var diffDrag = Vector1D(0);
  var lastDrag = Vector1D(0);
  var pointValue = Vector1D(0);
  var trackInterval = 10;
  var trackLength = 5;
  var trackTime = 100;
  var trackPoints = [];
  var lastMoveTime = new Date().getTime();
  var isMouse = false;

  function readPoint(evt, type) {
    isMouse = !evt.touches;
    var c = coords[type];
    var value = isMouse ? evt[c] : evt.touches[0][c];
    return pointValue.set(value);
  }

  function pointerDown(evt) {
    var point = readPoint(evt, scrollAxis);
    startDrag.set(point);
    lastDrag.set(point);
    return pxToPercent.measure(startDrag.get());
  }

  function pointerMove(evt) {
    var point = readPoint(evt, scrollAxis);
    var nowTime = new Date().getTime();
    var diffTime = nowTime - lastMoveTime;

    if (diffTime >= trackInterval) {
      if (diffTime >= trackTime) trackPoints = [];
      trackPoints.push(point.get());
      lastMoveTime = nowTime;
    }

    diffDrag.set(point).subtract(lastDrag);
    lastDrag.set(point);
    return pxToPercent.measure(diffDrag.get());
  }

  function pointerUp() {
    var nowTime = new Date().getTime();
    var diffTime = nowTime - lastMoveTime;
    var currentPoint = lastDrag.get();
    var force = trackPoints.slice(-trackLength).map(function (trackPoint) {
      return currentPoint - trackPoint;
    }).sort(function (p1, p2) {
      return Math.abs(p1) < Math.abs(p2) ? 1 : -1;
    })[0];
    lastDrag.set(diffTime > trackTime || !force ? 0 : force);
    trackPoints = [];
    return pxToPercent.measure(lastDrag.get());
  }

  var self = {
    pointerDown: pointerDown,
    pointerMove: pointerMove,
    pointerUp: pointerUp,
    readPoint: readPoint
  };
  return self;
}

function Limit(params) {
  var min = params.min,
      max = params.max;
  var length = Math.abs(min - max);

  function reachedMin(n) {
    return n < min;
  }

  function reachedMax(n) {
    return n > max;
  }

  function reachedAny(n) {
    return reachedMin(n) || reachedMax(n);
  }

  function removeOffset(n) {
    if (min === max) return n;

    while (reachedMin(n)) {
      n += length;
    }

    while (reachedMax(n)) {
      n -= length;
    }

    return n;
  }

  function loop(n) {
    if (!reachedAny(n)) return n;
    return reachedMin(n) ? max : min;
  }

  function constrain(n) {
    if (!reachedAny(n)) return n;
    return reachedMin(n) ? min : max;
  }

  var self = {
    constrain: constrain,
    length: length,
    loop: loop,
    max: max,
    min: min,
    reachedAny: reachedAny,
    reachedMax: reachedMax,
    reachedMin: reachedMin,
    removeOffset: removeOffset
  };
  return self;
}

function PxToPercent(viewInPx) {
  var totalPercent = 100;

  function measure(n) {
    return n / viewInPx * totalPercent;
  }

  var self = {
    measure: measure,
    totalPercent: totalPercent
  };
  return self;
}

function ScrollBody(params) {
  var location = params.location,
      baseSpeed = params.speed,
      baseMass = params.mass;
  var roundToTwoDecimals = roundToDecimals(2);
  var velocity = Vector1D(0);
  var acceleration = Vector1D(0);
  var attraction = Vector1D(0);
  var attractionDirection = 0;
  var speed = baseSpeed;
  var mass = baseMass;

  function update() {
    velocity.add(acceleration);
    location.add(velocity);
    acceleration.multiply(0);
  }

  function applyForce(v) {
    v.divide(mass);
    acceleration.add(v);
  }

  function seek(v) {
    attraction.set(v).subtract(location);
    var magnitude = attraction.get();
    var m = map(magnitude, 0, 100, 0, speed);
    attractionDirection = mathSign(attraction.get());
    attraction.normalize().multiply(m).subtract(velocity);
    applyForce(attraction);
    return self;
  }

  function settle(v) {
    var diff = v.get() - location.get();
    var diffRounded = roundToTwoDecimals(diff);
    var hasSettled = !diffRounded;
    if (hasSettled) location.set(v);
    return hasSettled;
  }

  function direction() {
    return attractionDirection;
  }

  function useSpeed(n) {
    speed = n;
    return self;
  }

  function useMass(n) {
    mass = n;
    return self;
  }

  function useBaseSpeed() {
    return useSpeed(baseSpeed);
  }

  function useBaseMass() {
    return useMass(baseMass);
  }

  var self = {
    direction: direction,
    seek: seek,
    settle: settle,
    update: update,
    useBaseMass: useBaseMass,
    useBaseSpeed: useBaseSpeed,
    useMass: useMass,
    useSpeed: useSpeed
  };
  return self;
}

function ScrollBounds(params) {
  var limit = params.limit,
      location = params.location,
      scrollBody = params.scrollBody;
  var pullBackThreshold = 10;
  var disabled = false;

  function shouldConstrain(target) {
    if (disabled) return false;
    if (!limit.reachedAny(target.get())) return false;
    if (!limit.reachedAny(location.get())) return false;
    return true;
  }

  function constrain(target, pointerDown) {
    if (!shouldConstrain(target)) return;
    var friction = pointerDown ? 0.7 : 0.4;
    var diffToTarget = target.get() - location.get();
    target.subtract(diffToTarget * friction);

    if (!pointerDown && Math.abs(diffToTarget) < pullBackThreshold) {
      target.set(limit.constrain(target.get()));
      scrollBody.useSpeed(10).useMass(3);
    }
  }

  function toggleActive(active) {
    disabled = !active;
  }

  var self = {
    constrain: constrain,
    toggleActive: toggleActive
  };
  return self;
}

function ScrollContain(params) {
  var alignment = params.alignment,
      contentSize = params.contentSize,
      viewSize = params.viewSize;
  var scrollBounds = Limit({
    min: -contentSize + viewSize,
    max: 0
  });
  var alignedWithinView = [alignment.measure(contentSize)];
  var contentExceedsView = contentSize > viewSize;

  function findDuplicates(scrollSnaps) {
    var startSnap = scrollSnaps[0];
    var endSnap = scrollSnaps[scrollSnaps.length - 1];
    var min = scrollSnaps.lastIndexOf(startSnap) + 1;
    var max = scrollSnaps.indexOf(endSnap);
    return Limit({
      min: min,
      max: max
    });
  }

  function measure(scrollSnaps, trim) {
    var containedSnaps = scrollSnaps.map(scrollBounds.constrain);

    var _a = findDuplicates(containedSnaps),
        min = _a.min,
        max = _a.max;

    if (!contentExceedsView) return alignedWithinView;
    if (!trim) return containedSnaps;
    return containedSnaps.slice(min - 1, max + 1);
  }

  var self = {
    measure: measure
  };
  return self;
}

function ScrollLimit(params) {
  var contentSize = params.contentSize,
      loop = params.loop;

  function measure(scrollSnaps) {
    var startSnap = scrollSnaps[0];
    var endSnap = scrollSnaps[scrollSnaps.length - 1];
    var min = loop ? startSnap - contentSize : endSnap;
    var max = startSnap;
    return Limit({
      min: min,
      max: max
    });
  }

  var self = {
    measure: measure
  };
  return self;
}

function ScrollLooper(params) {
  var contentSize = params.contentSize,
      location = params.location,
      limit = params.limit,
      pxToPercent = params.pxToPercent;
  var min = limit.min + pxToPercent.measure(0.1);
  var max = limit.max + pxToPercent.measure(0.1);

  var _a = Limit({
    min: min,
    max: max
  }),
      reachedMin = _a.reachedMin,
      reachedMax = _a.reachedMax;

  function shouldLoop(direction) {
    if (direction === 1) return reachedMax(location.get());
    if (direction === -1) return reachedMin(location.get());
    return false;
  }

  function loop(vectors, direction) {
    if (!shouldLoop(direction)) return;
    var loopDistance = contentSize * (direction * -1);
    vectors.forEach(function (v) {
      return v.add(loopDistance);
    });
  }

  var self = {
    loop: loop
  };
  return self;
}

function ScrollProgress(params) {
  var _a = params.limit,
      max = _a.max,
      scrollLength = _a.length;

  function get(n) {
    var currentLocation = n - max;
    return currentLocation / -scrollLength;
  }

  var self = {
    get: get
  };
  return self;
}

function ScrollSnap(params) {
  var snapSizes = params.snapSizes,
      alignment = params.alignment,
      loop = params.loop;
  var alignments = snapSizes.map(alignment.measure);
  var distancesBetween = distancesBetweenScrollSnaps();

  function distancesBetweenScrollSnaps() {
    var limit = Limit({
      min: 0,
      max: snapSizes.length - 1
    });
    var counter = Counter({
      limit: limit,
      start: 0,
      loop: loop
    });
    return snapSizes.map(function (size, index) {
      var next = counter.set(index + 1).get();
      return size + alignments[index] - alignments[next];
    });
  }

  function measure(index) {
    var sizes = distancesBetween.slice(0, index);
    return sizes.reduce(function (a, s) {
      return a - s;
    }, alignments[0]);
  }

  var self = {
    measure: measure
  };
  return self;
}

function ScrollTarget(params) {
  var loop = params.loop,
      limit = params.limit,
      scrollSnaps = params.scrollSnaps,
      contentSize = params.contentSize;
  var reachedMax = limit.reachedMax,
      reachedAny = limit.reachedAny,
      removeOffset = limit.removeOffset;

  function minDistance(d1, d2) {
    return Math.abs(d1) < Math.abs(d2) ? d1 : d2;
  }

  function findTargetSnap(target) {
    var distance = removeOffset(target);
    var ascDiffsToSnaps = scrollSnaps.map(function (scrollSnap) {
      return scrollSnap - distance;
    }).map(function (diffToSnap) {
      return shortcut(diffToSnap, 0);
    }).map(function (diff, i) {
      return {
        diff: diff,
        index: i
      };
    }).sort(function (d1, d2) {
      return Math.abs(d1.diff) - Math.abs(d2.diff);
    });
    var index = ascDiffsToSnaps[0].index;
    return {
      index: index,
      distance: distance
    };
  }

  function shortcut(target, direction) {
    var t1 = target;
    var t2 = target + contentSize;
    var t3 = target - contentSize;
    if (!loop) return t1;
    if (!direction) return minDistance(minDistance(t1, t2), t3);
    var shortest = minDistance(t1, direction === 1 ? t2 : t3);
    return Math.abs(shortest) * direction;
  }

  function findTargetIndex(target, index) {
    var reachedBound = !loop && reachedAny(target);
    if (!reachedBound) return index;
    var _a = params.index,
        min = _a.min,
        max = _a.max;
    return reachedMax(target) ? min : max;
  }

  function byIndex(index, direction) {
    var diffToSnap = scrollSnaps[index] - params.target.get();
    var distance = shortcut(diffToSnap, direction);
    return {
      index: index,
      distance: distance
    };
  }

  function byDistance(distance, snap) {
    var target = params.target.get() + distance;
    var targetSnap = findTargetSnap(target);
    var index = findTargetIndex(target, targetSnap.index);
    var reachedBound = !loop && reachedAny(target);
    if (!snap || reachedBound) return {
      index: index,
      distance: distance
    };
    var diffToSnap = scrollSnaps[index] - targetSnap.distance;
    var snapDistance = distance + shortcut(diffToSnap, 0);
    return {
      index: index,
      distance: snapDistance
    };
  }

  var self = {
    byDistance: byDistance,
    byIndex: byIndex,
    shortcut: shortcut
  };
  return self;
}

function ScrollTo(params) {
  var indexCurrent = params.index,
      scrollTarget = params.scrollTarget,
      animation = params.animation;
  var indexPrevious = params.indexPrevious,
      events = params.events,
      targetDistance = params.target;

  function scrollTo(target) {
    var distanceDiff = target.distance;
    var indexDiff = target.index !== indexCurrent.get();

    if (distanceDiff) {
      animation.start();
      targetDistance.add(distanceDiff);
    }

    if (indexDiff) {
      indexPrevious.set(indexCurrent.get());
      indexCurrent.set(target.index);
      events.emit('select');
    }
  }

  function distance(n, snap) {
    var target = scrollTarget.byDistance(n, snap);
    scrollTo(target);
  }

  function index(n, direction) {
    var targetIndex = indexCurrent.clone().set(n);
    var target = scrollTarget.byIndex(targetIndex.get(), direction);
    scrollTo(target);
  }

  var self = {
    distance: distance,
    index: index
  };
  return self;
}

function SlideLooper(params) {
  var axis = params.axis,
      scrollLocation = params.location,
      slidesInView = params.slidesInView,
      direction = params.direction;
  var contentSize = params.contentSize,
      viewSize = params.viewSize,
      slideSizes = params.slideSizes,
      scrollSnaps = params.scrollSnaps;
  var ascItems = arrayKeys(slideSizes);
  var descItems = arrayKeys(slideSizes).reverse();
  var loopPoints = startPoints().concat(endPoints());
  var loopStyle = axis.scroll === 'x' ? 'left' : 'top';

  function removeSlideSizes(indexes, from) {
    return indexes.reduce(function (a, i) {
      return a - slideSizes[i];
    }, from);
  }

  function slidesInGap(indexes, gap) {
    return indexes.reduce(function (a, i) {
      var remainingGap = removeSlideSizes(a, gap);
      return remainingGap > 0 ? a.concat([i]) : a;
    }, []);
  }

  function findLoopPoints(indexes, edge) {
    var isStartEdge = edge === 'start';
    var offset = isStartEdge ? -contentSize : contentSize;
    var slideBounds = slidesInView.findSlideBounds(offset);
    return indexes.map(function (index) {
      var initial = isStartEdge ? 0 : -contentSize;
      var altered = isStartEdge ? contentSize : 0;
      var bounds = slideBounds.filter(function (b) {
        return b.index === index;
      })[0];
      var point = bounds[isStartEdge ? 'end' : 'start'];

      var getTarget = function getTarget() {
        return scrollLocation.get() > point ? initial : altered;
      };

      return {
        point: point,
        getTarget: getTarget,
        index: index,
        location: -1
      };
    });
  }

  function startPoints() {
    var gap = scrollSnaps[0] - 1;
    var indexes = slidesInGap(descItems, gap);
    return findLoopPoints(indexes, 'end');
  }

  function endPoints() {
    var gap = viewSize - scrollSnaps[0] - 1;
    var indexes = slidesInGap(ascItems, gap);
    return findLoopPoints(indexes, 'start');
  }

  function canLoop() {
    return loopPoints.every(function (_a) {
      var index = _a.index;
      var otherIndexes = ascItems.filter(function (i) {
        return i !== index;
      });
      return removeSlideSizes(otherIndexes, viewSize) <= 0;
    });
  }

  function loop(slides) {
    loopPoints.forEach(function (loopPoint) {
      var getTarget = loopPoint.getTarget,
          location = loopPoint.location,
          index = loopPoint.index;
      var target = getTarget();

      if (target !== location) {
        slides[index].style[loopStyle] = direction.applyTo(target) + "%";
        loopPoint.location = target;
      }
    });
  }

  function clear(slides) {
    loopPoints.forEach(function (_a) {
      var index = _a.index;
      slides[index].style[loopStyle] = '';
    });
  }

  var self = {
    canLoop: canLoop,
    clear: clear,
    loop: loop,
    loopPoints: loopPoints
  };
  return self;
}

function SlideFocus(params) {
  var scrollTo = params.scrollTo,
      slidesToScroll = params.slidesToScroll,
      root = params.root;
  var eventStore = EventStore();
  var removeAllEvents = eventStore.removeAll;
  var lastTabPressTime = 0;

  function registerTabPress(event) {
    if (event.keyCode !== 9) return;
    lastTabPressTime = new Date().getTime();
  }

  function addFocusEvent(slide, index) {
    var focus = function focus() {
      var nowTime = new Date().getTime();
      var diffTime = nowTime - lastTabPressTime;
      if (diffTime > 10) return;
      root.scrollLeft = 0;
      var selectedIndex = Math.floor(index / slidesToScroll);
      scrollTo.index(selectedIndex, 0);
    };

    eventStore.add(slide, 'focus', focus, true);
  }

  function addActivationEvents(slides) {
    eventStore.add(document, 'keydown', registerTabPress, false);
    slides.forEach(addFocusEvent);
  }

  var self = {
    addActivationEvents: addActivationEvents,
    removeAllEvents: removeAllEvents
  };
  return self;
}

function SlidesInView(params) {
  var contentSize = params.contentSize,
      slideSizes = params.slideSizes,
      viewSize = params.viewSize;
  var inViewThreshold = params.inViewThreshold,
      loop = params.loop;
  var threshold = Math.min(Math.max(inViewThreshold, 0.01), 0.99);
  var scrollSnaps = arrayKeys(slideSizes).map(scrollSnap);
  var offsets = loop ? [0, contentSize, -contentSize] : [0];
  var slideBounds = offsets.reduce(function (a, loopOffset) {
    return a.concat(findSlideBounds(loopOffset, threshold));
  }, []);

  function scrollSnap(index) {
    var span = slideSizes.slice(0, index);
    return span.reduce(function (a, s) {
      return a - s;
    }, 0);
  }

  function findSlideBounds(offset, threshold) {
    var thresholds = slideSizes.map(function (s) {
      return s * (threshold || 0);
    });
    return scrollSnaps.map(function (snap, index) {
      return {
        start: snap - slideSizes[index] + thresholds[index] + offset,
        end: snap + viewSize - thresholds[index] + offset,
        index: index
      };
    });
  }

  function check(location) {
    return slideBounds.reduce(function (list, slideBound) {
      var index = slideBound.index,
          start = slideBound.start,
          end = slideBound.end;
      var inList = list.indexOf(index) !== -1;
      var inView = start < location && end > location;
      return !inList && inView ? list.concat([index]) : list;
    }, []);
  }

  var self = {
    check: check,
    findSlideBounds: findSlideBounds
  };
  return self;
}

function Translate(params) {
  var axis = params.axis,
      container = params.container,
      direction = params.direction;
  var containerStyle = container.style;
  var translate = axis.scroll === 'x' ? x : y;
  var roundToTwoDecimals = roundToDecimals(2);
  var disabled = false;
  var location = 0;

  function x(n) {
    return "translate3d(" + n + "%,0px,0px)";
  }

  function y(n) {
    return "translate3d(0px," + n + "%,0px)";
  }

  function to(v) {
    var target = roundToTwoDecimals(v.get());
    if (disabled || location === target) return;
    getComputedStyle(container).transform;
    containerStyle.transform = translate(direction.applyTo(target));
    location = target;
  }

  function toggleActive(active) {
    disabled = !active;
  }

  function clear() {
    containerStyle.transform = '';
    location = 0;
  }

  var self = {
    clear: clear,
    to: to,
    toggleActive: toggleActive
  };
  return self;
}

function Engine(root, container, slides, options, events) {
  // Options
  var align = options.align,
      scrollAxis = options.axis,
      contentDirection = options.direction,
      startIndex = options.startIndex,
      inViewThreshold = options.inViewThreshold,
      loop = options.loop,
      speed = options.speed,
      dragFree = options.dragFree,
      slidesToScroll = options.slidesToScroll,
      containScroll = options.containScroll; // Measurements

  var axis = Axis(scrollAxis);
  var pxToPercent = PxToPercent(axis.measure(container));
  var viewSize = pxToPercent.totalPercent;
  var slideSizes = slides.map(axis.measure).map(pxToPercent.measure);
  var slideIndexes = arrayKeys(slideSizes);
  var groupedSizes = groupArray(slideSizes, slidesToScroll);
  var snapSizes = groupedSizes.map(function (g) {
    return g.reduce(function (a, s) {
      return a + s;
    });
  });
  var contentSize = slideSizes.reduce(function (a, s) {
    return a + s;
  }, 0);
  var alignment = Alignment({
    align: align,
    viewSize: viewSize
  });
  var scrollSnap = ScrollSnap({
    snapSizes: snapSizes,
    alignment: alignment,
    loop: loop
  });
  var defaultSnaps = arrayKeys(snapSizes).map(scrollSnap.measure);
  var contain = ScrollContain({
    alignment: alignment,
    contentSize: contentSize,
    viewSize: viewSize
  });
  var shouldContain = !loop && containScroll !== '';
  var trimSnaps = containScroll === 'trimSnaps';
  var containedSnaps = contain.measure(defaultSnaps, trimSnaps);
  var scrollSnaps = shouldContain ? containedSnaps : defaultSnaps;
  var scrollLimit = ScrollLimit({
    loop: loop,
    contentSize: contentSize
  });
  var limit = scrollLimit.measure(scrollSnaps);
  var direction = Direction(contentDirection); // Index

  var indexMax = Math.max(0, scrollSnaps.length - 1);
  var indexSpan = Limit({
    min: 0,
    max: indexMax
  });
  var index = Counter({
    limit: indexSpan,
    start: startIndex,
    loop: loop
  });
  var indexPrevious = index.clone(); // Draw

  var update = function update() {
    if (!loop) {
      engine.scrollBounds.constrain(target, engine.dragHandler.pointerDown());
    }

    engine.scrollBody.seek(target).update();
    var settled = engine.scrollBody.settle(target);

    if (settled && !engine.dragHandler.pointerDown()) {
      engine.animation.stop();
      events.emit('settle');
    }

    if (!settled) {
      events.emit('scroll');
    }

    if (loop) {
      engine.scrollLooper.loop(loopVectors, engine.scrollBody.direction());
      engine.slideLooper.loop(slides);
    }

    engine.translate.to(location);
    engine.animation.proceed();
  }; // Shared


  var animation = Animation(update);
  var startLocation = scrollSnaps[index.get()];
  var location = Vector1D(startLocation);
  var target = Vector1D(startLocation);
  var loopVectors = [location, target];
  var scrollBody = ScrollBody({
    location: location,
    speed: speed,
    mass: 1
  });
  var scrollTarget = ScrollTarget({
    contentSize: contentSize,
    index: index,
    limit: limit,
    loop: loop,
    scrollSnaps: scrollSnaps,
    target: target
  });
  var scrollTo = ScrollTo({
    animation: animation,
    events: events,
    index: index,
    indexPrevious: indexPrevious,
    scrollTarget: scrollTarget,
    target: target
  });
  var slidesInView = SlidesInView({
    contentSize: contentSize,
    inViewThreshold: inViewThreshold,
    loop: loop,
    slideSizes: slideSizes,
    viewSize: viewSize
  }); // DragHandler

  var dragHandler = DragHandler({
    animation: animation,
    axis: axis,
    direction: direction,
    dragFree: dragFree,
    dragTracker: DragTracker({
      axis: axis,
      pxToPercent: pxToPercent
    }),
    root: root,
    events: events,
    index: index,
    limit: limit,
    location: location,
    scrollBody: scrollBody,
    scrollTo: scrollTo,
    scrollTarget: scrollTarget,
    target: target
  }); // Slider

  var engine = {
    animation: animation,
    axis: axis,
    direction: direction,
    dragHandler: dragHandler,
    pxToPercent: pxToPercent,
    index: index,
    indexPrevious: indexPrevious,
    limit: limit,
    location: location,
    options: options,
    scrollBody: scrollBody,
    scrollBounds: ScrollBounds({
      limit: limit,
      location: location,
      scrollBody: scrollBody
    }),
    scrollLooper: ScrollLooper({
      contentSize: contentSize,
      limit: limit,
      location: location,
      pxToPercent: pxToPercent
    }),
    scrollProgress: ScrollProgress({
      limit: limit
    }),
    scrollSnaps: scrollSnaps,
    scrollTarget: scrollTarget,
    scrollTo: scrollTo,
    slideFocus: SlideFocus({
      root: root,
      scrollTo: scrollTo,
      slidesToScroll: slidesToScroll
    }),
    slideLooper: SlideLooper({
      axis: axis,
      contentSize: contentSize,
      direction: direction,
      location: location,
      scrollSnaps: scrollSnaps,
      slideSizes: slideSizes,
      slidesInView: slidesInView,
      viewSize: viewSize
    }),
    slidesInView: slidesInView,
    slideIndexes: slideIndexes,
    target: target,
    translate: Translate({
      axis: axis,
      container: container,
      direction: direction
    })
  };
  return engine;
}

function EventEmitter() {
  var listeners = {};

  function getListeners(evt) {
    var eventListeners = listeners[evt];
    return eventListeners || [];
  }

  function emit(evt) {
    getListeners(evt).forEach(function (e) {
      return e(evt);
    });
    return self;
  }

  function on(evt, cb) {
    listeners[evt] = getListeners(evt).concat([cb]);
    return self;
  }

  function off(evt, cb) {
    listeners[evt] = getListeners(evt).filter(function (e) {
      return e !== cb;
    });
    return self;
  }

  var self = {
    emit: emit,
    off: off,
    on: on
  };
  return self;
}

var defaultOptions = {
  align: 'center',
  axis: 'x',
  containScroll: '',
  containerSelector: '*',
  direction: 'ltr',
  dragFree: false,
  draggable: true,
  draggableClass: 'is-draggable',
  draggingClass: 'is-dragging',
  inViewThreshold: 0,
  loop: false,
  selectedClass: 'is-selected',
  slidesToScroll: 1,
  speed: 10,
  startIndex: 0
};

function EmblaCarousel(sliderRoot, userOptions) {
  var events = EventEmitter();
  var eventStore = EventStore();
  var debouncedResize = debounce(resize, 500);
  var reInit = reActivate;
  var on = events.on,
      off = events.off;
  var engine;
  var activated = false;

  var options = _extends({}, defaultOptions);

  var rootElementSize = 0;
  var container;
  var slides;
  activate(userOptions);

  function storeElements() {
    if (!sliderRoot) throw new Error('Missing root node 😢');
    var selector = options.containerSelector;
    var sliderContainer = sliderRoot.querySelector(selector);
    if (!sliderContainer) throw new Error('Missing container node 😢');
    container = sliderContainer;
    slides = Array.prototype.slice.call(container.children);
  }

  function activate(partialOptions) {
    storeElements();
    options = _extends(options, partialOptions);
    engine = Engine(sliderRoot, container, slides, options, events);
    rootElementSize = engine.axis.measure(sliderRoot);
    eventStore.add(window, 'resize', debouncedResize);
    engine.translate.to(engine.location);

    if (options.loop) {
      if (!engine.slideLooper.canLoop()) {
        deActivate();
        return activate({
          loop: false
        });
      }

      engine.slideLooper.loop(slides);
    }

    if (options.draggable && slides.length) {
      engine.dragHandler.addActivationEvents();

      if (options.draggableClass) {
        addClass(sliderRoot, options.draggableClass);
      }

      if (options.draggingClass) {
        events.on('pointerDown', toggleDraggingClass).on('pointerUp', toggleDraggingClass);
      }
    }

    if (slides.length) {
      engine.slideFocus.addActivationEvents(slides);
    }

    if (options.selectedClass) {
      toggleSelectedClass();
      events.on('select', toggleSelectedClass).on('pointerUp', toggleSelectedClass);
    }

    if (!activated) {
      setTimeout(function () {
        return events.emit('init');
      }, 0);
      activated = true;
    }
  }

  function toggleDraggingClass(evt) {
    var draggingClass = options.draggingClass;
    if (evt === 'pointerDown') addClass(sliderRoot, draggingClass);else removeClass(sliderRoot, draggingClass);
  }

  function toggleSelectedClass() {
    var selectedClass = options.selectedClass;
    var inView = slidesInView(true);
    var notInView = slidesNotInView(true);
    notInView.forEach(function (i) {
      return removeClass(slides[i], selectedClass);
    });
    inView.forEach(function (i) {
      return addClass(slides[i], selectedClass);
    });
  }

  function deActivate() {
    engine.dragHandler.removeAllEvents();
    engine.slideFocus.removeAllEvents();
    engine.animation.stop();
    eventStore.removeAll();
    engine.translate.clear();
    engine.slideLooper.clear(slides);
    removeClass(sliderRoot, options.draggableClass);
    slides.forEach(function (s) {
      return removeClass(s, options.selectedClass);
    });
    events.off('select', toggleSelectedClass);
    events.off('pointerUp', toggleSelectedClass);
    events.off('pointerDown', toggleDraggingClass);
    events.off('pointerUp', toggleDraggingClass);
  }

  function reActivate(partialOptions) {
    if (!activated) return;
    var startIndex = selectedScrollSnap();

    var newOptions = _extends({
      startIndex: startIndex
    }, partialOptions);

    deActivate();
    activate(newOptions);
    events.emit('reInit');
  }

  function destroy() {
    if (!activated) return;
    deActivate();
    activated = false;
    events.emit('destroy');
  }

  function resize() {
    if (!activated) return;
    var newRootElementSize = engine.axis.measure(sliderRoot);
    if (rootElementSize !== newRootElementSize) reActivate();
    events.emit('resize');
  }

  function slidesInView(target) {
    var location = engine[target ? 'target' : 'location'].get();
    var type = options.loop ? 'removeOffset' : 'constrain';
    return engine.slidesInView.check(engine.limit[type](location));
  }

  function slidesNotInView(target) {
    var inView = slidesInView(target);
    return engine.slideIndexes.filter(function (i) {
      return inView.indexOf(i) === -1;
    });
  }

  function scrollTo(index, direction) {
    engine.scrollBody.useBaseMass().useBaseSpeed();
    if (activated) engine.scrollTo.index(index, direction || 0);
  }

  function scrollNext() {
    var next = engine.index.clone().add(1);
    scrollTo(next.get(), -1);
  }

  function scrollPrev() {
    var prev = engine.index.clone().add(-1);
    scrollTo(prev.get(), 1);
  }

  function canScrollNext() {
    var next = engine.index.clone().add(1);
    return next.get() !== selectedScrollSnap();
  }

  function canScrollPrev() {
    var prev = engine.index.clone().add(-1);
    return prev.get() !== selectedScrollSnap();
  }

  function scrollSnapList() {
    return engine.scrollSnaps.map(engine.scrollProgress.get);
  }

  function scrollProgress() {
    return engine.scrollProgress.get(engine.location.get());
  }

  function selectedScrollSnap() {
    return engine.index.get();
  }

  function previousScrollSnap() {
    return engine.indexPrevious.get();
  }

  function clickAllowed() {
    return engine.dragHandler.clickAllowed();
  }

  function dangerouslyGetEngine() {
    return engine;
  }

  function containerNode() {
    return container;
  }

  function slideNodes() {
    return slides;
  }

  var self = {
    canScrollNext: canScrollNext,
    canScrollPrev: canScrollPrev,
    clickAllowed: clickAllowed,
    containerNode: containerNode,
    dangerouslyGetEngine: dangerouslyGetEngine,
    destroy: destroy,
    off: off,
    on: on,
    previousScrollSnap: previousScrollSnap,
    reInit: reInit,
    scrollNext: scrollNext,
    scrollPrev: scrollPrev,
    scrollProgress: scrollProgress,
    scrollSnapList: scrollSnapList,
    scrollTo: scrollTo,
    selectedScrollSnap: selectedScrollSnap,
    slideNodes: slideNodes,
    slidesInView: slidesInView,
    slidesNotInView: slidesNotInView
  };
  return self;
}

var _default = EmblaCarousel;
exports.default = _default;
},{}],"prevAndNextButtons.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disablePrevNextBtns = exports.setupPrevNextBtns = void 0;

var setupPrevNextBtns = function setupPrevNextBtns(prevBtn, nextBtn, embla) {
  prevBtn.addEventListener('click', embla.scrollPrev, false);
  nextBtn.addEventListener('click', embla.scrollNext, false);
};

exports.setupPrevNextBtns = setupPrevNextBtns;

var disablePrevNextBtns = function disablePrevNextBtns(prevBtn, nextBtn, embla) {
  return function () {
    if (embla.canScrollPrev()) prevBtn.removeAttribute('disabled');else prevBtn.setAttribute('disabled', 'disabled');
    if (embla.canScrollNext()) nextBtn.removeAttribute('disabled');else nextBtn.setAttribute('disabled', 'disabled');
  };
};

exports.disablePrevNextBtns = disablePrevNextBtns;
},{}],"parallax.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parallax = void 0;
var PARALLAX_FACTOR = 1.2;

var parallax = function parallax(embla) {
  var scrollSnaps = embla.scrollSnapList();
  var slides = embla.slideNodes();
  var layers = slides.map(function (node) {
    return node.querySelector(".embla__slide__parallax");
  });

  var applyParallaxStyles = function applyParallaxStyles() {
    scrollSnaps.forEach(function (scrollSnap, index) {
      var diffToTarget = scrollSnap - embla.scrollProgress();
      var x = diffToTarget * (-1 / PARALLAX_FACTOR) * 100;
      layers[index].style.transform = "translateX(".concat(x, "%)");
    });
  };

  return applyParallaxStyles;
};

exports.parallax = parallax;
},{}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"reset.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"embla.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _emblaCarousel = _interopRequireDefault(require("embla-carousel"));

var _prevAndNextButtons = require("./prevAndNextButtons");

var _parallax = require("./parallax");

require("./reset.css");

require("./embla.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wrap = document.querySelector(".embla");
var viewPort = wrap.querySelector(".embla__viewport");
var prevBtn = wrap.querySelector(".embla__button--prev");
var nextBtn = wrap.querySelector(".embla__button--next");
var embla = (0, _emblaCarousel.default)(viewPort, {
  loop: true
});
var startIndex = (0, _emblaCarousel.default)(1);
var applyParallaxStyles = (0, _parallax.parallax)(embla);
embla.on("init", applyParallaxStyles);
embla.on("scroll", applyParallaxStyles);
embla.on("resize", applyParallaxStyles);
var disablePrevAndNextBtns = (0, _prevAndNextButtons.disablePrevNextBtns)(prevBtn, nextBtn, embla);
(0, _prevAndNextButtons.setupPrevNextBtns)(prevBtn, nextBtn, embla);
embla.on("init", disablePrevAndNextBtns);
embla.on("select", disablePrevAndNextBtns);
},{"embla-carousel":"node_modules/embla-carousel/embla-carousel.esm.js","./prevAndNextButtons":"prevAndNextButtons.js","./parallax":"parallax.js","./reset.css":"reset.css","./embla.css":"embla.css"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53511" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/blogpost1-gallery.e31bb0bc.js.map