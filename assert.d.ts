type ErrorLike = string | Error;
type AdditionalProps = Record<string, any>

interface assert {
  (value: any): void;
  (value: any, status: number): void;
  (value: any, err: ErrorLike): void;
  (value: any, opts: AdditionalProps): void;
  (value: any, status: number, err: ErrorLike): void;
  (value: any, err: ErrorLike, opts: AdditionalProps): void;
  (value: any, status: number, err: ErrorLike, opts: AdditionalProps): void;

  ok(value: any): void;
  ok(value: any, status: number): void;
  ok(value: any, err: ErrorLike): void;
  ok(value: any, opts: AdditionalProps): void;
  ok(value: any, status: number, err: ErrorLike): void;
  ok(value: any, err: ErrorLike, opts: AdditionalProps): void;
  ok(value: any, status: number, err: ErrorLike, opts: AdditionalProps): void;

  fail(status: number): void;
  fail(err: ErrorLike): void;
  fail(opts: AdditionalProps): void;
  fail(status: number, err: ErrorLike): void;
  fail(err: ErrorLike, opts: AdditionalProps): void;
  fail(status: number, err: ErrorLike, opts: AdditionalProps): void;

  equal(a: any, b: any, status: number): void;
  equal(a: any, b: any, err: ErrorLike): void;
  equal(a: any, b: any, opts: AdditionalProps): void;
  equal(a: any, b: any, status: number, err: ErrorLike): void;
  equal(a: any, b: any, err: ErrorLike, opts: AdditionalProps): void;
  equal(a: any, b: any, status: number, err: ErrorLike, opts: AdditionalProps): void;

  notEqual(a: any, b: any, status: number): void;
  notEqual(a: any, b: any, err: ErrorLike): void;
  notEqual(a: any, b: any, opts: AdditionalProps): void;
  notEqual(a: any, b: any, status: number, err: ErrorLike): void;
  notEqual(a: any, b: any, err: ErrorLike, opts: AdditionalProps): void;
  notEqual(a: any, b: any, status: number, err: ErrorLike, opts: AdditionalProps): void;

  strictEqual(a: any, b: any, status: number): void;
  strictEqual(a: any, b: any, err: ErrorLike): void;
  strictEqual(a: any, b: any, opts: AdditionalProps): void;
  strictEqual(a: any, b: any, status: number, err: ErrorLike): void;
  strictEqual(a: any, b: any, err: ErrorLike, opts: AdditionalProps): void;
  strictEqual(a: any, b: any, status: number, err: ErrorLike, opts: AdditionalProps): void;

  notStrictEqual(a: any, b: any, status: number): void;
  notStrictEqual(a: any, b: any, err: ErrorLike): void;
  notStrictEqual(a: any, b: any, opts: AdditionalProps): void;
  notStrictEqual(a: any, b: any, status: number, err: ErrorLike): void;
  notStrictEqual(a: any, b: any, err: ErrorLike, opts: AdditionalProps): void;
  notStrictEqual(a: any, b: any, status: number, err: ErrorLike, opts: AdditionalProps): void;

  includes(items: Array<any>, item: any, status: number): void;
  includes(items: Array<any>, item: any, err: ErrorLike): void;
  includes(items: Array<any>, item: any, opts: AdditionalProps): void;
  includes(items: Array<any>, item: any, status: number, err: ErrorLike): void;
  includes(items: Array<any>, item: any, err: ErrorLike, opts: AdditionalProps): void;
  includes(items: Array<any>, item: any, status: number, err: ErrorLike, opts: AdditionalProps): void;

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
