import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

import TrackPlayer, {Event, State} from 'react-native-track-player';
import {setUpPlayer} from '../services/PlaybackService ';
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
