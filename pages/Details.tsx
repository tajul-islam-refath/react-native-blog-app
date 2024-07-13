import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {useDispatch, useSelector} from 'react-redux';
import {Image} from '@rneui/base';
import {firestorGet} from '../services/firebaseFireStore';
import {signlePostAction} from '../redux/postSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function Details({route}: Props) {
  const id = route.params.id;
  const post = useSelector((state: any) => state.post.singlePost);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPost = async () => {
      let snapshot: any = await firestorGet('posts', id);
      if (snapshot.exists) {
        dispatch(signlePostAction(snapshot.data()));
      }
    };

    getPost();

    return () => {
      dispatch(signlePostAction(null));
    };
  }, [id]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.postCard}>
        {post?.image && (
          <Image
            source={{
              uri: post?.image,
            }}
            style={{
              width: '100%',
              height: 200,
              borderRadius: 4,
              objectFit: 'cover',
            }}
          />
        )}
        <Text
          style={{
            textDecorationStyle: 'dashed',
            textDecorationLine: 'underline',
            marginVertical: 6,
            fontSize: 18,
            fontWeight: 'bold',
            color: '#000',
          }}>
          {post?.title}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 400,
            color: '#000',
          }}>
          {post?.body}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    height: '100%',
  },
  postCard: {
    padding: 10,
    borderRadius: 4,
    width: '100%',
    marginVertical: 10,
  },
});
