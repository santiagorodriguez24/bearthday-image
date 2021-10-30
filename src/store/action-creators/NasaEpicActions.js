import { createAction } from 'redux-actions';

import {
  CHANGE_NASA_EPIC_PROPS,
  GET_NASA_EPIC_AVAILABLE_DATES,
  GET_NASA_EPIC_IMAGES_DATA_BY_DATE,
} from 'store/action-types';
import { apiGet } from 'api-interface/Api';
import { url_nasa_epic_api } from 'api-interface/urls';

const urlApiNaturalColor = `${url_nasa_epic_api}/api/natural`;

export const changeNasaProps = createAction(
  CHANGE_NASA_EPIC_PROPS,
  (props) => props,
);

export const getAvailableDates = createAction(
  GET_NASA_EPIC_AVAILABLE_DATES,
  () => apiGet(`${urlApiNaturalColor}/available`),
);

export const getDataByDate = createAction(
  GET_NASA_EPIC_IMAGES_DATA_BY_DATE,
  (date) => apiGet(`${urlApiNaturalColor}/date/${date}`),
);
