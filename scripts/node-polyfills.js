'use strict';

// Polyfills for Node < 20 to satisfy dependencies that expect ES2023 array methods.
// Non-enumerable to match native behavior.
if (!Array.prototype.toReversed) {
  Object.defineProperty(Array.prototype, 'toReversed', {
    value: function toReversed() {
      return Array.prototype.slice.call(this).reverse();
    },
    writable: true,
    configurable: true,
  });
}

if (!Array.prototype.toSorted) {
  Object.defineProperty(Array.prototype, 'toSorted', {
    value: function toSorted(compareFn) {
      return Array.prototype.slice.call(this).sort(compareFn);
    },
    writable: true,
    configurable: true,
  });
}

if (!Array.prototype.toSpliced) {
  Object.defineProperty(Array.prototype, 'toSpliced', {
    value: function toSpliced(start, deleteCount, ...items) {
      const copy = Array.prototype.slice.call(this);
      copy.splice(start, deleteCount, ...items);
      return copy;
    },
    writable: true,
    configurable: true,
  });
}

if (!Array.prototype.with) {
  Object.defineProperty(Array.prototype, 'with', {
    value: function withValue(index, value) {
      const copy = Array.prototype.slice.call(this);
      const len = copy.length >>> 0;
      let idx = Number(index);
      if (Number.isNaN(idx)) idx = 0;
      if (idx < 0) idx = len + idx;
      if (idx < 0 || idx >= len) {
        throw new RangeError('Invalid index');
      }
      copy[idx] = value;
      return copy;
    },
    writable: true,
    configurable: true,
  });
}
