import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Posts from '../pages/Posts';
import MyPosts from '../pages/MyPosts';
import NewPost from '../pages/NewPost';
import Profile from '../pages/Profile';
import {TouchableOpacity, View} from 'react-native';

// screen type checking
export type RootTabParamList = {
  MyPosts: undefined;
  New: undefined;
  Posts: undefined;
  Profile: {Id: string; title: string};
  Details: {Id: string; title: string};
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const FocusedButton = ({children, onPress, accessibilityState}: any) => {
  const selected = accessibilityState.selected;
  return (
    <>
      {selected ? (
        <TouchableOpacity
          style={{
            top: -30,
            alignItems: 'center',
          }}
          activeOpacity={1}
          onPress={onPress}>
          <View
            style={{
              width: 60,
              height: 60,
              backgroundColor: 'red',
              borderRadius: 50,
              elevation:1
            }}>
            {children}
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={1}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 50,
              
            }}>
            {children}
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#000',
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 1,
          borderRadius: 15,
          height: 70,
          paddingHorizontal: 8,
        },
      }}>
      <Tab.Screen
        name="Posts"
        component={Posts}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Posts',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          tabBarButton: props => {
            return <FocusedButton {...props} />;
          },
        }}
      />
      <Tab.Screen
        name="MyPosts"
        component={MyPosts}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'My Posts',
          title: 'My Posts',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="format-list-bulleted-square"
              color={color}
              size={size}
            />
          ),
          tabBarButton: props => {
            return <FocusedButton {...props} />;
          },
        }}
      />
      <Tab.Screen
        name="New"
        component={NewPost}
        options={{
          tabBarLabel: 'New Post',
          title: 'New Post',
          tabBarIcon: ({color, size, focused}) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            />
          ),
          tabBarButton: props => {
            return <FocusedButton {...props} />;
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
          tabBarButton: props => {
            return <FocusedButton {...props} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
