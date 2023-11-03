/** External Dependencies */
import Text from '@scaleflex/icons/text';
import Stroke from "@scaleflex/icons/stroke";

/** Internal Dependencies */
import { POPPABLE_OPTIONS } from 'components/common/AnnotationOptions/AnnotationOptions.constants';
import PromptField from './PromptField';

export const PROMPT = 'prompt';

export const INPAINT_POPPABLE_OPTIONS = [
  {
    titleKey: 'prompt',
    label: 'Prompt',
    name: PROMPT,
    Icon: Text,
  },
  {
    titleKey: 'stroke',
    label: 'Stroke Width',
    name: POPPABLE_OPTIONS.STROKE,
    Icon: Stroke,
  },
];

export const inpaintOptionsPopupComponents = {
  [PROMPT]: PromptField,
};
