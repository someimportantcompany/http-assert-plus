/**
 * @author: jdrydn <james@jdrydn.com> (https://jdrydn.com)
 * @license: MIT
 * @link: https://github.com/someimportantcompany/http-assert-plus
 */

/**
 * Assert that a value is not falsey.
 */
declare function assert(value: any): asserts value;
declare function assert(value: any, status: number): asserts value;
declare function assert(value: any, err: Error | string): asserts value;
declare function assert(value: any, opts: Record<string, any>): asserts value;
declare function assert(value: any, status: number, err: Error | string): asserts value;
declare function assert(value: any, err: Error | string, opts: Record<string, any>): asserts value;
declare function assert(value: any, status: number, err: Error | string, opts: Record<string, any>): asserts value;

declare namespace assert {

  /**
   * Assert that a value is not falsey.
   */
  function ok(value: any): asserts value;
  function ok(value: any, status: number): asserts value;
  function ok(value: any, err: Error | string): asserts value;
  function ok(value: any, opts: Record<string, any>): asserts value;
  function ok(value: any, status: number, err: Error | string): asserts value;
  function ok(value: any, err: Error | string, opts: Record<string, any>): asserts value;
  function ok(value: any, status: number, err: Error | string, opts: Record<string, any>): asserts value;

  /**
   * Always throw an error.
   */
  function fail(): never;
  function fail(status: number): never;
  function fail(err: Error | string): never;
  function fail(opts: Record<string, any>): never;
  function fail(status: number, err: Error | string): never;
  function fail(err: Error | string, opts: Record<string, any>): never;
  function fail(status: number, err: Error | string, opts: Record<string, any>): never;

  /**
   * Compare loose equality between two values.
   */
  function equal(a: any, b: any): void;
  function equal(a: any, b: any, status: number): void;
  function equal(a: any, b: any, err: Error | string): void;
  function equal(a: any, b: any, opts: Record<string, any>): void;
  function equal(a: any, b: any, status: number, err: Error | string): void;
  function equal(a: any, b: any, err: Error | string, opts: Record<string, any>): void;
  function equal(a: any, b: any, status: number, err: Error | string, opts: Record<string, any>): void;

  /**
   * Compare loose inequality between two values.
   */
  function notEqual(a: any, b: any): void;
  function notEqual(a: any, b: any, status: number): void;
  function notEqual(a: any, b: any, err: Error | string): void;
  function notEqual(a: any, b: any, opts: Record<string, any>): void;
  function notEqual(a: any, b: any, status: number, err: Error | string): void;
  function notEqual(a: any, b: any, err: Error | string, opts: Record<string, any>): void;
  function notEqual(a: any, b: any, status: number, err: Error | string, opts: Record<string, any>): void;

  /**
   * Compare strict equality between two values.
   */
  function strictEqual(a: any, b: any): void;
  function strictEqual(a: any, b: any, status: number): void;
  function strictEqual(a: any, b: any, err: Error | string): void;
  function strictEqual(a: any, b: any, opts: Record<string, any>): void;
  function strictEqual(a: any, b: any, status: number, err: Error | string): void;
  function strictEqual(a: any, b: any, err: Error | string, opts: Record<string, any>): void;
  function strictEqual(a: any, b: any, status: number, err: Error | string, opts: Record<string, any>): void;

  /**
   * Compare strict inequality between two values.
   */
  function notStrictEqual(a: any, b: any): void;
  function notStrictEqual(a: any, b: any, status: number): void;
  function notStrictEqual(a: any, b: any, err: Error | string): void;
  function notStrictEqual(a: any, b: any, opts: Record<string, any>): void;
  function notStrictEqual(a: any, b: any, status: number, err: Error | string): void;
  function notStrictEqual(a: any, b: any, err: Error | string, opts: Record<string, any>): void;
  function notStrictEqual(a: any, b: any, status: number, err: Error | string, opts: Record<string, any>): void;

  /**
   * Check that a value is within a list.
   */
  function includes(items: Array<any>, item: any): void;
  function includes(items: Array<any>, item: any, status: number): void;
  function includes(items: Array<any>, item: any, err: Error | string): void;
  function includes(items: Array<any>, item: any, opts: Record<string, any>): void;
  function includes(items: Array<any>, item: any, status: number, err: Error | string): void;
  function includes(items: Array<any>, item: any, err: Error | string, opts: Record<string, any>): void;
  function includes(items: Array<any>, item: any, status: number, err: Error | string, opts: Record<string, any>): void;

  /**
   * Check that a value is not within a list.
   */
  function notIncludes(items: Array<any>, item: any): void;
  function notIncludes(items: Array<any>, item: any, status: number): void;
  function notIncludes(items: Array<any>, item: any, err: Error | string): void;
  function notIncludes(items: Array<any>, item: any, opts: Record<string, any>): void;
  function notIncludes(items: Array<any>, item: any, status: number, err: Error | string): void;
  function notIncludes(items: Array<any>, item: any, err: Error | string, opts: Record<string, any>): void;
  function notIncludes(items: Array<any>, item: any, status: number, err: Error | string, opts: Record<string, any>): void;

}

export = assert;
