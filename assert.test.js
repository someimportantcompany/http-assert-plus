const assert = require('http-assert-plus');
const ok = require('assert');
const util = require('util');

describe('http-assert-plus', () => {
  const comparisons = {
    'assert(true)': [ true, () => assert(true) ],
    'assert(false)': [ false, () => assert(false) ],
    'assert.ok(true)': [ true, () => assert.ok(true) ],
    'assert.ok(false)': [ false, () => assert.ok(false) ],
    'assert.fail()': [ false, () => assert.fail() ],
    'assert.equal("1", 1)': [ true, () => assert.equal('1', 1) ],
    'assert.equal("1", 2)': [ false, () => assert.equal('1', 2) ],
    'assert.notEqual("1", 2)': [ true, () => assert.notEqual('1', 2) ],
    'assert.notEqual("1", 1)': [ false, () => assert.notEqual('1', 1) ],
    'assert.strictEqual(1, 1)': [ true, () => assert.strictEqual(1, 1) ],
    'assert.strictEqual(1, "1")': [ false, () => assert.strictEqual(1, '1') ],
    'assert.notStrictEqual("1", 2)': [ true, () => assert.notStrictEqual('1', 2) ],
    'assert.notStrictEqual(1, 1)': [ false, () => assert.notStrictEqual(1, 1) ],
    'assert.includes([ 1, 2, 3 ], 1)': [ true, () => assert.includes([ 1, 2, 3 ], 1) ],
    'assert.includes([ 1, 2, 3 ], 4)': [ false, () => assert.includes([ 1, 2, 3 ], 4) ],
    'assert.notIncludes([ 1, 2, 3 ], 4)': [ true, () => assert.notIncludes([ 1, 2, 3 ], 4) ],
    'assert.notIncludes([ 1, 2, 3 ], 1)': [ false, () => assert.notIncludes([ 1, 2, 3 ], 1) ],
  };

  for (const label in comparisons) {
    if (comparisons.hasOwnProperty(label) && Array.isArray(comparisons[label])) {
      const [ result, attempt ] = comparisons[label];
      ok(typeof result === 'boolean', `Expected "${label}" case to have a boolean`);
      ok(typeof attempt === 'function', `Expected "${label}" case to have a function`);

      it(`should ${result ? 'pass' : 'fail'} with ${label}`, result
        ? () => attempt()
        : () => {
          try {
            attempt();
            ok.fail('Should have failed');
          } catch (err) {
            ok(err instanceof Error, 'Expected err to be an instance of Error');
            ok.strictEqual(err.message, 'An error occurred');
            ok.strictEqual(err.status, undefined);
          }
        });
    }
  }

  describe('descriptors', () => {
    function createErr(...args) {
      try {
        assert.fail(...args);
        return null;
      } catch (err) {
        return err;
      }
    }

    function assertStack(stack) {
      ok(typeof stack === 'string', 'Expected err to have a stack');
      const source = stack.split('\n').slice(1, 2).shift().trim().replace(__dirname, '');
      ok.strictEqual(source, 'at createErr (/assert.test.js:50:16)');
    }

    const status = 500;
    const statusText = 'Internal Server Error';
    const message = 'Error Message';
    const props = { code: 'ERR_CODE', odd: 1, even: 2 };
    const inspect = obj => util.inspect(obj, { colors: false, depth: 1, compact: true });

    it(`should create an error with: assert.fail(${status}, '${message}', ${inspect(props)})`, () => {
      const err = createErr(status, message, props);
      ok(err instanceof Error, 'Expected err to be an instance of Error');
      ok.strictEqual(err.message, message);
      ok.deepStrictEqual({ ...err }, { ...props, status, statusCode: status, statusText });
      assertStack(err.stack);
    });

    it(`should create an error with: assert.fail(${status}, '${message}')`, () => {
      const err = createErr(status, message);
      ok(err instanceof Error, 'Expected err to be an instance of Error');
      ok.strictEqual(err.message, message);
      ok.deepStrictEqual({ ...err }, { status, statusCode: status, statusText });
      assertStack(err.stack);
    });

    it(`should create an error with: assert.fail(new Error('${message}'), ${inspect(props)})`, () => {
      const err = createErr(new Error(message), props);
      ok(err instanceof Error, 'Expected err to be an instance of Error');
      ok.strictEqual(err.message, message);
      ok.deepStrictEqual({ ...err }, { ...props });
      assertStack(err.stack);
    });

    it(`should create an error with: assert.fail(${status})`, () => {
      const err = createErr(status);
      ok(err instanceof Error, 'Expected err to be an instance of Error');
      ok.strictEqual(err.message, `HTTP ${status} - ${statusText}`);
      ok.deepStrictEqual({ ...err }, { status, statusCode: status, statusText });
      assertStack(err.stack);
    });

    it(`should create an error with: assert.fail(new Error('${message}'))`, () => {
      const err = createErr(new Error(message));
      ok(err instanceof Error, 'Expected err to be an instance of Error');
      ok.strictEqual(err.message, message);
      ok.deepStrictEqual({ ...err }, {});
      assertStack(err.stack);
    });

    it(`should create an error with: assert.fail(${inspect(props)})`, () => {
      const err = createErr(props);
      ok(err instanceof Error, 'Expected err to be an instance of Error');
      ok.strictEqual(err.message, 'An error occurred');
      ok.deepStrictEqual({ ...err }, { ...props });
      assertStack(err.stack);
    });

    it(`should create an error with: assert.fail(${inspect({ ...props, message, status })})`, () => {
      const err = createErr({ ...props, message, status });
      ok(err instanceof Error, 'Expected err to be an instance of Error');
      ok.strictEqual(err.message, message);
      ok.deepStrictEqual({ ...err }, { ...props, status, statusCode: status, statusText });
      assertStack(err.stack);
    });

    it(`should create an error with: assert.fail(${inspect({ ...props, error: message, statusCode: status })})`, () => {
      const err = createErr({ ...props, error: message, statusCode: status });
      ok(err instanceof Error, 'Expected err to be an instance of Error');
      ok.strictEqual(err.message, message);
      ok.deepStrictEqual({ ...err }, { ...props, error: message, status, statusCode: status, statusText });
      assertStack(err.stack);
    });

    it('should create an error with: assert.fail()', () => {
      const err = createErr();
      ok(err instanceof Error, 'Expected err to be an instance of Error');
      ok.strictEqual(err.message, 'An error occurred');
      ok.deepStrictEqual({ ...err }, {});
      assertStack(err.stack);
    });

    it('should throw an error with invalid arguments', () => {
      try {
        assert.fail(true);
        ok.fail('Should have errored');
      } catch (err) {
        ok(err instanceof TypeError, 'Expected err to be an instance of TypeError');
        ok.strictEqual(err.message, 'Invalid arguments passed to http-assert-plus');
      }
    });

  });

  describe('#create', () => {
    let instance = null;
    before(() => {
      instance = assert.create({ service: 'EXTERNAL-SERVICE', hostname: 'api.example.com' });
      ok(typeof instance === 'function', 'Expected instance to be a function');
      ok(typeof instance.ok === 'function', 'Expected instance to be a function');
      ok(typeof instance.fail === 'function', 'Expected instance to be a function');
    });

    it('should create an error, merging in defaults', () => {
      try {
        instance.fail(404, 'New Error', { method: 'GET', path: '/users' });
        ok.fail('Should have thrown an error');
      } catch (err) {
        ok(err instanceof Error, 'Expected err to be an instance of Error');
        ok.strictEqual(err.message, 'New Error');
        ok.deepStrictEqual({ ...err }, {
          service: 'EXTERNAL-SERVICE',
          hostname: 'api.example.com',
          method: 'GET',
          path: '/users',
          status: 404,
          statusCode: 404,
          statusText: 'Not Found',
        });
      }
    });

    it('should create an error, overriding in defaults', () => {
      try {
        instance.fail(501, 'New Error', { hostname: 'api2.example.com' });
        ok.fail('Should have thrown an error');
      } catch (err) {
        ok(err instanceof Error, 'Expected err to be an instance of Error');
        ok.strictEqual(err.message, 'New Error');
        ok.deepStrictEqual({ ...err }, {
          service: 'EXTERNAL-SERVICE',
          hostname: 'api2.example.com',
          status: 501,
          statusCode: 501,
          statusText: 'Not Implemented',
        });
      }
    });

  });
});
