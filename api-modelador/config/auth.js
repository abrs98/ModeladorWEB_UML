/* eslint-disable no-undef */
module.exports = {
  domain: process.env.AUTH0_DOMAIN,
  aud: process.env.AUTH0_AUDIENCE,
  jwks: process.env.AUTH0_JWKS,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
};
