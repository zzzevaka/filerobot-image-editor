/** External Dependencies */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Label from '@scaleflex/ui/core/label';

/** InternalDependencies */
import { StyledSpacedOptionFields } from 'components/common/AnnotationOptions/AnnotationOptions.styled';
import { StyledPromptTextarea } from './Propmt.styled';

const PromptField = ({ annotation, updateAnnotation, t }) => {
  const [prompt, setPrompt] = useState(annotation.prompt);

  // Straitforward update of annotations leads to bug. Workarounded. Need investigate
  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
    updateAnnotation({ prompt: e.target.value });
  };

  return (
    <StyledSpacedOptionFields className="FIE_prompt-tool-options-wrapper">
      <Label>{t('prompt')}</Label>
      <StyledPromptTextarea value={prompt} onChange={handlePromptChange} />
    </StyledSpacedOptionFields>
  );
};

PromptField.propTypes = {
  annotation: PropTypes.instanceOf(Object).isRequired,
  updateAnnotation: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default PromptField;
