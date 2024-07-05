import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {signInSchema} from '../validations/formSchema';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import {signUpWithEmailPassword} from '../services/firebase';
import { UserSignUpCredintiles } from '../models/UserCredential';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const Separator = () => <View style={styles.separator} />;
const SignUp = ({navigation}: Props) => {
  const [hidePass, setHidePass] = useState(true);
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
              <View style={styles.inputWarpare}>
                <Text style={styles.inputLabel}>Enter Name*</Text>
                <TextInput
                  id="name"
                  style={styles.input}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  placeholder="Enter your name"
                />
                {touched.name && errors.name && (
                  <Text style={styles.inputLabelError}>{errors.name}</Text>
                )}
              </View>
              <View style={styles.inputWarpare}>
                <Text style={styles.inputLabel}>Email*</Text>
                <TextInput
                  id="email"
                  style={styles.input}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  placeholder="example@gmail.com"
                  keyboardType="email-address"
                />
                {touched.email && errors.email && (
                  <Text style={styles.inputLabelError}>{errors.email}</Text>
                )}
              </View>
              <View style={styles.inputWarpare}>
                <Text style={styles.inputLabel}>Password*</Text>
                <TextInput
                  id="password"
                  style={styles.input}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  placeholder="********"
                  secureTextEntry={hidePass ? true : false}
                />
                {touched.password && errors.password && (
                  <Text style={styles.inputLabelError}>{errors.password}</Text>
                )}
              </View>
              <View style={styles.inputWarpare}>
                <Text style={styles.inputLabel}>Profile Image*</Text>
                <TouchableOpacity
                  id="image"
                  style={styles.input}
                  onPress={ async () => {
                    await launchCamera({mediaType: 'photo'}, (response) => {
                      console.log(response)
                      if (response.assets && response.assets.length > 0) {
                        setFieldValue('image', response.assets[0].uri);
                      }
                    });
                  }}>
                  <Text
                    style={[ styles.baseButtonText]}>
                    Select an image
                  </Text>
                </TouchableOpacity>

                {touched.image && errors.image && (
                  <Text style={styles.inputLabelError}>{errors.image}</Text>
                )}
              </View>
              <TouchableOpacity
                style={[styles.signUpButton, styles.baseButton]}
                onPress={() => handleSubmit()}>
                <Text style={[styles.signUpButtonText, styles.baseButtonText]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.createAccountButton, styles.baseButton]}
                onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.createButtonText, styles.baseButtonText]}>
                  Log In
                </Text>
              </TouchableOpacity>
              <View style={{position: 'relative'}}>
                <Separator />
                <Text
                  style={{
                    backgroundColor: '#fff',
                    alignSelf: 'flex-start',
                    padding: 4,
                    position: 'absolute',
                    top: 0,
                    left: 180,
                  }}>
                  OR
                </Text>
              </View>
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
    color: 'ccc',
  },
  input: {
    fontSize: 14,
    color: 'ccc',
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
