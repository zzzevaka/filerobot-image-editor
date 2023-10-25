const calculateMaskArea = (designState) => {
  const {
    annotations,
    shownImageDimensions: { width, height },
  } = designState;

  let hasMask = false;
  let point1Width = width;
  let point1Height = height;
  let point2Width = 0;
  let point2Height = 0;

  Object.values(annotations).forEach((annotation) => {
    if (!annotation.mask) {
      return;
    }

    hasMask = true;

    const strokeRadius = annotation.strokeWidth / 2;
    let isX = true;

    Object.values(annotation.points).forEach((point) => {
      if (isX) {
        point1Width = Math.min(point - strokeRadius, point1Width);
        point2Width = Math.max(point + strokeRadius, point2Width);
      } else {
        point1Height = Math.min(point - strokeRadius, point1Height);
        point2Height = Math.max(point + strokeRadius, point2Height);
      }
      isX = !isX;
    });

    point1Width = Math.round((Math.max(0, point1Width) / width) * 100);
    point1Height = Math.round((Math.max(0, point1Height) / height) * 100);
    point2Width = Math.round((Math.min(width, point2Width) / width) * 100);
    point2Height = Math.round((Math.min(height, point2Height) / height) * 100);
  });

  if (!hasMask) {
    return;
  }

  // eslint-disable-next-line consistent-return
  return [
    [point1Width, point1Height],
    [point2Width, point2Height],
  ];
};

export default calculateMaskArea;
