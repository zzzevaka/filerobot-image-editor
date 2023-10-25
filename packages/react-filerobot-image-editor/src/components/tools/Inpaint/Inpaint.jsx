/** External Dependencies */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAnnotation, useStore, useTransformedImgData } from 'hooks';
import PropTypes from 'prop-types';
import Button from '@scaleflex/ui/core/button';

/** Internal Dependencies */
import AnnotationOptions from 'components/common/AnnotationOptions';
import { TOOLS_IDS } from 'utils/constants';
import getElemDocumentCoords from 'utils/getElemDocumentCoords';
import getPointerOffsetPositionBoundedToObject from 'utils/getPointerOffsetPositionBoundedToObject';
import randomId from 'utils/randomId';
import {
  HIDE_LOADER,
  SELECT_ANNOTATION,
  SET_ANNOTATION,
  SHOW_LOADER,
} from 'actions';
import { REPLACE_IMAGE } from 'actions/replaceImage';
import {
  StyledInpaintSliderField,
  StyledInpaintWrapper,
} from './Inpaint.styled';
import {
  INPAINT_POPPABLE_OPTIONS,
  inpaintOptionsPopupComponents,
} from './InpaintOptions/Inapint.constants';
import calculateMaskArea from './calculateMaskArea';

const eventsOptions = {
  passive: false,
};

const Inpaint = ({ t }) => {
  const { dispatch, designLayer, previewGroup, config } = useStore();
  const transformImgFn = useTransformedImgData();
  const [inpaint, saveInpaintDebounced, saveInpaintNoDebounce] = useAnnotation(
    {
      prompt: '',
      ...config.annotationsCommon,
      ...config[TOOLS_IDS.INPAINT],
      name: TOOLS_IDS.INPAINT,
    },
    false,
  );

  const canvasRef = useRef(null);
  const updatedPen = useRef({
    points: [],
    moved: false,
    id: '',
  });

  const getPointerPosition = useCallback(() => {
    const canvasBoundingRect = getElemDocumentCoords(canvasRef.current.content);
    const pos = getPointerOffsetPositionBoundedToObject(
      previewGroup,
      canvasBoundingRect,
    );

    return [
      pos.offsetX - (designLayer.attrs.xPadding || 0),
      pos.offsetY - (designLayer.attrs.yPadding || 0),
    ];
  }, [designLayer]);

  const handlePointerMove = useCallback(() => {
    if (!updatedPen.current.moved) {
      updatedPen.current = {
        moved: true,
        id: randomId(TOOLS_IDS.PEN),
        points: [...updatedPen.current.points, ...getPointerPosition()],
      };

      saveInpaintNoDebounce({
        id: updatedPen.current.id,
        name: TOOLS_IDS.PEN,
        points: updatedPen.current.points,
      });
    } else {
      updatedPen.current.points = updatedPen.current.points.concat(
        getPointerPosition(),
      );

      dispatch({
        type: SET_ANNOTATION,
        payload: {
          id: updatedPen.current.id,
          points: updatedPen.current.points,
          dismissHistory: true,
        },
      });
    }
  }, [getPointerPosition]);

  const handlePointerUp = useCallback(() => {
    if (
      updatedPen.current.id &&
      config[TOOLS_IDS.INPAINT].selectAnnotationAfterDrawing
    ) {
      dispatch({
        type: SELECT_ANNOTATION,
        payload: {
          annotationId: updatedPen.current.id,
        },
      });
    }

    updatedPen.current = null;
    canvasRef.current.off('mousemove touchmove', handlePointerMove);
    canvasRef.current.off('mouseleave touchcancel', handlePointerUp);
    document.removeEventListener('mouseup', handlePointerUp, eventsOptions);
    document.removeEventListener('touchend', handlePointerUp, eventsOptions);
    document.removeEventListener('mouseleave', handlePointerUp, eventsOptions);
    document.removeEventListener('touchcancel', handlePointerUp, eventsOptions);
  }, [handlePointerMove]);

  const handlePointerDown = useCallback(
    (e) => {
      if (e.target.attrs.draggable) {
        return;
      }
      e.evt.preventDefault();

      updatedPen.current = { points: getPointerPosition() };

      canvasRef.current.on('mousemove touchmove', handlePointerMove);
      canvasRef.current.on('mouseleave touchcancel', handlePointerUp);
      document.addEventListener('mouseup', handlePointerUp, eventsOptions);
      document.addEventListener('touchend', handlePointerUp, eventsOptions);
      document.addEventListener('mouseleave', handlePointerUp, eventsOptions);
      document.addEventListener('touchcancel', handlePointerUp, eventsOptions);
    },
    [getPointerPosition, handlePointerMove, handlePointerUp],
  );

  useEffect(() => {
    canvasRef.current = designLayer?.getStage();
    if (canvasRef.current) {
      canvasRef.current.on('mousedown touchstart', handlePointerDown);
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.off('mousedown touchstart', handlePointerDown);
      }
    };
  }, [designLayer]);

  const handleSubmit = () => {
    const img = transformImgFn({ mask: false });
    const msk = transformImgFn({ mask: true });

    dispatch({ type: SHOW_LOADER });

    window.msk = msk;

    config
      ?.onInpaint({
        image: img.imageData.imageBase64,
        mask: msk.imageData.imageBase64,
        maskArea: calculateMaskArea(msk.designState),
        prompt: inpaint.prompt,
      })
      .then((newImageUrl) => {
        const imageElement = new Image();
        imageElement.src = newImageUrl;
        imageElement.onload = () => {
          dispatch({
            type: REPLACE_IMAGE,
            payload: {
              originalImage: imageElement,
            },
          });
        };
      })
      .then(() => dispatch({ type: HIDE_LOADER }));
  };

  return (
    <StyledInpaintWrapper className="FIE_inpaint-tool-options-wrapper">
      <StyledInpaintSliderField>
        <AnnotationOptions
          className="FIE_inpaint-tool-options"
          annotation={inpaint}
          updateAnnotation={saveInpaintDebounced}
          moreOptionsPopupComponentsObj={inpaintOptionsPopupComponents}
          morePoppableOptionsPrepended={INPAINT_POPPABLE_OPTIONS}
          t={t}
          hidePositionField
          hideFillOption
          hideOpacityOption
          hideShadowOption
          hideStrokeColorInput
        />
      </StyledInpaintSliderField>
      <Button
        className="FIE_inpaint-submit-button"
        size="sm"
        onClick={handleSubmit}
        disabled={!inpaint.prompt}
        title={t('create')}
      >
        {t('create')}
      </Button>
    </StyledInpaintWrapper>
  );
};

Inpaint.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Inpaint;
