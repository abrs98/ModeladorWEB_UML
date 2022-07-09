/* eslint-disable no-undef */
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const checkJwt = (config) => {
  return jwt({
    // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: config.auth.jwks,
    }),

    // Validate the audience and the issuer.
    audience: config.auth.aud,
    issuer: config.auth.domain,
    algorithms: ['RS256'],
  });
}

module.exports = {
  checkJwt,
};
