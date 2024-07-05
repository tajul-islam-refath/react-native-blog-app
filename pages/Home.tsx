import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {Image} from '@rneui/base';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({navigation}: Props) {
  const posts = useSelector((state: RootState) => state.post.posts);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.warpare}>
      <ScrollView>
        {posts.map((post: any, i: number) => (
          <View key={i} style={styles.postCard}>
            <Image
              source={{
                uri: post.img,
              }}
              style={{width: '100%', height: 200, borderRadius: 4}}
            />
            <Text
              style={{
                textDecorationStyle: 'dashed',
                textDecorationLine: 'underline',
              }}
              onPress={() =>
                navigation.navigate('Details', {id: post.id, title: post.title})
              }>
              {post.title}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  warpare: {
    paddingHorizontal: 10,

    backgroundColor: '#fff',
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  postCard: {
    padding: 10,
    borderRadius: 4,
    width: '100%',
    marginVertical: 10,
    // backgroundColor: '#000',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
    elevation: 1,
  },
});
