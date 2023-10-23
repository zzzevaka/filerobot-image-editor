/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Annotation as PenIcon } from '@scaleflex/icons/annotation';
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

const PromptButton = ({ selectTool, isSelected, t }) => (
  <ToolsBarItemButton
    className="FIE_prompt-tool-button"
    id={TOOLS_IDS.PROMPT}
    label={t('promptTool')}
    Icon={PenIcon}
    onClick={selectTool}
    isSelected={isSelected}
  />
);

PromptButton.defaultProps = {
  isSelected: false,
};

PromptButton.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

export default PromptButton;
