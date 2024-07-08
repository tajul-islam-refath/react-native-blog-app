/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import 'react-native-gesture-handler';
import TrackPlayer from 'react-native-track-player';
import { PlaybackService } from './services/PlaybackService ';

TrackPlayer.registerPlaybackService(() => PlaybackService);


AppRegistry.registerComponent(appName, () => App);
