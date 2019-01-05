const httpStatusCode = {
  ok: 200,
  accepted: 202,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  unprocessableEntity: 422,
  tooManyRequests: 429,
  internalServerError: 500,
  gatewayTimeout: 504
};

module.exports = { httpStatusCode };
