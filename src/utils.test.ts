import { describe, expect, it } from "vitest";

import {
  throwFalsey,
  httpStatuses,
  isErrorLike,
  isObject,
  isStatus,
  prepareErr,
  type AssertError,
} from "./utils";

describe("isStatus", () => {
  it("should return true for valid HTTP status codes", () => {
    expect(isStatus(200)).toBe(true);
    expect(isStatus(404)).toBe(true);
    expect(isStatus(500)).toBe(true);
  });

  it("should return false for invalid status codes", () => {
    expect(isStatus(0)).toBe(false);
    expect(isStatus(999)).toBe(false);
    expect(isStatus(-1)).toBe(false);
  });

  it("should return false for non-numbers", () => {
    expect(isStatus("200")).toBe(false);
    expect(isStatus(null)).toBe(false);
    expect(isStatus(undefined)).toBe(false);
  });
});

describe("isErrorLike", () => {
  it("should return true for strings", () => {
    expect(isErrorLike("something")).toBe(true);
    expect(isErrorLike("")).toBe(true);
  });

  it("should return true for Error instances", () => {
    expect(isErrorLike(new Error("test"))).toBe(true);
    expect(isErrorLike(new TypeError("test"))).toBe(true);
  });

  it("should return false for other types", () => {
    expect(isErrorLike(42)).toBe(false);
    expect(isErrorLike(null)).toBe(false);
    expect(isErrorLike({})).toBe(false);
    expect(isErrorLike(undefined)).toBe(false);
  });
});

describe("isObject", () => {
  it("should return true for plain objects", () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ key: "value" })).toBe(true);
  });

  it("should return false for non-plain-objects", () => {
    expect(isObject(null)).toBe(false);
    expect(isObject([])).toBe(false);
    expect(isObject("string")).toBe(false);
    expect(isObject(42)).toBe(false);
    expect(isObject(new Error("test"))).toBe(false);
  });
});

describe("throwFalsey", () => {
  it("should not throw for truthy values", () => {
    expect(() => throwFalsey(true, new Error("fail"))).not.toThrow();
    expect(() => throwFalsey(1, new Error("fail"))).not.toThrow();
    expect(() => throwFalsey("yes", new Error("fail"))).not.toThrow();
  });

  it("should throw the provided error for falsy values", () => {
    const err = new Error("test error");
    expect(() => throwFalsey(false, err)).toThrow(err);
    expect(() => throwFalsey(0, err)).toThrow(err);
    expect(() => throwFalsey("", err)).toThrow(err);
    expect(() => throwFalsey(null, err)).toThrow(err);
    expect(() => throwFalsey(undefined, err)).toThrow(err);
  });
});

describe("prepareErr", () => {
  const noop = () => {};

  it("should return a default error with no args", () => {
    const err = prepareErr(noop);
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toBe("An error occurred");
  });

  describe("with a single status code", () => {
    it("should set status, statusCode, and statusText", () => {
      const err = prepareErr(noop, 404);
      expect(err.message).toBe("HTTP 404 - Not Found");
      expect(err.status).toBe(404);
      expect(err.statusCode).toBe(404);
      expect(err.statusText).toBe("Not Found");
    });

    it("should throw TypeError for an invalid status code", () => {
      expect(() => prepareErr(noop, 999)).toThrow(TypeError);
    });
  });

  describe("with a single string", () => {
    it("should use the string as the error message", () => {
      const err = prepareErr(noop, "Something broke");
      expect(err.message).toBe("Something broke");
      expect(err.status).toBeUndefined();
    });
  });

  describe("with a single Error", () => {
    it("should use the Error as-is", () => {
      const original = new Error("Original");
      const err = prepareErr(noop, original);
      expect(err).toBe(original);
    });
  });

  describe("with a single props object", () => {
    it("should extract status from props", () => {
      const err = prepareErr(noop, { status: 400 });
      expect(err.status).toBe(400);
      expect(err.statusCode).toBe(400);
    });

    it("should extract statusCode from props", () => {
      const err = prepareErr(noop, { statusCode: 401 });
      expect(err.status).toBe(401);
      expect(err.statusCode).toBe(401);
    });

    it("should extract message from props", () => {
      const err = prepareErr(noop, { message: "Custom message" });
      expect(err.message).toBe("Custom message");
    });

    it("should extract error from props as message", () => {
      const err = prepareErr(noop, { error: "Error string" });
      expect(err.message).toBe("Error string");
    });

    it("should assign extra props to the error", () => {
      const err = prepareErr(noop, { status: 400, code: "INVALID" });
      expect(err.code).toBe("INVALID");
    });
  });

  describe("with status and error string", () => {
    it("should set the status and message", () => {
      const err = prepareErr(noop, 403, "Forbidden resource");
      expect(err.message).toBe("Forbidden resource");
      expect(err.status).toBe(403);
      expect(err.statusCode).toBe(403);
      expect(err.statusText).toBe("Forbidden");
    });

    it("should throw TypeError for invalid status", () => {
      expect(() => prepareErr(noop, 999, "msg")).toThrow(TypeError);
    });
  });

  describe("with error string and props", () => {
    it("should set message and assign props", () => {
      const err = prepareErr(noop, "Bad input", { code: "VALIDATION" });
      expect(err.message).toBe("Bad input");
      expect(err.code).toBe("VALIDATION");
    });

    it("should extract status from props", () => {
      const err = prepareErr(noop, "Nope", { status: 422 });
      expect(err.status).toBe(422);
      expect(err.statusCode).toBe(422);
    });

    it("should extract status from Error instance", () => {
      const original = Object.assign(new Error("err"), { status: 409 });
      const err = prepareErr(noop, original, {});
      expect(err.status).toBe(409);
    });
  });

  describe("with status, error string, and props", () => {
    it("should set all fields", () => {
      const err = prepareErr(noop, 400, "Invalid", { code: "BAD" });
      expect(err.message).toBe("Invalid");
      expect(err.status).toBe(400);
      expect(err.statusCode).toBe(400);
      expect(err.statusText).toBe("Bad Request");
      expect(err.code).toBe("BAD");
    });
  });

  describe("with invalid arguments", () => {
    it("should throw TypeError for unsupported arg combinations", () => {
      expect(() => prepareErr(noop, true as any)).toThrow(TypeError);
      expect(() => prepareErr(noop, true as any, true as any)).toThrow(
        TypeError,
      );
    });
  });

  it("should include all httpStatuses entries", () => {
    expect(Object.keys(httpStatuses).length).toBeGreaterThan(0);
    for (const [code, text] of Object.entries(httpStatuses)) {
      const err = prepareErr(noop, Number(code));
      expect(err.statusText).toBe(text);
    }
  });
});
