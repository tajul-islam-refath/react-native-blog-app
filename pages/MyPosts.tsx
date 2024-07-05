import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {firestorGetAllByCondation} from '../services/firebaseFireStore';

export default function MyPosts({navigation}: any) {
  const [posts, setPosts] = useState<any>([]);
  const user = useSelector((state: any) => state?.auth?.user);

  useEffect(() => {
    const getAllPosts = async () => {
      const querySnapshot = await firestorGetAllByCondation(
        'posts',
        'id',
        user.uid,
      );
      const fetchedPosts = querySnapshot.docs.map(doc => ({
        postId: doc.id,
        ...doc.data(),
      }));

      setPosts(fetchedPosts);
    };

    getAllPosts();
  }, []);

  const RenderItem = ({item}: any) => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        gap: 6,
        marginVertical: 10,
      }}>
      <View>
        {item.image && (
          <Image
            style={{width: 80, height: 50, borderRadius: 8}}
            source={{
              uri: item.image,
            }}
          />
        )}
      </View>
      <View>
        <Text
          style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}
          onPress={() =>
            navigation.navigate('Details', {id: item.postId, title: item.title})
          }>
          {item.title}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.warpare}>
      <FlatList
        data={posts}
        renderItem={RenderItem}
        keyExtractor={item => item.postId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  warpare: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    height: '100%',
  },
});
