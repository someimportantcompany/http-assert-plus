/**
 * @author: jdrydn <james@jdrydn.com> (https://jdrydn.com)
 * @license: MIT
 * @link: https://github.com/someimportantcompany/http-assert-plus
 */

const isStatus = s => typeof s === 'number' && typeof statuses[`${s}`] === 'string';
const isErrorLike = e => typeof e === 'string' || e instanceof Error;
const isObject = o => Object.prototype.toString.call(o) === '[object Object]';

function assert(value, err) {
  if (!value) {
    throw err;
  }
}

function prepareErr(assertConstructor, ...args) {
  let err = 'An error occurred',
      props = null,
      status = null;

  if (args.length === 3) {
    ([ status, err, props ] = args);
    assert(isStatus(status), new TypeError('Expected first argument to be a HTTP status'));
    assert(isErrorLike(err), new TypeError('Expected second argument to be a string or Error'));
    assert(isObject(props), new TypeError('Expected third argument to be an object'));
  } else if (args.length === 2 && typeof args[0] === 'number') {
    ([ status, err ] = args);
    assert(isStatus(status), new TypeError('Expected first argument to be a HTTP status'));
    assert(isErrorLike(err), new TypeError('Expected second argument to be a string or Error'));
  } else if (args.length === 2 && isErrorLike(args[0])) {
    ([ err, props ] = args);
    assert(isErrorLike(err), new TypeError('Expected second argument to be a string or Error'));
    assert(isObject(props), new TypeError('Expected third argument to be an object'));

    status = (isStatus(err.status) ? err.status : undefined) ||
      (isStatus(err.statusCode) ? err.statusCode : undefined) ||
      (isStatus(props.status) ? props.status : undefined) ||
      (isStatus(props.statusCode) ? props.statusCode : undefined) ||
      null;
  } else if (args.length === 1 && typeof args[0] === 'number') {
    ([ status ] = args);
    assert(isStatus(status), new TypeError('Expected argument to be a HTTP status'));
    err = `HTTP ${status} - ${statuses[`${status}`]}`;
  } else if (args.length === 1 && isErrorLike(args[0])) {
    ([ err ] = args);
  } else if (args.length === 1 && isObject(args[0])) {
    ([ props ] = args);

    status = (isStatus(props.status) ? props.status : undefined) ||
      (isStatus(props.statusCode) ? props.statusCode : undefined) ||
      null;
    err = (typeof props.message === 'string' ? props.message : undefined) ||
      (typeof props.error === 'string' ? props.error : undefined) ||
      err;
  } else if (args.length === 0) {
    // Just default to "An error occurred"
  } else {
    throw new TypeError('Invalid arguments passed to http-assert-plus');
  }

  err = err instanceof Error ? err : new Error(err);

  /* istanbul ignore else */
  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(err, assertConstructor);
  }

  Object.assign(err, props || {});

  if (isStatus(status)) {
    err.status = err.statusCode = status;
    err.statusText = statuses[`${status}`];
  }

  return err;
}

/**
 * Assert that a value is not falsey
 *
 * @param {*} value Input value
 * @param {number} [status] HTTP status
 * @param {Error|string} [err] Error (message)
 * @param {Object} [opts] Options
 * @throws Will throw if the input is falsey
 * @return {void}
 */
function assertPlus(value, ...err) {
  assert(value, prepareErr(assertPlus, ...err));
}

/**
 * Assert that a value is not falsey
 *
 * @param {*} value Input value
 * @param {number} [status] HTTP status
 * @param {Error|string} [err] Error (message)
 * @param {Object} [opts] Options
 * @throws Will throw if the input is falsey
 * @return {void}
 */
assertPlus.ok = function ok(value, ...err) {
  assert(Boolean(value), prepareErr(ok, ...err));
};

/**
 * Always throw an error.
 *
 * @param {number} [status] HTTP status
 * @param {Error|string} [err] Error (message)
 * @param {Object} [opts] Options
 * @throws Will always throw an error
 * @return {void}
 */
assertPlus.fail = function fail(...err) {
  throw prepareErr(fail, ...err);
};

/**
 * Compare loose equality between two values
 *
 * @param {*} a Actual value
 * @param {*} b Expected value
 * @param {number} [status] HTTP status
 * @param {Error|string} [err] Error (message)
 * @param {Object} [opts] Options
 * @throws Will throw if a != b
 * @return {void}
 */
assertPlus.equal = function equal(a, b, ...err) {
  assert(a == b, prepareErr(equal, ...err)); // eslint-disable-line eqeqeq
};

/**
 * Compare loose inequality between two values
 *
 * @param {*} a Actual value
 * @param {*} b Expected value
 * @param {number} [status] HTTP status
 * @param {Error|string} [err] Error (message)
 * @param {Object} [opts] Options
 * @throws Will throw if a == b
 * @return {void}
 */
assertPlus.notEqual = function notEqual(a, b, ...err) {
  assert(a != b, prepareErr(notEqual, ...err)); // eslint-disable-line eqeqeq
};

/**
 * Compare strict equality between two values
 *
 * @param {*} a Actual value
 * @param {*} b Expected value
 * @param {number} [status] HTTP status
 * @param {Error|string} [err] Error (message)
 * @param {Object} [opts] Options
 * @throws Will throw if a !== b
 * @return {void}
 */
assertPlus.strictEqual = function strictEqual(a, b, ...err) {
  assert(a === b, prepareErr(strictEqual, ...err));
};

/**
 * Compare strict inequality between two values
 *
 * @param {*} a Actual value
 * @param {*} b Expected value
 * @param {number} [status] HTTP status
 * @param {Error|string} [err] Error (message)
 * @param {Object} [opts] Options
 * @throws Will throw if a === b
 * @return {void}
 */
assertPlus.notStrictEqual = function notStrictEqual(a, b, ...err) {
  assert(a !== b, prepareErr(notStrictEqual, ...err));
};

/**
 * Check that a value is within a list
 *
 * @param {*[]} list A list of values
 * @param {*} value The value to check for
 * @param {number} [status] HTTP status
 * @param {Error|string} [err] Error (message)
 * @param {Object} [opts] Options
 * @throws Will throw if b is not within a
 * @return {void}
 */
assertPlus.includes = function includes(items, item, ...err) {
  assert(items && typeof items.includes === 'function', new TypeError('Expected first arg to have an includes method'));
  assert(items.includes(item), prepareErr(includes, ...err));
};

/**
 * Check that a value is not within a list
 *
 * @param {*[]} list A list of values
 * @param {*} value The value to check for
 * @param {number} [status] HTTP status
 * @param {Error|string} [err] Error (message)
 * @param {Object} [opts] Options
 * @throws Will throw if b is within a
 * @return {void}
 */
assertPlus.notIncludes = function notIncludes(items, item, ...err) {
  assert(items && typeof items.includes === 'function', new TypeError('Expected first arg to have an includes method'));
  assert(!items.includes(item), prepareErr(notIncludes, ...err));
};

module.exports = assertPlus;

const statuses = {
  // @link https://github.com/jshttp/statuses/blob/454ceb6e0bfea4f889be244de2538df8afb4dc2a/src/iana.json
  '100': 'Continue',
  '101': 'Switching Protocols',
  '102': 'Processing',
  '103': 'Early Hints',
  '200': 'OK',
  '201': 'Created',
  '202': 'Accepted',
  '203': 'Non-Authoritative Information',
  '204': 'No Content',
  '205': 'Reset Content',
  '206': 'Partial Content',
  '207': 'Multi-Status',
  '208': 'Already Reported',
  '226': 'IM Used',
  '300': 'Multiple Choices',
  '301': 'Moved Permanently',
  '302': 'Found',
  '303': 'See Other',
  '304': 'Not Modified',
  '305': 'Use Proxy',
  '307': 'Temporary Redirect',
  '308': 'Permanent Redirect',
  '400': 'Bad Request',
  '401': 'Unauthorized',
  '402': 'Payment Required',
  '403': 'Forbidden',
  '404': 'Not Found',
  '405': 'Method Not Allowed',
  '406': 'Not Acceptable',
  '407': 'Proxy Authentication Required',
  '408': 'Request Timeout',
  '409': 'Conflict',
  '410': 'Gone',
  '411': 'Length Required',
  '412': 'Precondition Failed',
  '413': 'Payload Too Large',
  '414': 'URI Too Long',
  '415': 'Unsupported Media Type',
  '416': 'Range Not Satisfiable',
  '417': 'Expectation Failed',
  '421': 'Misdirected Request',
  '422': 'Unprocessable Entity',
  '423': 'Locked',
  '424': 'Failed Dependency',
  '425': 'Too Early',
  '426': 'Upgrade Required',
  '428': 'Precondition Required',
  '429': 'Too Many Requests',
  '431': 'Request Header Fields Too Large',
  '451': 'Unavailable For Legal Reasons',
  '500': 'Internal Server Error',
  '501': 'Not Implemented',
  '502': 'Bad Gateway',
  '503': 'Service Unavailable',
  '504': 'Gateway Timeout',
  '505': 'HTTP Version Not Supported',
  '506': 'Variant Also Negotiates',
  '507': 'Insufficient Storage',
  '508': 'Loop Detected',
  '510': 'Not Extended',
  '511': 'Network Authentication Required',
};
