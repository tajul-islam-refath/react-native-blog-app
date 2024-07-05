import {store} from './redux/store';
import {Provider} from 'react-redux';

// navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import Details from './pages/Details';
import Login from './pages/Login';
import BottomTabNavigator from './Navigation/BottomTabNavigator';
import SignUp from './pages/SignUp';

// screen type checking
export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  Posts:undefined;
  Details: {id: string, title:string};
};

// create navigation stack
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
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
          <Stack.Screen
            name="Home"
            component={BottomTabNavigator}
            options={{
              headerShown:false
            }}
          />
           
          <Stack.Screen
            name="Details"
            component={Details}
            options={({ route }) => ({ title: route.params.title })} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
