import auth from '@react-native-firebase/auth';
import {firestorGet, firestoreCreate} from './firebaseFireStore';
import {uploadImage} from './firebaseStorage';
import {
  UserSignInCredintiles,
  UserSignUpCredintiles,
} from '../models/UserCredential';
import {storeData} from '../utils/storage';

export const signInWithEmailPassword = async (data: UserSignInCredintiles) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      data.email,
      data.password,
    );

    let userInfo: any = await firestorGet('users', userCredential.user.uid);

    const user = {
      uid: userCredential.user.uid,
      email: userInfo?._data.email,
      name: userInfo?._data.name,
      image: userInfo?._data.image,
    };

    await storeData('user', user);

    return {
      user,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      error: error,
    };
  }
};

export const signUpWithEmailPassword = async (data: UserSignUpCredintiles) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      data.email,
      data.password,
    );

    const user = userCredential.user;
    // upload user image
    const imageUrl = await uploadImage(data.image, user.uid);

    // create a new user
    await firestoreCreate('users', user.uid, {
      email: data.email,
      name: data.name,
      image: imageUrl,
    });

    return {
      userCredential,
      error: null,
    };
  } catch (error: any) {
    if (error?.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error?.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }
    console.error('SignUp error -- ', error);
    return {
      error: error,
    };
  }
};

export const signOut = async () => {
  try {
    await auth().signOut();
  } catch (error) {
    console.error(error);
  }
};
