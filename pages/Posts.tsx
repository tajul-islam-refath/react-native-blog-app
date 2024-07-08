import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {Image} from '@rneui/base';
import {firestorCollectionsGet} from '../services/firebaseFireStore';
import {postsAction} from '../redux/postSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'Posts'>;

export default function Posts({navigation}: Props) {
  const posts = useSelector((state: RootState) => state.post.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllPosts = async () => {
      const querySnapshot = await firestorCollectionsGet('posts');
      const fetchedPosts = querySnapshot.docs.map(doc => ({
        postId: doc.id,
        ...doc.data(),
      }));
      console.log(fetchedPosts);
      dispatch(postsAction(fetchedPosts));
    };

    getAllPosts();
  }, []);

  return (
    <SafeAreaView style={styles.warpare}>
      <ScrollView >
        {posts.map((post: any, i: number) => (
          <View key={i} style={styles.postCard}>
            {post?.image && (
              <Image
                source={{
                  uri: post.image,
                }}
                style={{width: '100%', height: 200, borderRadius: 4}}
              />
            )}
            <Text
              style={{
                textDecorationStyle: 'dashed',
                textDecorationLine: 'underline',
                fontSize: 18,
                fontWeight: 'bold',
                marginVertical: 6,
                color: '#000',
              }}
              onPress={() =>
                navigation.navigate('Details', {
                  id: post.postId,
                  title: post.title,
                })
              }>
              {post.title}
            </Text>
            <Text
              style={{
                textDecorationStyle: 'dashed',
                textDecorationLine: 'underline',
              }}>
              Author :- {post.author}
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
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
  postCard: {
    
    padding: 10,
    borderRadius: 4,
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#fff',
    shadowColor: 'gray',
    shadowOffset: {
      width: 10,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
});
