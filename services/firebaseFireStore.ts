import firestore from '@react-native-firebase/firestore';

export const firestoreCreate = async (
  collectionName: string,
  uid: string,
  data: any,
) => {
  return firestore().collection(collectionName).doc(uid).set(data);
};

export const firestoreCollectionAdd = async (
  collectionName: string,
  data: any,
) => {
  return firestore().collection(collectionName).add(data);
};

export const firestorGet = async (collectionName: string, uid: string) => {
  return firestore().collection(collectionName).doc(uid).get();
};

export const firestorCollectionsGet = async (collectionName: string) => {
  return firestore().collection(collectionName).get();
};

export const firestorGetAllByCondation = async (
  collectionName: string,
  filed: string,
  value: string,
) => {
  return firestore().collection(collectionName).where(filed, '==', value).get();
};
