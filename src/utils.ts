/**
 * @author: jdrydn <james@jdrydn.com> (https://jdrydn.com)
 * @license: MIT
 * @link: https://github.com/someimportantcompany/http-assert-plus
 */

export interface AssertError extends Error {
  status?: number;
  statusCode?: number;
  statusText?: string;
  [key: string]: any;
}

export const httpStatuses: Record<string, string> = {
  // @link https://github.com/jshttp/statuses/blob/454ceb6e0bfea4f889be244de2538df8afb4dc2a/src/iana.json
  "100": "Continue",
  "101": "Switching Protocols",
  "102": "Processing",
  "103": "Early Hints",
  "200": "OK",
  "201": "Created",
  "202": "Accepted",
  "203": "Non-Authoritative Information",
  "204": "No Content",
  "205": "Reset Content",
  "206": "Partial Content",
  "207": "Multi-Status",
  "208": "Already Reported",
  "226": "IM Used",
  "300": "Multiple Choices",
  "301": "Moved Permanently",
  "302": "Found",
  "303": "See Other",
  "304": "Not Modified",
  "305": "Use Proxy",
  "307": "Temporary Redirect",
  "308": "Permanent Redirect",
  "400": "Bad Request",
  "401": "Unauthorized",
  "402": "Payment Required",
  "403": "Forbidden",
  "404": "Not Found",
  "405": "Method Not Allowed",
  "406": "Not Acceptable",
  "407": "Proxy Authentication Required",
  "408": "Request Timeout",
  "409": "Conflict",
  "410": "Gone",
  "411": "Length Required",
  "412": "Precondition Failed",
  "413": "Payload Too Large",
  "414": "URI Too Long",
  "415": "Unsupported Media Type",
  "416": "Range Not Satisfiable",
  "417": "Expectation Failed",
  "421": "Misdirected Request",
  "422": "Unprocessable Entity",
  "423": "Locked",
  "424": "Failed Dependency",
  "425": "Too Early",
  "426": "Upgrade Required",
  "428": "Precondition Required",
  "429": "Too Many Requests",
  "431": "Request Header Fields Too Large",
  "451": "Unavailable For Legal Reasons",
  "500": "Internal Server Error",
  "501": "Not Implemented",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
  "504": "Gateway Timeout",
  "505": "HTTP Version Not Supported",
  "506": "Variant Also Negotiates",
  "507": "Insufficient Storage",
  "508": "Loop Detected",
  "510": "Not Extended",
  "511": "Network Authentication Required",
};

export function isStatus(s: unknown): s is number {
  return typeof s === "number" && typeof httpStatuses[`${s}`] === "string";
}

export type ErrorLike = string | Error;
export type Props = Record<string, any>;

export function isErrorLike(e: unknown): e is ErrorLike {
  return typeof e === "string" || e instanceof Error;
}

export function isObject(o: unknown): o is Record<string, any> {
  return Object.prototype.toString.call(o) === "[object Object]";
}

export function throwFalsey(value: unknown, err: Error): asserts value {
  if (!value) {
    throw err;
  }
}

export function prepareErr(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  assertConstructor: Function,
  ...args: any[]
): AssertError {
  let err: ErrorLike = "An error occurred";
  let props: Props | null = null;
  let status: number | null = null;

  if (args.length === 3) {
    [status, err, props] = args;
    throwFalsey(
      isStatus(status),
      new TypeError("Expected first argument to be a HTTP status"),
    );
    throwFalsey(
      isErrorLike(err),
      new TypeError("Expected second argument to be a string or Error"),
    );
    throwFalsey(
      isObject(props),
      new TypeError("Expected third argument to be an object"),
    );
  } else if (args.length === 2 && typeof args[0] === "number") {
    [status, err] = args;
    throwFalsey(
      isStatus(status),
      new TypeError("Expected first argument to be a HTTP status"),
    );
    throwFalsey(
      isErrorLike(err),
      new TypeError("Expected second argument to be a string or Error"),
    );
  } else if (args.length === 2 && isErrorLike(args[0])) {
    [err, props] = args;
    throwFalsey(
      isErrorLike(err),
      new TypeError("Expected second argument to be a string or Error"),
    );
    throwFalsey(
      isObject(props),
      new TypeError("Expected third argument to be an object"),
    );

    const errAny = err as any;
    status =
      (isStatus(errAny.status) ? errAny.status : undefined) ||
      (isStatus(errAny.statusCode) ? errAny.statusCode : undefined) ||
      (isStatus(props!.status) ? props!.status : undefined) ||
      (isStatus(props!.statusCode) ? props!.statusCode : undefined) ||
      null;
  } else if (args.length === 1 && typeof args[0] === "number") {
    [status] = args;
    throwFalsey(
      isStatus(status),
      new TypeError("Expected argument to be a HTTP status"),
    );
    err = `HTTP ${status} - ${httpStatuses[`${status}`]}`;
  } else if (args.length === 1 && isErrorLike(args[0])) {
    [err] = args;
  } else if (args.length === 1 && isObject(args[0])) {
    [props] = args;

    status =
      (isStatus(props!.status) ? props!.status : undefined) ||
      (isStatus(props!.statusCode) ? props!.statusCode : undefined) ||
      null;
    err =
      (typeof props!.message === "string" ? props!.message : undefined) ||
      (typeof props!.error === "string" ? props!.error : undefined) ||
      err;
  } else if (args.length === 0) {
    // Just default to "An error occurred"
  } else {
    throw new TypeError("Invalid arguments passed to http-assert-plus");
  }

  const error: AssertError = err instanceof Error ? err : new Error(`${err}`);

  if (typeof (Error as any).captureStackTrace === "function") {
    (Error as any).captureStackTrace(error, assertConstructor);
  }

  Object.assign(error, props || {});

  if (isStatus(status)) {
    error.status = error.statusCode = status;
    error.statusText = httpStatuses[`${status}`];
  }

  return error;
}
