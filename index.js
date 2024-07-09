/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import 'react-native-gesture-handler';
import TrackPlayer from 'react-native-track-player';
import {PlaybackService} from './services/PlaybackService ';
import {Provider} from 'react-redux';
import {store} from './redux/store';

TrackPlayer.registerPlaybackService(() => PlaybackService);

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
