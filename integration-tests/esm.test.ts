import { describe, expect, it } from "vitest";
import assert from "http-assert-plus";

describe("ESM import", () => {
  it("should export assert as default", () => {
    expect(typeof assert).toBe("function");
  });

  it("should expose .ok", () => {
    expect(typeof assert.ok).toBe("function");
  });

  it("should expose .fail", () => {
    expect(typeof assert.fail).toBe("function");
  });

  it("should expose .equal", () => {
    expect(typeof assert.equal).toBe("function");
  });

  it("should expose .notEqual", () => {
    expect(typeof assert.notEqual).toBe("function");
  });

  it("should expose .strictEqual", () => {
    expect(typeof assert.strictEqual).toBe("function");
  });

  it("should expose .notStrictEqual", () => {
    expect(typeof assert.notStrictEqual).toBe("function");
  });

  it("should expose .includes", () => {
    expect(typeof assert.includes).toBe("function");
  });

  it("should expose .notIncludes", () => {
    expect(typeof assert.notIncludes).toBe("function");
  });

  it("should not throw for truthy values", () => {
    expect(() => assert(true)).not.toThrow();
    expect(() => assert(1)).not.toThrow();
    expect(() => assert("yes")).not.toThrow();
  });

  it("should throw for falsy values", () => {
    expect(() => assert(false)).toThrow();
    expect(() => assert(0)).toThrow();
    expect(() => assert(null)).toThrow();
  });

  it("should throw with status code and message", () => {
    try {
      assert(false, 404, "Not found");
    } catch (err: any) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe("Not found");
      expect(err.status).toBe(404);
      expect(err.statusCode).toBe(404);
      expect(err.statusText).toBe("Not Found");
      return;
    }
    throw new Error("Expected assert to throw");
  });

  it("should work with assert.ok", () => {
    expect(() => assert.ok(true)).not.toThrow();
    expect(() => assert.ok(false)).toThrow();
  });

  it("should work with assert.fail", () => {
    try {
      assert.fail(500, "Server error");
    } catch (err: any) {
      expect(err.status).toBe(500);
      expect(err.message).toBe("Server error");
      return;
    }
    throw new Error("Expected assert.fail to throw");
  });

  it("should work with assert.equal", () => {
    expect(() => assert.equal(1, 1)).not.toThrow();
    expect(() => assert.equal(1, 2, 400)).toThrow();
  });

  it("should work with assert.strictEqual", () => {
    expect(() => assert.strictEqual("a", "a")).not.toThrow();
    expect(() => assert.strictEqual(1, "1")).toThrow();
  });

  it("should work with assert.includes", () => {
    expect(() => assert.includes(["a", "b", "c"], "b")).not.toThrow();
    expect(() => assert.includes(["a", "b"], "z", 400)).toThrow();
  });

  it("should work with assert.notIncludes", () => {
    expect(() => assert.notIncludes(["a", "b"], "z")).not.toThrow();
    expect(() => assert.notIncludes(["a", "b"], "a", 409)).toThrow();
  });
});
