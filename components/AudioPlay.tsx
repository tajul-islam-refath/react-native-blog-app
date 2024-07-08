import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TrackPlayer, {Event, State} from 'react-native-track-player';
import {setUpPlayer} from '../services/PlaybackService ';

export default function AudioPlay() {
  const [play, setPlay] = useState(false);
  const start = async () => {
    setPlay(true);
    await setUpPlayer();

    const currentState = await TrackPlayer.getPlaybackState();

    if (currentState.state !== State.None) {
      await TrackPlayer.reset();
    }

    // Add a track to the queue
    await TrackPlayer.add({
      id: 'trackId',
      url: require('../assets/audio/audo.mp3'),
      title: 'Track Title',
      artist: 'Track Artist',
    });

    // Start playing it
    TrackPlayer.play();

    TrackPlayer.addEventListener(Event.PlaybackQueueEnded, async event => {
      if (event.position > 0) {
        setPlay(false);
        Alert.alert('Playback Finished', 'The audio has finished playing.');
      }
    });
  };
  return (
    <TouchableOpacity onPress={start}>
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
      <Text>{play ? 'Playing..' : 'Not Playing'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
