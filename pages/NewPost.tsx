import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import {Formik} from 'formik';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {RootTabParamList} from '../Navigation/BottomTabNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {firestoreCollectionAdd} from '../services/firebaseFireStore';
import {useSelector} from 'react-redux';
import {uploadImage} from '../services/firebaseStorage';

type Props = NativeStackScreenProps<RootTabParamList, 'New'>;

export default function NewPost({navigation}: Props) {
  const formData = {
    title: '',
    body: '',
    image: '',
  };

  const user = useSelector((state: any) => state?.auth?.user);

  const onSubmit = async (values: any, {resetForm}: any) => {
    try {
      const imageUrl = await uploadImage(values.image, user.uid);
      await firestoreCollectionAdd('posts', {
        ...values,
        image: imageUrl,
        author: user.name,
        id: user.uid,
      });
      Alert.alert('Post added successfully');
      resetForm({values: formData});
      navigation.navigate('MyPosts');
    } catch (error) {
      console.log(error);
      Alert.alert('Post create faield');
    }
  };

  return (
    <SafeAreaView style={styles.warpare}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Formik initialValues={formData} onSubmit={onSubmit}>
          {({values, setFieldValue, handleSubmit, handleChange}) => (
            <>
              <View style={styles.inputWarpare}>
                <Text style={styles.inputLabel}>Title*</Text>
                <TextInput
                  id="email"
                  style={styles.input}
                  value={values.title}
                  onChangeText={handleChange('title')}
                  placeholder="Enter title"
                  placeholderTextColor="#000"
                />
              </View>

              <View style={styles.inputWarpare}>
                <Text style={[styles.inputLabel]}>Enter Post</Text>
                <TextInput
                  id="body"
                  style={[styles.input, {textAlignVertical: 'top'}]}
                  value={values.body}
                  onChangeText={handleChange('body')}
                  placeholder="Write something"
                  multiline={true}
                  numberOfLines={4}
                  placeholderTextColor="#000"
                />
              </View>

              <View style={styles.inputWarpare}>
                <Text style={styles.inputLabel}>Thumble</Text>
                <TouchableOpacity
                  id="image"
                  style={styles.input}
                  onPress={async () => {
                    await launchImageLibrary({mediaType: 'photo'}, response => {
                      if (response.assets && response.assets.length > 0) {
                        setFieldValue('image', response.assets[0].uri);
                      }
                    });
                  }}>
                  <Text style={[styles.baseButtonText, {color: '#000'}]}>
                    Select an image
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[styles.signUpButton, styles.baseButton]}
                onPress={() => handleSubmit()}>
                <Text style={[styles.signUpButtonText, styles.baseButtonText]}>
                  Submit
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  warpare: {
    paddingHorizontal: 10,
    paddingVertical: 30,
    backgroundColor: '#fff',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#000',
  },
  inputWarpare: {
    marginVertical: 10,
    display: 'flex',
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    color: '#000',
  },
  input: {
    fontSize: 14,
    color: '#000',
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  baseButton: {
    borderRadius: 8,
    paddingVertical: 8,
    display: 'flex',
    alignItems: 'center',
  },
  baseButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpButton: {
    backgroundColor: '#000',
    marginTop: 10,
  },

  signUpButtonText: {
    textTransform: 'uppercase',
    color: '#fff',
  },

  createAccountButton: {
    backgroundColor: '#D7DBDD',
    marginTop: 8,
  },
  createButtonText: {
    color: '#000',
  },
  separator: {
    marginVertical: 15,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputLabelError: {
    fontSize: 14,
    color: 'red',
  },
});
