type ErrorLike = string | Error;
type AdditionalProps = Record<string, any>

// @link https://developer.mozilla.org/en-US/docs/Glossary/Falsy
type Not_T = '' | 0 | -0 | 0n | false | null | undefined | typeof NaN;

interface assert {
  <T>(value: T | Not_T): asserts value is T;
  <T>(value: T | Not_T, status: number): asserts value is T;
  <T>(value: T | Not_T, err: ErrorLike): asserts value is T;
  <T>(value: T | Not_T, opts: AdditionalProps): asserts value is T;
  <T>(value: T | Not_T, status: number, err: ErrorLike): asserts value is T;
  <T>(value: T | Not_T, err: ErrorLike, opts: AdditionalProps): asserts value is T;
  <T>(value: T | Not_T, status: number, err: ErrorLike, opts: object): asserts value is T;

  ok<T>(value: T | Not_T): asserts value is T;
  ok<T>(value: T | Not_T, status: number): asserts value is T;
  ok<T>(value: T | Not_T, err: ErrorLike): asserts value is T;
  ok<T>(value: T | Not_T, opts: AdditionalProps): asserts value is T;
  ok<T>(value: T | Not_T, status: number, err: ErrorLike): asserts value is T;
  ok<T>(value: T | Not_T, err: ErrorLike, opts: AdditionalProps): asserts value is T;
  ok<T>(value: T | Not_T, status: number, err: ErrorLike, opts: AdditionalProps): asserts value is T;

  fail(): never;
  fail(status: number): never;
  fail(err: ErrorLike): never;
  fail(opts: AdditionalProps): never;
  fail(status: number, err: ErrorLike): never;
  fail(err: ErrorLike, opts: AdditionalProps): never;
  fail(status: number, err: ErrorLike, opts: AdditionalProps): never;

  equal(a: any, b: any): void;
  equal(a: any, b: any, status: number): void;
  equal(a: any, b: any, err: ErrorLike): void;
  equal(a: any, b: any, opts: AdditionalProps): void;
  equal(a: any, b: any, status: number, err: ErrorLike): void;
  equal(a: any, b: any, err: ErrorLike, opts: AdditionalProps): void;
  equal(a: any, b: any, status: number, err: ErrorLike, opts: AdditionalProps): void;

  notEqual(a: any, b: any): void;
  notEqual(a: any, b: any, status: number): void;
  notEqual(a: any, b: any, err: ErrorLike): void;
  notEqual(a: any, b: any, opts: AdditionalProps): void;
  notEqual(a: any, b: any, status: number, err: ErrorLike): void;
  notEqual(a: any, b: any, err: ErrorLike, opts: AdditionalProps): void;
  notEqual(a: any, b: any, status: number, err: ErrorLike, opts: AdditionalProps): void;

  strictEqual(a: any, b: any): void;
  strictEqual(a: any, b: any, status: number): void;
  strictEqual(a: any, b: any, err: ErrorLike): void;
  strictEqual(a: any, b: any, opts: AdditionalProps): void;
  strictEqual(a: any, b: any, status: number, err: ErrorLike): void;
  strictEqual(a: any, b: any, err: ErrorLike, opts: AdditionalProps): void;
  strictEqual(a: any, b: any, status: number, err: ErrorLike, opts: AdditionalProps): void;

  notStrictEqual(a: any, b: any): void;
  notStrictEqual(a: any, b: any, status: number): void;
  notStrictEqual(a: any, b: any, err: ErrorLike): void;
  notStrictEqual(a: any, b: any, opts: AdditionalProps): void;
  notStrictEqual(a: any, b: any, status: number, err: ErrorLike): void;
  notStrictEqual(a: any, b: any, err: ErrorLike, opts: AdditionalProps): void;
  notStrictEqual(a: any, b: any, status: number, err: ErrorLike, opts: AdditionalProps): void;

  includes(items: Array<any>, item: any): void;
  includes(items: Array<any>, item: any, status: number): void;
  includes(items: Array<any>, item: any, err: ErrorLike): void;
  includes(items: Array<any>, item: any, opts: AdditionalProps): void;
  includes(items: Array<any>, item: any, status: number, err: ErrorLike): void;
  includes(items: Array<any>, item: any, err: ErrorLike, opts: AdditionalProps): void;
  includes(items: Array<any>, item: any, status: number, err: ErrorLike, opts: AdditionalProps): void;

  notIncludes(items: Array<any>, item: any): void;
  notIncludes(items: Array<any>, item: any, status: number): void;
  notIncludes(items: Array<any>, item: any, err: ErrorLike): void;
  notIncludes(items: Array<any>, item: any, opts: AdditionalProps): void;
  notIncludes(items: Array<any>, item: any, status: number, err: ErrorLike): void;
  notIncludes(items: Array<any>, item: any, err: ErrorLike, opts: AdditionalProps): void;
  notIncludes(items: Array<any>, item: any, status: number, err: ErrorLike, opts: AdditionalProps): void;
}

declare const exp: assert & {
  create(defaults?: AdditionalProps): assert;
};

export default exp;
