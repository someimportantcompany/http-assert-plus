/**
 * @author: jdrydn <james@jdrydn.com> (https://jdrydn.com)
 * @license: MIT
 * @link: https://github.com/someimportantcompany/http-assert-plus
 */
import {
  throwFalsey,
  prepareErr,
  type AssertError,
  type ErrorLike,
  type Props,
} from "./utils";

interface Includable<T = any> {
  includes(item: T): boolean;
}

/**
 * Assert that a value is not falsey.
 */
function assert(value: any): asserts value;
function assert(value: any, status: number): asserts value;
function assert(value: any, err: ErrorLike): asserts value;
function assert(value: any, opts: Props): asserts value;
function assert(value: any, status: number, err: ErrorLike): asserts value;
function assert(value: any, err: ErrorLike, opts: Props): asserts value;
function assert(
  value: any,
  status: number,
  err: ErrorLike,
  opts: Props,
): asserts value;
function assert(value: any, ...err: any[]): asserts value {
  throwFalsey(value, prepareErr(assert, ...err));
}

/**
 * Assert that a value is not falsey.
 */
assert.ok = function ok(value: any, ...err: any[]): asserts value {
  throwFalsey(Boolean(value), prepareErr(ok, ...err));
} as {
  (value: any): asserts value;
  (value: any, status: number): asserts value;
  (value: any, err: ErrorLike): asserts value;
  (value: any, opts: Props): asserts value;
  (value: any, status: number, err: ErrorLike): asserts value;
  (value: any, err: ErrorLike, opts: Props): asserts value;
  (value: any, status: number, err: ErrorLike, opts: Props): asserts value;
};

/**
 * Always throw an error.
 */
assert.fail = function fail(...err: any[]): never {
  throw prepareErr(fail, ...err);
} as {
  (): never;
  (status: number): never;
  (err: ErrorLike): never;
  (opts: Props): never;
  (status: number, err: ErrorLike): never;
  (err: ErrorLike, opts: Props): never;
  (status: number, err: ErrorLike, opts: Props): never;
};

/**
 * Compare loose equality between two values.
 */
assert.equal = function equal(a: any, b: any, ...err: any[]): void {
  // eslint-disable-next-line eqeqeq
  throwFalsey(a == b, prepareErr(equal, ...err));
} as {
  (a: any, b: any): void;
  (a: any, b: any, status: number): void;
  (a: any, b: any, err: ErrorLike): void;
  (a: any, b: any, opts: Props): void;
  (a: any, b: any, status: number, err: ErrorLike): void;
  (a: any, b: any, err: ErrorLike, opts: Props): void;
  (a: any, b: any, status: number, err: ErrorLike, opts: Props): void;
};

/**
 * Compare loose inequality between two values.
 */
assert.notEqual = function notEqual(a: any, b: any, ...err: any[]): void {
  // eslint-disable-next-line eqeqeq
  throwFalsey(a != b, prepareErr(notEqual, ...err));
} as {
  (a: any, b: any): void;
  (a: any, b: any, status: number): void;
  (a: any, b: any, err: ErrorLike): void;
  (a: any, b: any, opts: Props): void;
  (a: any, b: any, status: number, err: ErrorLike): void;
  (a: any, b: any, err: ErrorLike, opts: Props): void;
  (a: any, b: any, status: number, err: ErrorLike, opts: Props): void;
};

/**
 * Compare strict equality between two values.
 */
assert.strictEqual = function strictEqual(
  a: any,
  b: any,
  ...err: any[]
): void {
  throwFalsey(a === b, prepareErr(strictEqual, ...err));
} as {
  (a: any, b: any): void;
  (a: any, b: any, status: number): void;
  (a: any, b: any, err: ErrorLike): void;
  (a: any, b: any, opts: Props): void;
  (a: any, b: any, status: number, err: ErrorLike): void;
  (a: any, b: any, err: ErrorLike, opts: Props): void;
  (a: any, b: any, status: number, err: ErrorLike, opts: Props): void;
};

/**
 * Compare strict inequality between two values.
 */
assert.notStrictEqual = function notStrictEqual(
  a: any,
  b: any,
  ...err: any[]
): void {
  throwFalsey(a !== b, prepareErr(notStrictEqual, ...err));
} as {
  (a: any, b: any): void;
  (a: any, b: any, status: number): void;
  (a: any, b: any, err: ErrorLike): void;
  (a: any, b: any, opts: Props): void;
  (a: any, b: any, status: number, err: ErrorLike): void;
  (a: any, b: any, err: ErrorLike, opts: Props): void;
  (a: any, b: any, status: number, err: ErrorLike, opts: Props): void;
};

/**
 * Check that a value is within a list.
 */
assert.includes = function includes(
  items: Includable,
  item: any,
  ...err: any[]
): void {
  throwFalsey(
    items && typeof items.includes === "function",
    new TypeError("Expected first arg to have an includes method"),
  );
  throwFalsey(items.includes(item), prepareErr(includes, ...err));
} as {
  (items: Array<any>, item: any): void;
  (items: Array<any>, item: any, status: number): void;
  (items: Array<any>, item: any, err: ErrorLike): void;
  (items: Array<any>, item: any, opts: Props): void;
  (items: Array<any>, item: any, status: number, err: ErrorLike): void;
  (items: Array<any>, item: any, err: ErrorLike, opts: Props): void;
  (
    items: Array<any>,
    item: any,
    status: number,
    err: ErrorLike,
    opts: Props,
  ): void;
};

/**
 * Check that a value is not within a list.
 */
assert.notIncludes = function notIncludes(
  items: Includable,
  item: any,
  ...err: any[]
): void {
  throwFalsey(
    items && typeof items.includes === "function",
    new TypeError("Expected first arg to have an includes method"),
  );
  throwFalsey(!items.includes(item), prepareErr(notIncludes, ...err));
} as {
  (items: Array<any>, item: any): void;
  (items: Array<any>, item: any, status: number): void;
  (items: Array<any>, item: any, err: ErrorLike): void;
  (items: Array<any>, item: any, opts: Props): void;
  (items: Array<any>, item: any, status: number, err: ErrorLike): void;
  (items: Array<any>, item: any, err: ErrorLike, opts: Props): void;
  (
    items: Array<any>,
    item: any,
    status: number,
    err: ErrorLike,
    opts: Props,
  ): void;
};

export default assert;
export type { AssertError };
