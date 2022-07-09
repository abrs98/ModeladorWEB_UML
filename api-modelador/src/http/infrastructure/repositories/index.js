const DiagramRepository = require('../../../diagrams/infrastructure/repository');
const TDiagramRepository = require('../../../tdiagrams/infrastructure/repository');
const UserRepository = require('../../../users/infrastructure/repository');
const ProjectRepository = require('../../../projects/infrastructure/repository');

module.exports = ({ database }) => {
  const diagramModel = database.models.get('diagrams');
  const tdiagramModel = database.models.get('tdiagrams');
  const userModel = database.models.get('users');
  const projectModel = database.models.get('projects');

  return {
    diagramRepository: new DiagramRepository({ model: diagramModel }),
    tdiagramRepository: new TDiagramRepository({ model: tdiagramModel }),
    userRepository: new UserRepository({ model: userModel }),
    projectRepository: new ProjectRepository({ model: projectModel }),
  };
};
