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

export const uploadToFirebase = async (path: string) => {
  const filename = path.split('/').pop();
  const reference = storage().ref(`filename-${new Date()}-${filename}`);

  try {
    await reference.putFile(path);
    const url = await reference.getDownloadURL();
    console.log('File uploaded successfully: ', url);
    return url;
  } catch (error) {
    console.error('Upload failed: ', error);
    return null;
  }
};
