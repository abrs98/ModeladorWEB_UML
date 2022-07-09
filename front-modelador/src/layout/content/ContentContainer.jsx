import React from 'react';

import { usePanel } from '@providers';
import { Content } from '@layout/layouts';
import { ErrorBoundary, Panel } from '@layout/common/components';
import { Canvas, Diagrams, Projects, TDiagrams } from '@layout/content/components';
import { ItemOverlap } from '@layout/canvas/components';
import { WindowProperties } from '@layout/debug/components';
import {
  MAIN_PANEL_INDEX,
  PROJECTS_PANEL_INDEX,
  TEMPLATES_PANEL_INDEX,
  DIAGRAMS_PANEL_INDEX,
} from '@constants';

const ContentContainer = () => {
  const { indexPanel } = usePanel();

  return (
    <ErrorBoundary>
      <Content>
        <Panel value={indexPanel} index={MAIN_PANEL_INDEX}>
          { process.env.NODE_ENV === 'development' && <WindowProperties /> }
          <Canvas />
          <ItemOverlap />
        </Panel>
        <Panel value={indexPanel} index={PROJECTS_PANEL_INDEX}>
          <Projects />
        </Panel>
        <Panel value={indexPanel} index={TEMPLATES_PANEL_INDEX}>
          <TDiagrams />
        </Panel>
        <Panel value={indexPanel} index={DIAGRAMS_PANEL_INDEX}>
          <Diagrams />
        </Panel>
      </Content>
    </ErrorBoundary>
  );
};

ContentContainer.propTypes = {};
ContentContainer.defaultProps = {};

export default ContentContainer;
