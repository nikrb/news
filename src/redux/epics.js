import 'rxjs';
import { combineEpics } from 'redux-observable';

import searchEpic from '../components/search/redux/searchEpic';
import { retryTrackViewEpic, trackViewsEpic } from './track-views-epic';
import viewStorageEpic from './view-storage-epic';

const rootEpic = combineEpics(
  // diable view tracking until we deploy this
  // retryTrackViewEpic,
  // trackViewsEpic,
  searchEpic,
  viewStorageEpic
);

export default rootEpic;
