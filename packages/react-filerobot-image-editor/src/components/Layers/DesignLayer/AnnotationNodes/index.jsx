/** External Dependencies */
import React, { useMemo } from 'react';

/** Internal Dependencies */
import { useAnnotationEvents, useStore } from 'hooks';
import MemoizedAnnotation from './MemoizedAnnotation';

const AnnotationNodes = ({ mask }) => {
  const { annotations = {}, selectionsIds = [] } = useStore();
  const annotationEvents = useAnnotationEvents();

  const filterMask = (v) => {
    if (mask) {
      return !!v.mask;
    }
    return !v.mask;
  };

  return useMemo(
    () =>
      Object.values(annotations)
        .filter(filterMask)
        .map((annotation) => (
          <MemoizedAnnotation
            key={annotation.id}
            annotation={annotation}
            annotationEvents={annotationEvents}
            selectionsIds={selectionsIds}
          />
        )),
    [annotations, annotationEvents, selectionsIds],
  );
};

export default AnnotationNodes;
