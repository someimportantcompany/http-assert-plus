# http-assert-plus

[![NPM](https://badge.fury.io/js/http-assert-plus.svg)](https://npm.im/http-assert-plus)
[![CI](https://github.com/someimportantcompany/http-assert-plus/workflows/Test/badge.svg?branch=master)](https://github.com/someimportantcompany/http-assert-plus/actions?query=branch%3Amaster)
[![Coverage](https://coveralls.io/repos/github/someimportantcompany/http-assert-plus/badge.svg)](https://coveralls.io/github/someimportantcompany/http-assert-plus)

More assertions with status codes.

```js
const assert = require('http-assert-plus');

const username = 'jdrydn';
assert(username === 'someimportantcompany', 401, 'Authorization failed', {
  code: 'NOT_AUTHORIZED',
  username,
});

// Error: Authorization failed
//     at createErr (./http-assert-plus/README.md:9:7) {
//   code: 'NOT_AUTHORIZED',
//   statusCode: 401,
//   status: 401,
//   statusText: 'Unauthorized',
//   username: 'jdrydn'
// }
```

## Install

```
$ npm install http-assert-plus
```

## API

This API matches the [built-in `assert` module](https://nodejs.org/dist/latest/docs/api/assert.html), and builds upon the success of [`http-assert`](https://github.com/jshttp/http-assert), with a few differences:

- Each function throws an instance of `Error` when the assertion fails.
- Zero dependencies - but at a price.

<dl>
  <dt>assert(value, [status], [message], [props])</dt>
  <dd>Tests if `value` is truthy, and throws an error if falsey.</dd>
  <dt>assert.ok(value, [status], [message], [props])</dt>
  <dd>Alias for above, tests if `value` is truthy, and throws an error if falsey.</dd>
  <dt>assert.fail([status], [message], [props])</dt>
  <dd>Description</dd>
  <dt>assert.equal(a, b, [status], [message], [props])</dt>
  <dd>Description</dd>
  <dt>assert.notEqual(a, b, [status], [message], [props])</dt>
  <dd>Description</dd>
  <dt>assert.strictEqual(a, b, [status], [message], [props])</dt>
  <dd>Description</dd>
  <dt>assert.notStrictEqual(a, b, [status], [message], [props])</dt>
  <dd>Description</dd>
  <dt>assert.includes(a, b, [status], [message], [props])</dt>
  <dd>Description</dd>
  <dt>assert.notIncludes(a, b, [status], [message], [props])</dt>
  <dd>Description</dd>
</dl>

### What about deep equality?

If you're looking for deep equality checks, check out [`deep-equal`](https://npm.im/deep-equal):

```js
const assert = require('http-assert-plus');
const deepEqual = require('deep-equal');

assert(deepEqual(a, b), 400, 'These two are not entirely equal');
assert(deepEqual(a, b, { strict: true }), 400, 'These two are not entirely equal');

// Or add static methods to your instance of http-assert-plus!
assert.deepEqual = (a, b, ...args) => assert(deepEqual(a, b), ...args);
assert.strictDeepEqual = (a, b, ...args) => assert(deepEqual(a, b, { strict: true }), ...args);
```

## Notes

- Many thanks to the original team behind [http-assert](https://npm.im/http-assert).
