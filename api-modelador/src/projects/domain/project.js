const t = require('tcomb');
const { compose } = require('ramda');
const { cleanData } = require('../../shared/domain');

const Project = t.struct(
  {
    id: t.maybe(t.String),
    name: t.String,
    team: t.maybe(t.Array),
    diagrams: t.maybe(t.Array),
    // creator: t.String,
    createdAt: t.maybe(t.Date),
    updatedAt: t.maybe(t.Date),
  },
  {
    name: 'Project',
    strict: false,
    defaultProps: {
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  }
);

module.exports = compose(cleanData, Project);
