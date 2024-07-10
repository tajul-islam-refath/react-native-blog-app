import React, {useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Text,
  Alert,
  Linking,
} from 'react-native';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AVModeIOSOption,
} from 'react-native-audio-recorder-player';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import RNFS from 'react-native-fs';
import {setUpPlayer} from '../services/PlaybackService ';
import TrackPlayer, {Event, State} from 'react-native-track-player';
import {uploadToFirebase} from '../services/firebaseStorage';

const audioRecorderPlayer = new AudioRecorderPlayer();
const dirs = ReactNativeBlobUtil.fs.dirs;

const VoiceRecord = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState('');
  const [filePath, setFilePath] = useState('');
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState('');

  audioRecorderPlayer.setSubscriptionDuration(0.1);

  const path = Platform.select({
    ios: `file://${RNFS.CachesDirectoryPath}/hello.m4a`,
    android: `${dirs.CacheDir}/hello.mp3`,
  });

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        if (
          granted['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Permissions granted');
          return true;
        } else {
          handlePermissionDenied(granted);
          console.log('All required permissions not granted');
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const handlePermissionDenied = (granted: any) => {
    const deniedPermissions = Object.keys(granted).filter(
      key =>
        granted[key] === PermissionsAndroid.RESULTS.DENIED ||
        granted[key] === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN,
    );

    console.log(deniedPermissions);

    if (
      deniedPermissions.includes(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ) ||
      deniedPermissions.includes(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      )
    ) {
      Alert.alert(
        'Permissions Required',
        'This app needs storage permissions to save and access audio files. Please go to the app settings and enable the required permissions.',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Open Settings', onPress: () => Linking.openSettings()},
        ],
      );
    }
  };

  const onStartRecord = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      console.warn('Permissions not granted');
      return;
    }

    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVModeIOS: AVModeIOSOption.measurement,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    const uri = await audioRecorderPlayer.startRecorder(path, audioSet);

    audioRecorderPlayer.addRecordBackListener(e => {
      setRecordSecs(e.currentPosition);
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      console.log('Recording...', e);
      return;
    });
    setFilePath(uri);
    console.log(`Recording started at: ${uri}`);
    setIsRecording(true);
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setIsRecording(false);
    setFilePath(result);
    console.log(`Recording stopped at: ${result}`);
    setFilePath(result);
  };

  const start = async () => {
    setIsPlaying(true);
    await setUpPlayer();

    const currentState = await TrackPlayer.getPlaybackState();

    if (currentState.state !== State.None) {
      await TrackPlayer.reset();
    }

    let newPath = await uploadToFirebase(filePath);
    if (newPath) {
      await TrackPlayer.add({
        id: 'trackId',
        url: newPath,
        title: 'Track Title',
        artist: 'Track Artist',
      });

      TrackPlayer.seekTo(12.5);
      TrackPlayer.setVolume(1);
      // Start playing it
      TrackPlayer.play();

      TrackPlayer.addEventListener(Event.PlaybackQueueEnded, async event => {
        if (event.position > 0) {
          setIsPlaying(false);
          await TrackPlayer.reset();
          Alert.alert('Playback Finished', 'The audio has finished playing.');
        }
      });
    }

    // Add a track to the queue
  };

  const onStartPlay = async () => {
    setIsPlaying(true);
    console.log(`onStartPlay at: ${filePath}`);
    let newPath = await uploadToFirebase(filePath);
    if (newPath) {
      const msg = await audioRecorderPlayer.startPlayer(newPath);
      const volume = await audioRecorderPlayer.setVolume(1.0);
      console.log(`path: ${msg}`, `volume: ${volume}`);

      audioRecorderPlayer.addPlayBackListener(e => {
        console.log('audio playing -- ', e);
        return;
      });
    }
  };

  const onStopPlay = async () => {
    setIsPlaying(false);
    const msg = await audioRecorderPlayer.stopPlayer();
    console.log(msg);
  };

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}>
        <TouchableOpacity onPress={onStartRecord}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FontAwesome
              name="microphone"
              style={{
                fontSize: 18,
                color: '#fff',
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onStopRecord}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FontAwesome
              name="stop"
              style={{
                fontSize: 18,
                color: '#fff',
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onStartPlay}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FontAwesome
              name="play"
              style={{
                fontSize: 18,
                color: '#fff',
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onStopPlay}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FontAwesome
              name="pause"
              style={{
                fontSize: 18,
                color: '#fff',
              }}
            />
          </View>
        </TouchableOpacity>
      </View>

      {recordTime && <Text>Recorded Audio: {recordTime}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VoiceRecord;
