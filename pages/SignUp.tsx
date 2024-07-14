import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {signInSchema} from '../validations/formSchema';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {signUpWithEmailPassword} from '../services/firebase';
import {UserSignUpCredintiles} from '../models/UserCredential';
import InputField from '../components/UI/InputField';
import CustomButton from '../components/UI/Button';
import SeparatorWithText from '../components/UI/SeparatorWithText';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp = ({navigation}: Props) => {
  const formData: UserSignUpCredintiles = {
    email: '',
    password: '',
    name: '',
    image: '',
  };

  const onSubmit = async (values: UserSignUpCredintiles) => {
    let response = await signUpWithEmailPassword(values);
    if (response.error) {
      Alert.alert(response.error);
      return;
    }

    Alert.alert('User singup successfully');
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.warpare}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Sign Up</Text>
        <Formik
          initialValues={formData}
          validationSchema={signInSchema}
          onSubmit={onSubmit}>
          {({
            values,
            errors,
            touched,
            handleSubmit,
            handleChange,
            setFieldValue,
          }) => (
            <>
              <InputField
                label="Name*"
                value={values.name}
                onChangeText={handleChange('name')}
                placeholder="Enter your name"
                error={touched.name && errors.name ? errors.name : null}
              />
              <InputField
                label="Email*"
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder="example@gmail.com"
                error={touched.email && errors.email ? errors.email : null}
              />
              <InputField
                label="password*"
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder="********"
                error={
                  touched.password && errors.password ? errors.password : null
                }
                secureTextEntry={true}
              />

              <View style={styles.inputWarpare}>
                <Text style={styles.inputLabel}>Profile Image*</Text>
                <TouchableOpacity
                  id="image"
                  style={styles.input}
                  onPress={async () => {
                    await launchImageLibrary({mediaType: 'photo'}, response => {
                      console.log(response);
                      if (response.assets && response.assets.length > 0) {
                        setFieldValue('image', response.assets[0].uri);
                      }
                    });
                  }}>
                  <Text style={[styles.baseButtonText, {color: '#000'}]}>
                    Select an image
                  </Text>
                </TouchableOpacity>

                {touched.image && errors.image && (
                  <Text style={styles.inputLabelError}>{errors.image}</Text>
                )}
              </View>

              <CustomButton
                name="Sign Up"
                handleSubmit={() => handleSubmit()}
                btnStyle={{
                  backgroundColor: '#000',
                }}
                textColor="#fff"
              />

              <CustomButton
                name=" Log In"
                handleSubmit={() => navigation.navigate('Login')}
                btnStyle={{
                  backgroundColor: '#D7DBDD',
                  marginVertical: 6,
                }}
                textColor="#000"
              />
              <SeparatorWithText />
              <TouchableOpacity
                style={[styles.signUpButton, styles.baseButton]}>
                <Text style={[styles.signUpButtonText, styles.baseButtonText]}>
                  Connect With Google
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

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

  inputLabelError: {
    fontSize: 14,
    color: 'red',
  },
});
