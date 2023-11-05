/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import Crop from '@scaleflex/icons/crop';
import Brush from '@scaleflex/icons/brush';

/** Internal Dependencies */
import { SWITCH_DRAGGABLE } from 'actions';
import { useStore } from 'hooks';
import { StyledDraggableButton } from './Topbar.styled';

const DraggableButton = ({ margin }) => {
  const { dispatch, draggable, t } = useStore();

  const handleClick = () => dispatch({ type: SWITCH_DRAGGABLE });

  return (
    <StyledDraggableButton
      className="FIE_topbar-draggable-button"
      color="link"
      onClick={handleClick}
      title={t('draggableTitle')}
      margin={margin}
    >
      {draggable ? <Crop size="100%" /> : <Brush size="100%" />}
    </StyledDraggableButton>
  );
};

DraggableButton.defaultProps = {
  margin: undefined,
};

DraggableButton.propTypes = {
  margin: PropTypes.string,
};

export default DraggableButton;