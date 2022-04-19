/**
 * Wrapper to catch error in async functions.
 * @param {Function} fn
 * @returns {Function}
 */
module.exports = function (fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
