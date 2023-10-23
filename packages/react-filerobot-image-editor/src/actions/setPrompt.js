export const SET_PROMPT = 'SET_PROMPT';

const setPrompt = (state, payload) => {
  const prevPromps = state.prompts || {};

  return {
    ...state,
    prompts: {
      ...prevPromps,
      [payload.tabId]: payload.prompt || '',
    },
  }
};

export default setPrompt;