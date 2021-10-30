import { handleActions } from 'redux-actions';
import {
  CHANGE_NASA_EPIC_PROPS,
  GET_NASA_EPIC_AVAILABLE_DATES,
  GET_NASA_EPIC_IMAGES_DATA_BY_DATE,
} from 'store/action-types';

const initialState = {
  availableDates: [],
  error: '',
  imagesByDateData: [],
  userBirthDay: '',
  imagesDate: '',
};

function updateState(state, newProps) {
  let newState = Object.assign({}, state, newProps);
  return newState;
}

export const nasaEpic = handleActions(
  {
    [CHANGE_NASA_EPIC_PROPS]: (state, action) => {
      let newState = updateState(state, action.payload);
      return newState;
    },

    [GET_NASA_EPIC_AVAILABLE_DATES]: (state, action) => {
      if (action.error) {
        const newState = updateState(state, {
          error: action.payload.error,
        });

        return newState;
      }

      const availableDates = action.payload;

      const newState = updateState(state, {
        availableDates,
        error: '',
      });

      return newState;
    },

    [GET_NASA_EPIC_IMAGES_DATA_BY_DATE]: (state, action) => {
      if (action.error) {
        const newState = updateState(state, {
          error: action.payload.error,
        });

        return newState;
      }

      const imagesByDateData = action.payload;

      const newState = updateState(state, {
        imagesByDateData,
        error: '',
      });

      return newState;
    },
  },
  initialState,
);
