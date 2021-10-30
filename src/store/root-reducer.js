import { combineReducers } from 'redux';
import { nasaEpic } from './reducers/NasaEpicReducer';
import global from './reducers/GlobalReducer';

export default combineReducers({
  global,
  nasaEpic,
});
