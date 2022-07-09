module.exports = function createControllerRoutes(controllerUri) {
  const controllerMap = new Map([
    ['index', require('../../http/interface/modules')()],
    ['diagram', require('../../diagrams/interface/module')()],
    ['tdiagram', require('../../tdiagrams/interface/module')()],
    ['user', require('../../users/interface/module')()],
    ['project', require('../../projects/interface/module')()],
  ]);
  const controller = controllerMap.get(controllerUri);

  return controller;
};
