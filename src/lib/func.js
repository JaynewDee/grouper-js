/**
 * Utility functions.
 * @module lib/func
 */

/**
 *
 * @param  {...Function} fns Array of intermediary consumers
 * @returns
 */
export const pipe =
  (...fns) =>
  (val) =>
    fns.reduce((prev, fn) => fn(prev), val);

/**
 *
 * @param {Object} cache Initial cache object
 * @param {Function} fn Function to memoize
 * @returns
 */
export const memoize =
  (cache = {}) =>
  (fn) =>
  (...args) => {
    const key = args.toString();
    if (key in cache) return cache[key];
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
