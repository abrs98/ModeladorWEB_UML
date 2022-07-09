/* eslint-disable indent */
import React from 'react';
import { default as PropTypes } from 'prop-types';

import { ELEMENT } from '@layout/canvas/lib';

import { default as Control } from '@layout/canvas/components/Control';
import { default as Boundary } from '@layout/canvas/components/Boundary';
import { default as Entity } from '@layout/canvas/components/Entity';
import { default as Actor } from '@layout/canvas/components/Actor';

const SvgBuilder = ({ type, position }) => {
  const renderComponent = () => {
    switch (type) {
      case ELEMENT.CONTROL:
        return <Control position={position} />;
      case ELEMENT.BOUNDARY:
        return <Boundary position={position} />;
      case ELEMENT.ENTITY:
        return <Entity position={position} />;
      case ELEMENT.ACTOR:
        return <Actor position={position} />;
      default:
        return <></>;
    }
  };

  return <>{renderComponent()}</>;
};

SvgBuilder.propTypes = {
  type: PropTypes.string.isRequired,
  position: PropTypes.object.isRequired,
};
SvgBuilder.defaultProps = {};

export default SvgBuilder;
