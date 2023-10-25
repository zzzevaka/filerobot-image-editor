/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import Label from '@scaleflex/ui/core/label';

/** Internal Dependencies */
import restrictNumber from 'utils/restrictNumber';
import ColorInput from 'components/common/ColorInput';
import { StyledSpacedOptionFields } from './AnnotationOptions.styled';
import Slider from '../Slider';

const MIN_PERCENTANGE = 0;
const MAX_PERCENTANGE = 100;

const StrokeFields = ({ annotation, updateAnnotation, t, hideStrokeColorInput }) => {
  const { stroke, strokeWidth } = annotation;

  const changeStrokeWidth = (newStrokeWidth) => {
    updateAnnotation({
      strokeWidth: restrictNumber(
        newStrokeWidth,
        MIN_PERCENTANGE,
        MAX_PERCENTANGE,
      ),
    });
  };

  const changeStrokeColor = (newStrokeColor) => {
    updateAnnotation({ stroke: newStrokeColor });
  };

  return (
    <StyledSpacedOptionFields>
      <Label>{t('stroke')}</Label>
      <Slider
        annotation="px"
        onChange={changeStrokeWidth}
        value={strokeWidth}
      />
      {!hideStrokeColorInput ? (
        <ColorInput
          color={stroke}
          onChange={changeStrokeColor}
          colorFor="stroke"
        />
      ) : null}
    </StyledSpacedOptionFields>
  );
};

StrokeFields.defaultProps = {
  hideStrokeColorInput: false,
};

StrokeFields.propTypes = {
  annotation: PropTypes.instanceOf(Object).isRequired,
  updateAnnotation: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  hideStrokeColorInput: PropTypes.bool,
};

export default StrokeFields;
