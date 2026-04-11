import { describe, expect, it } from "vitest";

import assert, { type AssertError } from "./index";

function catchErr(fn: () => void): AssertError {
  try {
    fn();
    throw new Error("Expected function to throw");
  } catch (err) {
    return err as AssertError;
  }
}

describe("assert", () => {
  it("should not throw for truthy values", () => {
    expect(() => assert(true)).not.toThrow();
    expect(() => assert(1)).not.toThrow();
    expect(() => assert("yes")).not.toThrow();
    expect(() => assert({})).not.toThrow();
  });

  it("should throw for falsy values", () => {
    expect(() => assert(false)).toThrow();
    expect(() => assert(0)).toThrow();
    expect(() => assert("")).toThrow();
    expect(() => assert(null)).toThrow();
    expect(() => assert(undefined)).toThrow();
  });

  it("should throw with a status code", () => {
    const err = catchErr(() => assert(false, 404));
    expect(err.status).toBe(404);
    expect(err.statusCode).toBe(404);
    expect(err.statusText).toBe("Not Found");
  });

  it("should throw with a message string", () => {
    const err = catchErr(() => assert(false, "Missing item"));
    expect(err.message).toBe("Missing item");
  });

  it("should throw with an Error", () => {
    const original = new Error("Original");
    const err = catchErr(() => assert(false, original));
    expect(err).toBe(original);
  });

  it("should throw with a props object", () => {
    const err = catchErr(() => assert(false, { status: 400, code: "BAD" }));
    expect(err.status).toBe(400);
    expect(err.code).toBe("BAD");
  });

  it("should throw with status and message", () => {
    const err = catchErr(() => assert(false, 422, "Invalid input"));
    expect(err.status).toBe(422);
    expect(err.message).toBe("Invalid input");
  });

  it("should throw with message and props", () => {
    const err = catchErr(() => assert(false, "Nope", { code: "REJECTED" }));
    expect(err.message).toBe("Nope");
    expect(err.code).toBe("REJECTED");
  });

  it("should throw with status, message, and props", () => {
    const err = catchErr(() =>
      assert(false, 403, "Forbidden", { resource: "secret" }),
    );
    expect(err.status).toBe(403);
    expect(err.message).toBe("Forbidden");
    expect(err.resource).toBe("secret");
  });
});

describe("assert.ok", () => {
  it("should not throw for truthy values", () => {
    expect(() => assert.ok(true)).not.toThrow();
    expect(() => assert.ok(1)).not.toThrow();
  });

  it("should throw for falsy values", () => {
    expect(() => assert.ok(false)).toThrow();
    expect(() => assert.ok(0)).toThrow();
    expect(() => assert.ok(null)).toThrow();
  });

  it("should throw with a status code", () => {
    const err = catchErr(() => assert.ok(false, 401));
    expect(err.status).toBe(401);
  });
});

describe("assert.fail", () => {
  it("should always throw with no args", () => {
    const err = catchErr(() => assert.fail());
    expect(err.message).toBe("An error occurred");
  });

  it("should throw with a status code", () => {
    const err = catchErr(() => assert.fail(500));
    expect(err.status).toBe(500);
    expect(err.statusText).toBe("Internal Server Error");
  });

  it("should throw with a message", () => {
    const err = catchErr(() => assert.fail("Something went wrong"));
    expect(err.message).toBe("Something went wrong");
  });

  it("should throw with status and message", () => {
    const err = catchErr(() => assert.fail(502, "Upstream down"));
    expect(err.status).toBe(502);
    expect(err.message).toBe("Upstream down");
  });

  it("should throw with status, message, and props", () => {
    const err = catchErr(() =>
      assert.fail(503, "Unavailable", { retryAfter: 30 }),
    );
    expect(err.status).toBe(503);
    expect(err.message).toBe("Unavailable");
    expect(err.retryAfter).toBe(30);
  });
});

describe("assert.equal", () => {
  it("should not throw for loosely equal values", () => {
    expect(() => assert.equal(1, 1)).not.toThrow();
    expect(() => assert.equal(1, "1")).not.toThrow();
    expect(() => assert.equal(null, undefined)).not.toThrow();
  });

  it("should throw for unequal values", () => {
    expect(() => assert.equal(1, 2)).toThrow();
    expect(() => assert.equal("a", "b")).toThrow();
  });

  it("should throw with a status code", () => {
    const err = catchErr(() => assert.equal(1, 2, 400));
    expect(err.status).toBe(400);
  });
});

describe("assert.notEqual", () => {
  it("should not throw for unequal values", () => {
    expect(() => assert.notEqual(1, 2)).not.toThrow();
    expect(() => assert.notEqual("a", "b")).not.toThrow();
  });

  it("should throw for loosely equal values", () => {
    expect(() => assert.notEqual(1, 1)).toThrow();
    expect(() => assert.notEqual(1, "1")).toThrow();
    expect(() => assert.notEqual(null, undefined)).toThrow();
  });

  it("should throw with a status code", () => {
    const err = catchErr(() => assert.notEqual(1, 1, 409));
    expect(err.status).toBe(409);
  });
});

describe("assert.strictEqual", () => {
  it("should not throw for strictly equal values", () => {
    expect(() => assert.strictEqual(1, 1)).not.toThrow();
    expect(() => assert.strictEqual("a", "a")).not.toThrow();
  });

  it("should throw for non-strictly-equal values", () => {
    expect(() => assert.strictEqual(1, "1")).toThrow();
    expect(() => assert.strictEqual(null, undefined)).toThrow();
    expect(() => assert.strictEqual(1, 2)).toThrow();
  });

  it("should throw with a status code", () => {
    const err = catchErr(() => assert.strictEqual(1, 2, 400));
    expect(err.status).toBe(400);
  });
});

describe("assert.notStrictEqual", () => {
  it("should not throw for non-strictly-equal values", () => {
    expect(() => assert.notStrictEqual(1, "1")).not.toThrow();
    expect(() => assert.notStrictEqual(1, 2)).not.toThrow();
  });

  it("should throw for strictly equal values", () => {
    expect(() => assert.notStrictEqual(1, 1)).toThrow();
    expect(() => assert.notStrictEqual("a", "a")).toThrow();
  });

  it("should throw with a status code", () => {
    const err = catchErr(() => assert.notStrictEqual(1, 1, 409));
    expect(err.status).toBe(409);
  });
});

describe("assert.includes", () => {
  it("should not throw when item is in the list", () => {
    expect(() => assert.includes([1, 2, 3], 2)).not.toThrow();
    expect(() => assert.includes(["a", "b"], "a")).not.toThrow();
  });

  it("should throw when item is not in the list", () => {
    expect(() => assert.includes([1, 2, 3], 4)).toThrow();
    expect(() => assert.includes(["a", "b"], "c")).toThrow();
  });

  it("should throw TypeError when first arg has no includes method", () => {
    expect(() => assert.includes(null as any, 1)).toThrow(TypeError);
    expect(() => assert.includes(42 as any, 1)).toThrow(TypeError);
  });

  it("should throw with a status code", () => {
    const err = catchErr(() => assert.includes([1, 2], 3, 400));
    expect(err.status).toBe(400);
  });

  it("should throw with a message and props", () => {
    const err = catchErr(() =>
      assert.includes([1, 2], 3, "Not in list", { code: "MISSING" }),
    );
    expect(err.message).toBe("Not in list");
    expect(err.code).toBe("MISSING");
  });
});

describe("assert.notIncludes", () => {
  it("should not throw when item is not in the list", () => {
    expect(() => assert.notIncludes([1, 2, 3], 4)).not.toThrow();
    expect(() => assert.notIncludes(["a", "b"], "c")).not.toThrow();
  });

  it("should throw when item is in the list", () => {
    expect(() => assert.notIncludes([1, 2, 3], 2)).toThrow();
    expect(() => assert.notIncludes(["a", "b"], "a")).toThrow();
  });

  it("should throw TypeError when first arg has no includes method", () => {
    expect(() => assert.notIncludes(null as any, 1)).toThrow(TypeError);
  });

  it("should throw with a status code", () => {
    const err = catchErr(() => assert.notIncludes([1, 2], 2, 409));
    expect(err.status).toBe(409);
  });
});
