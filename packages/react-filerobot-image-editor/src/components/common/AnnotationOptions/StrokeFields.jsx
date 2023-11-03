/** External Dependencies */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Label from '@scaleflex/ui/core/label';

/** Internal Dependencies */
import restrictNumber from 'utils/restrictNumber';
import ColorInput from 'components/common/ColorInput';
import { StyledSpacedOptionFields } from './AnnotationOptions.styled';
import Slider from '../Slider';

const MIN_PERCENTANGE = 0;
const MAX_PERCENTANGE = 100;

const StrokeFields = ({
  annotation,
  updateAnnotation,
  t,
  hideStrokeColorInput,
}) => {
  const [strokeWidth, setStrokeWidth] = useState(annotation.strokeWidth);

  const changeStrokeWidth = (newStrokeWidth) => {
    const newValue = restrictNumber(
      newStrokeWidth,
      MIN_PERCENTANGE,
      MAX_PERCENTANGE,
    );

    setStrokeWidth(newValue);
    updateAnnotation({ strokeWidth: newValue });
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
          color={annotation.stroke}
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
