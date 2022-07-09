const t = require('tcomb');
const { compose } = require('ramda');
const { cleanData } = require('../../shared/domain');

const TDiagram = t.struct(
  {
    id: t.maybe(t.String),
    userEmail: t.String,
    name: t.String,
    items: t.String,
    createdAt: t.maybe(t.Date),
    updatedAt: t.maybe(t.Date),
  },
  {
    name: 'TDiagram',
    strict: false,
    defaultProps: {
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  }
);

TDiagram.prototype.jsonifyItems = function () {
  return JSON.parse(this.items);
};

module.exports = compose(cleanData, TDiagram);
