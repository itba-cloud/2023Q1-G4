// HTTP response types
export enum HTTPStatusCodes {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

// HTTP error classes
export class ApiError extends Error {
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
    this.message = message;
  }
  code: number;
  message: string;
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(HTTPStatusCodes.BAD_REQUEST, message);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(HTTPStatusCodes.UNAUTHORIZED, message);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string) {
    super(HTTPStatusCodes.FORBIDDEN, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(HTTPStatusCodes.NOT_FOUND, message);
  }
}

export class ConflictError extends ApiError {
  constructor(message: string) {
    super(HTTPStatusCodes.CONFLICT, message);
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string) {
    super(HTTPStatusCodes.INTERNAL_SERVER_ERROR, message);
  }
}

// Map of HTTP status codes to error classes
export const ApiErrors = new Map([
  [HTTPStatusCodes.BAD_REQUEST, BadRequestError],
  [HTTPStatusCodes.UNAUTHORIZED, UnauthorizedError],
  [HTTPStatusCodes.FORBIDDEN, ForbiddenError],
  [HTTPStatusCodes.NOT_FOUND, NotFoundError],
  [HTTPStatusCodes.CONFLICT, ConflictError],
  [HTTPStatusCodes.INTERNAL_SERVER_ERROR, InternalServerError],
]);



