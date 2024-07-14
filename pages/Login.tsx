import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import {loginSchema} from '../validations/formSchema';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {UserSignInCredintiles} from '../models/UserCredential';
import {signInWithEmailPassword} from '../services/firebase';
import {useDispatch} from 'react-redux';
import {signInAction} from '../redux/authSlice';
import {googleSignIn} from '../services/google';
import InputField from '../components/UI/InputField';
import CustomButton from '../components/UI/Button';
import SeparatorWithText from '../components/UI/SeparatorWithText';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Separator = () => <View style={styles.separator} />;
const Login = ({navigation}: Props) => {
  const formData: UserSignInCredintiles = {
    email: '',
    password: '',
  };

  const dispatch = useDispatch();

  const onSubmit = async (values: UserSignInCredintiles) => {
    console.log(values);
    const response = await signInWithEmailPassword(values);
    if (response.error) {
      Alert.alert('User signin failed');
      return;
    }

    Alert.alert('User signin successfully');
    dispatch(signInAction(response.user));
    navigation.replace('Home');
  };

  const signInUsingGoogle = async () => {
    const {error, user} = await googleSignIn();
    if (error) {
      console.log(error);
      Alert.alert('Sign in faield!');
      return;
    }

    dispatch(
      signInAction({
        uid: user?.user.id,
        email: user?.user.email,
        name: user?.user.name,
        image: user?.user.photo,
      }),
    );
    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={styles.warpare}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Log In</Text>
        <Formik
          initialValues={formData}
          validationSchema={loginSchema}
          onSubmit={onSubmit}>
          {({values, errors, touched, handleSubmit, handleChange}) => (
            <>
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

              <CustomButton
                name="Log In"
                handleSubmit={() => handleSubmit()}
                btnStyle={{
                  backgroundColor: '#000',
                }}
                textColor="#fff"
              />

              <CustomButton
                name="Create account ?"
                handleSubmit={() => navigation.navigate('SignUp')}
                btnStyle={{
                  backgroundColor: '#D7DBDD',
                  marginVertical: 6,
                }}
                textColor="#000"
              />

              <SeparatorWithText />

              <TouchableOpacity
                style={[styles.signUpButton, styles.baseButton]}
                onPress={() => signInUsingGoogle()}>
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

export default Login;

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
