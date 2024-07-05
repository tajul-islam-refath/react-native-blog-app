import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from '@rneui/base';
import {logOutAction} from '../redux/authSlice';

import {signOut} from '../services/firebase';

export default function Profile({navigation}: any) {
  const user = useSelector((state: any) => state?.auth?.user);
  const dispatch = useDispatch();

  const logOut = async () => {
    await signOut();
    navigation.replace('Login');
    dispatch(logOutAction());
  };

  return (
    <View style={styles.warpare}>
      {user.image && (
        <Image
          source={{
            uri: user.image,
          }}
          style={styles.profileImg}
        />
      )}
      <Text style={styles.text}>{user.name}</Text>
      <Text style={styles.text}>{user.email}</Text>
      <Button title="Log out" onPress={logOut}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  warpare: {
    paddingHorizontal: 10,
    paddingTop: 10,
    height: '100%',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
  },
  profileImg: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
