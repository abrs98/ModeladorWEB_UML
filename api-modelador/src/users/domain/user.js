const t = require('tcomb');
const { compose } = require('ramda');
const { cleanData } = require('../../shared/domain');

const User = t.struct(
  {
    id: t.maybe(t.String),
    name: t.String,
    email: t.String,
    diagrams: t.maybe(t.Array),
    tdiagrams: t.maybe(t.Array),
    projects: t.maybe(t.Array),
    createdAt: t.maybe(t.Date),
    updatedAt: t.maybe(t.Date),
  },
  {
    name: 'User',
    strict: false,
    defaultProps: {
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  }
);

module.exports = compose(cleanData, User);
