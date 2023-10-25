/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import Label from '@scaleflex/ui/core/label';

/** InternalDependencies */
import { StyledSpacedOptionFields } from 'components/common/AnnotationOptions/AnnotationOptions.styled';
import { StyledPromptTextarea } from './Propmt.styled';

const PromptField = ({ annotation, updateAnnotation, t }) => {
  return (
    <StyledSpacedOptionFields className="FIE_prompt-tool-options-wrapper">
      <Label>{t('prompt')}</Label>
      <StyledPromptTextarea
        value={annotation.prompt}
        onChange={(e) => updateAnnotation({ prompt: e.target.value })}
        multiline
      />
    </StyledSpacedOptionFields>
  );
};

PromptField.propTypes = {
  annotation: PropTypes.instanceOf(Object).isRequired,
  updateAnnotation: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default PromptField;
