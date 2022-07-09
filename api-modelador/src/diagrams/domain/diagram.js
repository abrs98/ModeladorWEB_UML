const t = require('tcomb');
const { compose } = require('ramda');
const { cleanData } = require('../../shared/domain');

const Diagram = t.struct(
  {
    id: t.maybe(t.String),
    userEmail: t.maybe(t.String),
    projectId: t.maybe(t.String),
    name: t.String,
    items: t.String,
    // projects: t.maybe(t.Array),
    createdAt: t.maybe(t.Date),
    updatedAt: t.maybe(t.Date),
  },
  {
    name: 'Diagram',
    strict: false,
    defaultProps: {
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  }
);

Diagram.prototype.jsonifyItems = function () {
  return JSON.parse(this.items);
};

module.exports = compose(cleanData, Diagram);
