import storage from '@react-native-firebase/storage';
import {Platform} from 'react-native';

export const uploadImage = async (imageUri: string, uid: string) => {
  let imageUrl = '';
  if (imageUri) {
    const uploadUri =
      Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;
    const filename = uid + '.jpg';
    await storage().ref(filename).putFile(uploadUri);
    imageUrl = await storage().ref(filename).getDownloadURL();
  }
  return imageUrl;
};
