import {store} from './redux/store';
import {Provider, useDispatch, useSelector} from 'react-redux';

// navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import Details from './pages/Details';
import Login from './pages/Login';
import BottomTabNavigator from './Navigation/BottomTabNavigator';
import SignUp from './pages/SignUp';
import {useEffect, useState} from 'react';
import {getData} from './utils/storage';
import {signInAction} from './redux/authSlice';
import {Text, View} from 'react-native';

// screen type checking
export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  Posts: undefined;
  Details: {id: string; title: string};
};

// create navigation stack
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getuserData = async () => {
      setLoading(true);
      const user = await getData('user');
      console.log(user);
      if (user) {
        dispatch(signInAction(user));
      }

      setLoading(false);
    };

    getuserData();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
        }}>
        <Text style={{color: '#fff', fontSize: 18}}>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={BottomTabNavigator}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Details"
              component={Details}
              options={({route}) => ({title: route.params.title})}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
