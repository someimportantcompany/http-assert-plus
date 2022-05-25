type ErrorLike = string | Error;

interface assert {
  (value: any): void;
  (value: any, status: number): void;
  (value: any, err: ErrorLike): void;
  (value: any, opts: object): void;
  (value: any, status: number, err: ErrorLike): void;
  (value: any, err: ErrorLike, opts: object): void;
  (value: any, status: number, err: ErrorLike, opts: object): void;

  ok(value: any): void;
  ok(value: any, status: number): void;
  ok(value: any, err: ErrorLike): void;
  ok(value: any, opts: object): void;
  ok(value: any, status: number, err: ErrorLike): void;
  ok(value: any, err: ErrorLike, opts: object): void;
  ok(value: any, status: number, err: ErrorLike, opts: object): void;

  fail(status: number): void;
  fail(err: ErrorLike): void;
  fail(opts: object): void;
  fail(status: number, err: ErrorLike): void;
  fail(err: ErrorLike, opts: object): void;
  fail(status: number, err: ErrorLike, opts: object): void;

  equal(a: any, b: any, status: number): void;
  equal(a: any, b: any, err: ErrorLike): void;
  equal(a: any, b: any, opts: object): void;
  equal(a: any, b: any, status: number, err: ErrorLike): void;
  equal(a: any, b: any, err: ErrorLike, opts: object): void;
  equal(a: any, b: any, status: number, err: ErrorLike, opts: object): void;

  notEqual(a: any, b: any, status: number): void;
  notEqual(a: any, b: any, err: ErrorLike): void;
  notEqual(a: any, b: any, opts: object): void;
  notEqual(a: any, b: any, status: number, err: ErrorLike): void;
  notEqual(a: any, b: any, err: ErrorLike, opts: object): void;
  notEqual(a: any, b: any, status: number, err: ErrorLike, opts: object): void;

  strictEqual(a: any, b: any, status: number): void;
  strictEqual(a: any, b: any, err: ErrorLike): void;
  strictEqual(a: any, b: any, opts: object): void;
  strictEqual(a: any, b: any, status: number, err: ErrorLike): void;
  strictEqual(a: any, b: any, err: ErrorLike, opts: object): void;
  strictEqual(a: any, b: any, status: number, err: ErrorLike, opts: object): void;

  notStrictEqual(a: any, b: any, status: number): void;
  notStrictEqual(a: any, b: any, err: ErrorLike): void;
  notStrictEqual(a: any, b: any, opts: object): void;
  notStrictEqual(a: any, b: any, status: number, err: ErrorLike): void;
  notStrictEqual(a: any, b: any, err: ErrorLike, opts: object): void;
  notStrictEqual(a: any, b: any, status: number, err: ErrorLike, opts: object): void;

  includes(items: Array<any>, item: any, status: number): void;
  includes(items: Array<any>, item: any, err: ErrorLike): void;
  includes(items: Array<any>, item: any, opts: object): void;
  includes(items: Array<any>, item: any, status: number, err: ErrorLike): void;
  includes(items: Array<any>, item: any, err: ErrorLike, opts: object): void;
  includes(items: Array<any>, item: any, status: number, err: ErrorLike, opts: object): void;

  notIncludes(items: Array<any>, item: any, status: number): void;
  notIncludes(items: Array<any>, item: any, err: ErrorLike): void;
  notIncludes(items: Array<any>, item: any, opts: object): void;
  notIncludes(items: Array<any>, item: any, status: number, err: ErrorLike): void;
  notIncludes(items: Array<any>, item: any, err: ErrorLike, opts: object): void;
  notIncludes(items: Array<any>, item: any, status: number, err: ErrorLike, opts: object): void;

  create(defaults: object): assert
}

declare const exp: assert;
export default exp;
