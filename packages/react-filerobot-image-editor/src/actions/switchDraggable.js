export const SWITCH_DRAGGABLE = 'SWITCH_DRAGGABLE';

const switchDraggable = (state) => ({
  ...state,
  draggable: !state.draggable,
});

export default switchDraggable;
