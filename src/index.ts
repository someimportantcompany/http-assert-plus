/**
 * @author: jdrydn <james@jdrydn.com> (https://jdrydn.com)
 * @license: MIT
 * @link: https://github.com/someimportantcompany/http-assert-plus
 */
import {
  assert,
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
function assertPlus(value: any): asserts value;
function assertPlus(value: any, status: number): asserts value;
function assertPlus(value: any, err: ErrorLike): asserts value;
function assertPlus(value: any, opts: Props): asserts value;
function assertPlus(value: any, status: number, err: ErrorLike): asserts value;
function assertPlus(value: any, err: ErrorLike, opts: Props): asserts value;
function assertPlus(
  value: any,
  status: number,
  err: ErrorLike,
  opts: Props,
): asserts value;
function assertPlus(value: any, ...err: any[]): asserts value {
  assert(value, prepareErr(assertPlus, ...err));
}

/**
 * Assert that a value is not falsey.
 */
assertPlus.ok = function ok(value: any, ...err: any[]): asserts value {
  assert(Boolean(value), prepareErr(ok, ...err));
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
assertPlus.fail = function fail(...err: any[]): never {
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
assertPlus.equal = function equal(a: any, b: any, ...err: any[]): void {
  // eslint-disable-next-line eqeqeq
  assert(a == b, prepareErr(equal, ...err));
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
assertPlus.notEqual = function notEqual(a: any, b: any, ...err: any[]): void {
  // eslint-disable-next-line eqeqeq
  assert(a != b, prepareErr(notEqual, ...err));
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
assertPlus.strictEqual = function strictEqual(
  a: any,
  b: any,
  ...err: any[]
): void {
  assert(a === b, prepareErr(strictEqual, ...err));
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
assertPlus.notStrictEqual = function notStrictEqual(
  a: any,
  b: any,
  ...err: any[]
): void {
  assert(a !== b, prepareErr(notStrictEqual, ...err));
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
assertPlus.includes = function includes(
  items: Includable,
  item: any,
  ...err: any[]
): void {
  assert(
    items && typeof items.includes === "function",
    new TypeError("Expected first arg to have an includes method"),
  );
  assert(items.includes(item), prepareErr(includes, ...err));
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
assertPlus.notIncludes = function notIncludes(
  items: Includable,
  item: any,
  ...err: any[]
): void {
  assert(
    items && typeof items.includes === "function",
    new TypeError("Expected first arg to have an includes method"),
  );
  assert(!items.includes(item), prepareErr(notIncludes, ...err));
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

export default assertPlus;
export type { AssertError };
