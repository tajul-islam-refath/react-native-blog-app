import {StyleSheet, View} from 'react-native';
import React from 'react';

import AudioPlay from '../components/AudioPlay';
import AudioRecorderPlayerComponent from '../components/VoiceInput';

export default function Settings() {
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 20,
        }}>
        <AudioPlay />
        <AudioRecorderPlayerComponent />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
