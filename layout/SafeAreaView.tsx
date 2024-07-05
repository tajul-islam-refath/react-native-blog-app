import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function SafeAreaView({children}: any) {
  return (
    <SafeAreaView style={styles.warpare}>
      <ScrollView keyboardShouldPersistTaps="handled">{children}</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  warpare: {
    paddingHorizontal: 10,
    paddingVertical: 30,
    height: '100%',
  },
});
