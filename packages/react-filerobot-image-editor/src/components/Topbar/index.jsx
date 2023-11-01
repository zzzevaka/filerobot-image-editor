/** External Dependencies */
import React from 'react';

/** Internal Dependencies */
import Separator from 'components/common/Separator';
import { useStore } from 'hooks';
import { TABS_IDS } from 'utils/constants';
import CloseButton from './CloseButton';
import SaveButton from './SaveButton';
import ResetButton from './ResetButton';
import UndoButton from './UndoButton';
import RedoButton from './RedoButton';
import SwithDraggableButton from './SwithDraggableButton';
import ImageDimensionsAndDisplayToggle from './ImageDimensionsAndDisplayToggle';
import CanvasZooming from './CanvasZooming';
import {
  StyledTopbar,
  StyledFlexCenterAlignedContainer,
  StyledHistoryButtonsWrapper,
} from './Topbar.styled';
import BackButton from './BackButton';

const Topbar = () => {
  const {
    config: {
      showResetButton,
      showBackButton,
      showDimensionsTogge,
      disableZooming,
    },
    tabId,
  } = useStore();

  return (
    <StyledTopbar reverseDirection={showBackButton} className="FIE_topbar">
      <StyledFlexCenterAlignedContainer
        reverseDirection={showBackButton}
        className="FIE_topbar-buttons-wrapper"
      >
        <SaveButton />
        <StyledHistoryButtonsWrapper className="FIE_topbar-history-buttons">
          {showResetButton && <ResetButton margin="0" />}
          <UndoButton margin="0" />
          <RedoButton margin="0" />
        </StyledHistoryButtonsWrapper>
      </StyledFlexCenterAlignedContainer>
      <StyledFlexCenterAlignedContainer className="FIE_topbar-center-options">
        {showDimensionsTogge && (
          <>
            <ImageDimensionsAndDisplayToggle />
            <Separator />
          </>
        )}
        {!disableZooming && (
          <>
            {(tabId === TABS_IDS.INPAINT ||
              tabId === TABS_IDS.ANNOTATE ||
              tabId === TABS_IDS.WATERMARK) && <SwithDraggableButton />}
            <CanvasZooming />
          </>
        )}
      </StyledFlexCenterAlignedContainer>
      {showBackButton ? <BackButton /> : <CloseButton />}
    </StyledTopbar>
  );
};
export default Topbar;
