import { CHANGE_GLOBAL_PROPS } from '../action-types';
import { createAction } from 'redux-actions';

// Action Creators

export const changeGlobalProps = createAction(
  CHANGE_GLOBAL_PROPS,
  (props) => props,
);
