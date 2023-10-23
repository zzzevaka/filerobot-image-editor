/** External Depdencies */
import React from 'react';

import Textarea from '@scaleflex/ui/core/textarea';

import usePrompt from 'hooks/usePrompt';
import { REPLACE_IMAGE } from 'actions/replaceImage';
import { useStore, useTransformedImgData } from 'hooks';
import { SHOW_LOADER } from 'actions/showLoader';
import { HIDE_LOADER } from 'actions/hideLoader';


const PromptOptions = () => {
  const state = useStore();
  const transformImgFn = useTransformedImgData();
  const [prompt, setPrompt] = usePrompt('');

  const handleSubmit = () => {
    const img = transformImgFn({ mask: false });
    const msk = transformImgFn({ mask: true });

    state.dispatch({ type: SHOW_LOADER });

    state
      ?.handleInpaint({
        image: img.imageData.imageBase64,
        mask: msk.imageData.imageBase64,
        prompt,
      })
      .then((newImageUrl) => {
        const imageElement = new Image();
        imageElement.src = newImageUrl;
        imageElement.onload = () => {
          state.dispatch({
            type: REPLACE_IMAGE,
            payload: {
              originalImage: imageElement,
            },
          });
        };
      })
      .then(() => state.dispatch({ type: HIDE_LOADER }));
  };

  return (
    <div>
      <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      <button onClick={handleSubmit}>Go</button>
    </div>
  );
}

export default PromptOptions;