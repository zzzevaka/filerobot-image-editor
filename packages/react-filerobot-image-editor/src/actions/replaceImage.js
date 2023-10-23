import getInitialAppState from 'context/getInitialAppState';
import defaultConfig from 'context/defaultConfig';

export const REPLACE_IMAGE = 'REPLACE_IMAGE';

const replaceImage = (state, payload) => {
  const initialAppState = getInitialAppState(defaultConfig);

  return {
    ...state,
    originalImage: payload.originalImage,
    imgSrc: payload.originalImage.src,
    isDesignState: !payload.dismissHistory,
    finetunes: initialAppState.finetunes,
    finetunesProps: initialAppState.finetunesProps,
    adjustments: initialAppState.adjustments,
    filter: initialAppState.filter,
    annotations: initialAppState.annotations,
    resize: initialAppState.resize,
    shownImageDimensions: initialAppState.shownImageDimensions,
    canvasScale: initialAppState.canvasScale,
    zoom: initialAppState.zoom,
    selectionsIds: initialAppState.selectionsIds,
  };
};

export default replaceImage;
