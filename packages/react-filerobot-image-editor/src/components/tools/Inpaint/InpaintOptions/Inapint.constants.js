/** External Dependencies */
import Text from '@scaleflex/icons/text';

/** Internal Dependencies */
import PromptField from './PromptField';

export const PROMPT = 'prompt';

export const INPAINT_POPPABLE_OPTIONS = [
  {
    titleKey: 'prompt',
    name: PROMPT,
    Icon: Text,
  },
];

export const inpaintOptionsPopupComponents = {
  [PROMPT]: PromptField,
};