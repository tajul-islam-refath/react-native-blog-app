import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SeparatorWithText: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.separator} />
      <Text style={styles.text}>OR</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: '#000',
  },
  text: {
    position: 'absolute',
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    color: '#000',
    top: 0,
    alignSelf: 'center',
    transform: [{translateY: -10}],
  },
});

export default SeparatorWithText;
