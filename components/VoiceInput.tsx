// AudioRecorderPlayer.js
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
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const audioRecorderPlayer = new AudioRecorderPlayer();

const AudioRecorderPlayerComponent = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState('');

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);

        console.log(granted);
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

    setIsRecording(true);
    audioRecorderPlayer.startRecorder();
  };

  const onStopRecord = async () => {
    setIsRecording(false);
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordedAudio(result);
    console.log(result);
  };

  const onStartPlay = async () => {
    setIsPlaying(true);
    const msg = await audioRecorderPlayer.startPlayer(recordedAudio);
    console.log(msg);
  };

  const onStopPlay = async () => {
    setIsPlaying(false);
    const msg = await audioRecorderPlayer.stopPlayer();
    console.log(msg);
  };

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={isRecording ? onStopRecord : onStartRecord}>
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
      {recordedAudio ? (
        <Button
          title={isPlaying ? 'Stop Playing' : 'Start Playing'}
          onPress={isPlaying ? onStopPlay : onStartPlay}
        />
      ) : null}
      {recordedAudio && <Text>Recorded Audio: {recordedAudio}</Text>}
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

export default AudioRecorderPlayerComponent;
