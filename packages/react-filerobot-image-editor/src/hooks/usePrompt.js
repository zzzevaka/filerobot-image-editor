/** External Dependencies */
import { useCallback, useEffect, useMemo } from 'react';

/** Internal Dependencies */
import { SET_PROMPT } from 'actions';
import useStore from './useStore';

const usePrompt = (initValue = '') => {
  const { tabId, dispatch, prompts } = useStore();

  const prompt = prompts?.[tabId] || initValue;

  const setPrompt = useCallback((newValue) => {
    dispatch({
      type: SET_PROMPT,
      payload: { tabId, prompt: newValue },
    });
  });

  return useMemo(() => [prompt, setPrompt], [prompt]);
};

export default usePrompt;